(async function () {
    // Rows that should not show Before/After labels.
    // Key = row folder number, value = 0-based photo index where labels stop.
    // Examples:  { 17: 0 }  → row 17 never labeled
    //            { 16: 4 }  → row 16 unlabeled from its 5th photo onward
    const UNLABELED_FROM = {
        11: 0, // row 11: never labeled
        18: 6, // row 18: labels stop after the first 6 photos
    };

    const gallery = document.getElementById("gallery");
    if (!gallery) return;

    async function exists(url) {
        try {
            return (await fetch(url, { method: "HEAD" })).ok;
        } catch (e) {
            return false;
        }
    }

    // How many files to probe at once. Asking one at a time costs a network
    // round trip per file, which is what makes discovery slow on a real
    // connection; a batch costs one round trip no matter how wide it is.
    const PROBE_BATCH = 12;

    // Length of the run of files that exist starting at index 0, e.g. how many
    // rowN folders there are, or how many colN.jpg a folder holds.
    async function countRun(urlFor) {
        for (let found = 0; ; found += PROBE_BATCH) {
            const hits = await Promise.all(
                Array.from({ length: PROBE_BATCH }, (_, k) => exists(urlFor(found + k)))
            );
            const gap = hits.indexOf(false);
            if (gap !== -1) return found + gap;
        }
    }

    // Probe Photos/row1, row2, ... until a folder is missing, then count each
    // folder's col0.jpg, col1.jpg, ... the same way. Roughly 230 requests, so
    // this is the fallback rather than the normal path.
    async function probeRows() {
        const rowCount = await countRun((i) => `Photos/row${i + 1}/col0.jpg`);
        const rowNumbers = Array.from({ length: rowCount }, (_, i) => i + 1);
        const counts = await Promise.all(
            rowNumbers.map((n) => countRun((j) => `Photos/row${n}/col${j}.jpg`))
        );
        return rowNumbers.map((n, i) => ({ n, count: counts[i] }));
    }

    // Photos/manifest.json lists the rows in display order with each one's photo
    // count, so the gallery needs a single request. The file carries the order
    // itself rather than deriving it, which is what lets a newly added folder
    // sit on top while everything else stays where it was. Regenerate it when
    // photos change.
    async function readManifest() {
        try {
            const res = await fetch("Photos/manifest.json");
            if (!res.ok) return null;
            const data = await res.json();
            const rows = (data.rows || []).map((r) => ({
                n: Number(r.n),
                count: Number(r.count),
            }));
            return rows.length ? rows : null;
        } catch (e) {
            return null; // missing or malformed - fall back to probing
        }
    }

    async function discoverRows() {
        const manifest = await readManifest();
        if (manifest) {
            // Already in display order; don't re-sort it.
            return manifest.filter((r) => Number.isFinite(r.n) && r.count >= 2);
        }
        // No manifest to go by, so fall back to newest folder first.
        return (await probeRows())
            .filter((r) => Number.isFinite(r.n) && r.count >= 2)
            .sort((a, b) => b.n - a.n);
    }

    function buildRow(n, eager) {
        const container = document.createElement("div");
        container.className = "container1";

        const leftBtn = document.createElement("button");
        leftBtn.type = "button";
        leftBtn.id = `leftarrow${n}`;
        leftBtn.setAttribute("aria-label", `Previous photos, project ${n}`);
        leftBtn.innerHTML = '<i class="fa-solid fa-arrow-left fa-2xl" aria-hidden="true"></i>';

        const rightBtn = document.createElement("button");
        rightBtn.type = "button";
        rightBtn.id = `rightarrow${n}`;
        rightBtn.setAttribute("aria-label", `Next photos, project ${n}`);
        rightBtn.innerHTML = '<i class="fa-solid fa-arrow-right fa-2xl" aria-hidden="true"></i>';

        const cols = [0, 1].map((j) => {
            const col = document.createElement("div");
            col.className = `col${j}`;
            const img = document.createElement("img");
            // The top row is the first thing visitors scroll to, so it loads
            // straight away rather than waiting to come into view.
            img.loading = eager ? "eager" : "lazy";
            img.id = `row${n}col${j}`;
            col.appendChild(img);
            return col;
        });

        container.append(leftBtn, cols[0], cols[1], rightBtn);
        gallery.appendChild(container);

        return {
            imgs: [cols[0].firstChild, cols[1].firstChild],
            labels: cols,
            leftBtn,
            rightBtn,
        };
    }

    const rowInfo = await discoverRows();
    const photos = rowInfo.map(({ n, count }) =>
        Array.from({ length: count }, (_, j) => `Photos/row${n}/col${j}.jpg`)
    );
    const pos = photos.map(() => 0);
    const unlabeledFrom = rowInfo.map(({ n }) =>
        n in UNLABELED_FROM ? UNLABELED_FROM[n] : Infinity
    );
    const rows = rowInfo.map(({ n }, i) => buildRow(n, i === 0));

    // On phones the stylesheet hides the right-hand photo, so the single
    // visible image must be able to advance all the way to the last photo.
    function maxPos(i) {
        const twoVisible = getComputedStyle(rows[i].labels[1]).display !== "none";
        return photos[i].length - (twoVisible ? 2 : 1);
    }

    // Photos alternate After, Before, After, Before... down each row's folder,
    // so whichever photo lands on the left tells us which label goes where.
    function render(i) {
        const row = rows[i];
        const max = maxPos(i);
        const p = pos[i] = Math.min(pos[i], max);

        const leftIsAfter = p % 2 === 0;
        const sideLabels = [leftIsAfter ? "After" : "Before", leftIsAfter ? "Before" : "After"];

        [0, 1].forEach((j) => {
            if (!photos[i][p + j]) return; // right-hand slot past the end (hidden on phones)
            row.imgs[j].src = photos[i][p + j];
            row.imgs[j].alt = `Painting project ${i + 1}, photo ${p + j + 1} of ${photos[i].length}`;
            const unlabeled = p + j >= unlabeledFrom[i];
            row.labels[j].classList.toggle("unlabeled", unlabeled);
            row.labels[j].dataset.label = unlabeled ? "" : sideLabels[j];
        });

        row.leftBtn.classList.toggle("disabled", p <= 0);
        row.rightBtn.classList.toggle("disabled", p >= max);
        row.leftBtn.disabled = p <= 0;
        row.rightBtn.disabled = p >= max;
    }

    function cycleLeft(i) {
        if (pos[i] > 0) {
            pos[i]--;
            render(i);
        }
    }

    function cycleRight(i) {
        if (pos[i] < maxPos(i)) {
            pos[i]++;
            render(i);
        }
    }

    // Clicking a photo shows an enlarged copy floating above the page. The
    // gallery underneath is never touched - no row or column changes size.
    // Below the two-photo breakpoint a single photo already fills the row, so
    // there is nothing to gain and clicking does nothing.
    const zoom = (() => {
        const narrow = window.matchMedia("(max-width: 750px)");

        const overlay = document.createElement("div");
        overlay.className = "zoom";
        overlay.hidden = true;
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Enlarged photo");

        const stage = document.createElement("div");
        stage.className = "zoom-stage";
        const big = document.createElement("img");
        const caption = document.createElement("p");
        caption.className = "zoom-caption";
        stage.append(big, caption);

        const prevBtn = document.createElement("button");
        prevBtn.type = "button";
        prevBtn.className = "zoom-nav zoom-prev";
        prevBtn.setAttribute("aria-label", "Previous photo");
        prevBtn.innerHTML = '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i>';

        const nextBtn = document.createElement("button");
        nextBtn.type = "button";
        nextBtn.className = "zoom-nav zoom-next";
        nextBtn.setAttribute("aria-label", "Next photo");
        nextBtn.innerHTML = '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';

        overlay.append(prevBtn, stage, nextBtn);
        document.body.appendChild(overlay);

        let rowIdx = 0;
        let photoIdx = 0;
        let lastFocused = null;

        function show(i, k) {
            rowIdx = i;
            photoIdx = Math.max(0, Math.min(k, photos[i].length - 1));
            big.src = photos[i][photoIdx];
            const labelled = photoIdx < unlabeledFrom[i];
            const label = labelled ? (photoIdx % 2 === 0 ? "After" : "Before") : "";
            const where = `${photoIdx + 1} of ${photos[i].length}`;
            big.alt = `Painting project ${i + 1}, ${label ? label.toLowerCase() + ", " : ""}photo ${where}`;
            caption.textContent = label ? `${label} — ${where}` : where;
            prevBtn.disabled = photoIdx === 0;
            nextBtn.disabled = photoIdx === photos[i].length - 1;
            // Fetch the neighbours so stepping doesn't flash an empty frame.
            [photoIdx - 1, photoIdx + 1].forEach((n) => {
                if (photos[i][n]) new Image().src = photos[i][n];
            });
        }

        function step(delta) {
            const next = photoIdx + delta;
            if (next >= 0 && next < photos[rowIdx].length) show(rowIdx, next);
        }

        function close() {
            overlay.hidden = true;
            big.removeAttribute("src");
            if (lastFocused && lastFocused.focus) lastFocused.focus();
        }

        function open(i, k) {
            if (narrow.matches) return; // one photo per row already
            lastFocused = document.activeElement;
            show(i, k);
            overlay.hidden = false;
            overlay.focus();
        }

        // Clicking the backdrop dismisses; the arrows must not.
        overlay.addEventListener("click", (e) => {
            if (e.target.closest(".zoom-nav")) return;
            close();
        });
        prevBtn.addEventListener("click", () => step(-1));
        nextBtn.addEventListener("click", () => step(1));

        overlay.tabIndex = -1;
        document.addEventListener("keydown", (e) => {
            if (overlay.hidden) return;
            if (e.key === "Escape") close();
            else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
            else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        });

        // Shrinking to the one-photo layout while zoomed would leave the
        // overlay stranded, so dismiss it.
        const onNarrow = () => { if (narrow.matches) close(); };
        if (narrow.addEventListener) narrow.addEventListener("change", onNarrow);
        else if (narrow.addListener) narrow.addListener(onNarrow);

        return { open };
    })();

    rows.forEach((row, i) => {
        row.leftBtn.addEventListener("click", () => cycleLeft(i));
        row.rightBtn.addEventListener("click", () => cycleRight(i));
        row.imgs.forEach((img, j) => {
            img.tabIndex = 0;
            img.setAttribute("role", "button");
            img.title = "Click to enlarge";
            img.addEventListener("click", () => zoom.open(i, pos[i] + j));
            img.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    zoom.open(i, pos[i] + j);
                }
            });
        });
        render(i);
    });

    // Re-clamp and re-render when the layout flips between one and two photos
    // (media-query listener plus debounced resize, for browsers that miss one)
    const rerenderAll = () => rows.forEach((_, i) => render(i));
    const mq = window.matchMedia("(max-width: 750px)");
    if (mq.addEventListener) mq.addEventListener("change", rerenderAll);
    else if (mq.addListener) mq.addListener(rerenderAll);
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(rerenderAll, 150);
    });
})();

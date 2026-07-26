(async function () {
    // Rows that should not show Before/After labels.
    // Key = row folder number, value = 0-based photo index where labels stop.
    // Examples:  { 17: 0 }  → row 17 never labeled
    //            { 16: 4 }  → row 16 unlabeled from its 5th photo onward
    const UNLABELED_FROM = {
        11: 0, // row 11: never labeled
        18: 6, // row 18: labels stop after the first 6 photos
    };

    // Rows pinned to the top of the gallery, in the order listed here.
    // Every other row follows in ascending folder order.
    const PINNED_FIRST = [19];

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

    // Discover Photos/row1, row2, ... until a folder is missing, then count
    // each folder's col0.jpg, col1.jpg, ... the same way.
    async function discoverRows() {
        const rowCount = await countRun((i) => `Photos/row${i + 1}/col0.jpg`);
        const rowNumbers = Array.from({ length: rowCount }, (_, i) => i + 1);
        const counts = await Promise.all(
            rowNumbers.map((n) => countRun((j) => `Photos/row${n}/col${j}.jpg`))
        );
        return rowNumbers
            .map((n, i) => ({ n, count: counts[i] }))
            .filter((r) => r.count >= 2)
            .sort((a, b) => order(a.n) - order(b.n));
    }

    // Pinned rows sort ahead of everything else by taking negative positions;
    // folder numbers are always 1 or greater, so the rest stay in ascending order.
    function order(n) {
        const i = PINNED_FIRST.indexOf(n);
        return i === -1 ? n : i - PINNED_FIRST.length;
    }

    function buildRow(n) {
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
            img.loading = "lazy";
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
    const rows = rowInfo.map(({ n }) => buildRow(n));

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

    rows.forEach((row, i) => {
        row.leftBtn.addEventListener("click", () => cycleLeft(i));
        row.rightBtn.addEventListener("click", () => cycleRight(i));
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

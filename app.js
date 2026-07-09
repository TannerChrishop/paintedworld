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

    // Discover Photos/row1, row2, ... until a folder is missing, then count
    // each folder's col0.jpg, col1.jpg, ... the same way.
    async function discoverRows() {
        const rowNumbers = [];
        for (let n = 1; ; n++) {
            if (!(await exists(`Photos/row${n}/col0.jpg`))) break;
            rowNumbers.push(n);
        }
        const counts = await Promise.all(rowNumbers.map(async (n) => {
            let c = 1;
            while (await exists(`Photos/row${n}/col${c}.jpg`)) c++;
            return c;
        }));
        return rowNumbers
            .map((n, i) => ({ n, count: counts[i] }))
            .filter((r) => r.count >= 2);
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

    // Photos alternate After, Before, After, Before... down each row's folder,
    // so whichever photo lands on the left tells us which label goes where.
    function render(i) {
        const row = rows[i];
        const p = pos[i];

        row.imgs[0].src = photos[i][p];
        row.imgs[1].src = photos[i][p + 1];
        row.imgs[0].alt = `Painting project ${i + 1}, photo ${p + 1} of ${photos[i].length}`;
        row.imgs[1].alt = `Painting project ${i + 1}, photo ${p + 2} of ${photos[i].length}`;

        const leftIsAfter = p % 2 === 0;
        const sideLabels = [leftIsAfter ? "After" : "Before", leftIsAfter ? "Before" : "After"];

        [0, 1].forEach((j) => {
            const unlabeled = p + j >= unlabeledFrom[i];
            row.labels[j].classList.toggle("unlabeled", unlabeled);
            row.labels[j].dataset.label = unlabeled ? "" : sideLabels[j];
        });

        row.leftBtn.classList.toggle("disabled", p <= 0);
        row.rightBtn.classList.toggle("disabled", p >= photos[i].length - 2);
        row.leftBtn.disabled = p <= 0;
        row.rightBtn.disabled = p >= photos[i].length - 2;
    }

    function cycleLeft(i) {
        if (pos[i] > 0) {
            pos[i]--;
            render(i);
        }
    }

    function cycleRight(i) {
        if (pos[i] < photos[i].length - 2) {
            pos[i]++;
            render(i);
        }
    }

    rows.forEach((row, i) => {
        row.leftBtn.addEventListener("click", () => cycleLeft(i));
        row.rightBtn.addEventListener("click", () => cycleRight(i));
        render(i);
    });
})();

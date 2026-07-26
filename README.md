Painted World
===============

Static website for Painted World — painting and home improvement services
in St Mary's, Stratford, London, Kitchener, Waterloo, and nearby areas in
Southwestern Ontario.

Project structure:
- `index.html` — single-page site: services, pricing, contact, and photo gallery
- `app.js` — gallery logic; discovers `Photos/rowN/colM.jpg` folders automatically
- `styles.css` — all styling
- `gallery.html` — legacy URL, redirects to the gallery section on the home page
- `Photos/` — images and icons

Adding a project to the gallery: create the next `Photos/rowN` folder and name
the photos `col0.jpg, col1.jpg, ...` (alternating After, Before, After, ...).
The site picks it up automatically — no code changes needed.

Rows appear in ascending folder order, so a new row lands at the bottom. To move
one to the top, add its number to `PINNED_FIRST` in `app.js`; rows listed there
lead the gallery in the order given.

No build step — any static file server works for local preview.

Painted World
===============

Static website for Painted World — painting and home improvement services
in St Mary's, Stratford, London, and nearby areas in Ontario.

Project structure:
- `index.html` — single-page site: services, pricing, contact, and photo gallery
- `app.js` — gallery logic; discovers `Photos/rowN/colM.jpg` folders automatically
- `styles.css` — all styling
- `gallery.html` — legacy URL, redirects to the gallery section on the home page
- `Photos/` — images and icons

Adding a project to the gallery: create the next `Photos/rowN` folder and name
the photos `col0.jpg, col1.jpg, ...` (alternating After, Before, After, ...).
The site picks it up automatically — no code changes needed.

No build step — any static file server works for local preview.

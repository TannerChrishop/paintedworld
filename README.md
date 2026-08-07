Painted World
===============

Static website for Painted World — painting and home improvement services
in St. Marys, Stratford, London, Kitchener, Waterloo, Ingersoll, Norwich, Woodstock, and nearby communities in
Southwestern Ontario.

Project structure:
- `index.html` — home: services, pricing, testimonial
- `gallery.html` — before/after photo gallery
- `contact.html` — contact details and the quote request form
- `app.js` — gallery logic; reads `Photos/manifest.json`
- `styles.css` — all styling
- `Photos/` — images and icons

Adding a project to the gallery: create the next `Photos/rowN` folder and name
the photos `col0.jpg, col1.jpg, ...` (alternating After, Before, After, ...).
Then regenerate `Photos/manifest.json`. Nothing needs renaming.

`Photos/manifest.json` holds the gallery's display order and each row's photo
count, so the page needs one request instead of probing for ~230 files. The
order lives in the file rather than being derived from the folder numbers:
regenerating keeps existing rows exactly where they are and puts newly added
folders on top, so a new project leads the gallery on its own.

If the manifest is missing the gallery falls back to probing every file and
still works, newest folder first. A *stale* manifest is the case to watch —
it silently hides new rows, so rebuild it whenever photos change.

Rows that shouldn't show Before/After labels are listed in `UNLABELED_FROM` at
the top of `app.js`, keyed by folder number.

The quote form on `contact.html` posts to Web3Forms, since GitHub Pages is
static and can't send mail. Its `access_key` must be set for submissions to
deliver.

No build step — any static file server works for local preview.

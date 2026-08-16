# TravelX — html / css / js Folder Structure

```
travelx-foldered/
  html/   -> all .html pages
  css/    -> all .css files
  js/     -> all .js files
```

## What changed from the flat version

Only the **paths inside each HTML file's `<link>` and `<script>` tags** changed —
nothing else. Since `index.html` (and every other page) now lives one level *inside*
the `html/` folder, it has to step back out (`../`) before it can reach `css/` or `js/`:

```html
<!-- Before (flat folder) -->
<link rel="stylesheet" href="common.css" />
<link rel="stylesheet" href="home.css" />
...
<script src="common.js"></script>
<script src="home.js"></script>

<!-- After (html/css/js folders) -->
<link rel="stylesheet" href="../css/common.css" />
<link rel="stylesheet" href="../css/home.css" />
...
<script src="../js/common.js"></script>
<script src="../js/home.js"></script>
```

Every page follows the same pattern: `../css/common.css` + `../css/<page>.css`, and
`../js/common.js` + `../js/<page>.js`.

## What did NOT change

- **Page-to-page links** (`href="explore.html"`, `href="about.html"`, etc.) stay exactly
  as they were, because every `.html` file is still a sibling of every other `.html`
  file inside the same `html/` folder.
- **CDN links** (Google Fonts, Font Awesome) stay as full `https://...` URLs — those
  never depended on your folder structure.

## How to open it

Open `html/index.html` in your browser (double-click it, or right-click ->
"Open with" -> your browser). Everything — styling, dark mode, navigation between
pages, forms — works the same as the flat version.

## One thing to know for later

Most static hosting platforms (GitHub Pages, Netlify, Vercel, etc.) look for
`index.html` at the **root** of the project by default, not inside a subfolder. That's
totally fine for opening the file locally like above — but if you ever deploy this
online and the homepage doesn't load automatically, either:
- move `index.html` out to the project root (keep `explore.html`, `about.html`, etc.
  inside `html/`), or
- configure your host to use `html/index.html` as the entry file.

import { writeFileSync } from 'node:fs';
// Recover direct SPA URLs on GitHub Pages through the real index document.
writeFileSync('dist/404.html', `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Opening Pradivya…</title><script>location.replace('/?__path='+encodeURIComponent(location.pathname+location.search+location.hash))</script><p>Opening Pradivya… <a href="/">Return home</a></p></html>`);
writeFileSync('dist/.nojekyll', '');

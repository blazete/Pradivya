# ASCII wake attribution and adaptation

Original component: **ASCII wake**, Bencho — https://bencho.dev/.
Licence link supplied by the user: https://bencho.dev/licence (MIT, as stated with the supplied source).

The component was supplied directly by the user on 2026-10-29. The original comments explaining the heat grid, glyph ramps, shimmer, sampling, cooling, pointer interpolation and press rings are retained in ASCIIWake.tsx. The original cube geometry is replaced with an alpha/luminance mask sampled from Pradivya's existing logo; that adaptation is explicitly marked in the source. No dependency beyond React is required.

CSS token mapping: Bencho's `--fill-on` / `--ink` resolve to the footer's existing inherited white `color`. The canvas uses `currentColor` through computed inherited color; no new global tokens are introduced. Monospace glyphs use the original system font stack. Reduced-motion handling, keyboard press interaction, a loading fallback and theme class observation were added for the host project.

Original cube shading note, retained here because that geometry has been replaced:

> A solid, perfectly symmetric shape: three faces of an isometric cube make a hexagon, lit from above so each face has its own strength — the top brightest, the left in half light, the right in shade — with a little gradient across each for depth and a crisp line where two faces meet. Returns the dot size directly, 0 to 1, so the halftone is dense right to the outline.
>
> The dots are the ink, so which face is dense depends on the page: on dark the dots are light and the lit top is the dense one; on light they are dark, so it is printed like a halftone — the lit top sparse, the shaded side dense. `lit` is the dot size for a face's light: the same value, read the right way round for the page.

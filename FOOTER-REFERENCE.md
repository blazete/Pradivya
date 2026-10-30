# Animated footer reference

Reference: https://sandcastle.studio/?ref=land-book.com — inspected 2026-10-29.

Adapted to Pradivya: near-black canvas, drifting noise-shaped ASCII fields, cursor brightness and fading trails, lower-left serif contact invitation, lower-right three-column navigation, and copyright row. Local implementation: AnimatedFooter.tsx, animated-footer.css and asciiFooterField.js.

The ASCII algorithm is adapted from the public site's `script_main.B7_vG4ok.mjs` canvas component. Framer lifecycle bindings are replaced with a React wrapper. Parameters match the source instance: 9px mono characters, angle 40, opacity .3, density .35, patch size 160, speed .1, three layers, seed 2, hover radius 100, trail 3 seconds. No remote source scripts are loaded by the footer. Static rendering honors reduced motion; animation stops off screen and in hidden tabs.

Navigation uses Pradivya's existing routes and section anchors. No Sandcastle social profiles or unverified Pradivya contact details are included.

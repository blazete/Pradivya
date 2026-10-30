# Pradivya U.S. site — pre-launch review

Reviewed 30 October 2026. Local production build, not a live deployment.

## Result

The code and browser checks pass. The site is ready for stakeholder review. Public release still needs the ownership/content confirmations and domain setup listed below.

## What changed

- Replaced the oversized Golden Gate background sketch with a restrained San Francisco presence card: c/o Third Coast Foundry, linking to the U.S. locations section.
- Kept the light hero and non-sticky navigation. Added a working mobile menu, Escape dismissal, visible focus states and a skip link.
- Retained the live desktop robot. Phones and reduced-motion visitors receive a lightweight image first, with an explicit Enable 3D control. The still-image control also pauses the desktop scene.
- Preserved page scrolling on touch devices until a visitor explicitly enables the interactive scene.
- Fixed the homepage refresh reset, including the interaction between native scroll restoration and Lenis.
- Fixed the application header/footer selection during route changes and removed nested main landmarks.
- Corrected low-contrast labels, invalid market-value ARIA, form label associations and reduced-motion behavior.
- Demo buttons go directly to the contact form instead of making visitors click again in the footer.
- Removed the browser-exposed email service key and false submission confirmations. Forms explicitly open an email draft addressed to contact@pradivya.com. The visitor must send the draft. No backend or automatic delivery is claimed.
- Fixed TypeScript errors, removed unused imports/data, removed the unused Swiper dependency and upgraded affected router/build dependencies.
- Replaced the 1.38 MB displayed logo with a 9.5 KB version; retained a 48 KB version for the ASCII mask. Fonts are self-hosted with OFL notices.
- Loaded the robot engine separately; the initial application JavaScript is about 141 KB compressed. The optional robot chunk is about 144 KB compressed.
- Added valid robots.txt, cleaned duplicate metadata, corrected image dimensions/preloading, removed the dead Cookie Policy link and made legacy image paths root-relative.
- Added a GitHub Pages fallback, a manually triggered publishing workflow, and repeatable production-browser checks.

## Verification

`npm run check` passed: lint, strict TypeScript compilation, production build, and all 10 browser tests.

Browser engines: Playwright Chromium and WebKit. Layout widths: 360, 390, 768, 1024 and 1414 CSS pixels. Mobile behavior was also checked in a touch-enabled browser context.

Coverage:

1. All landing sections: no horizontal overflow at the tested widths.
2. Mobile navigation: opens, closes after selection, Escape restores focus.
3. Industry selector, team tabs, location/address selector and internal links.
4. Refresh clears the section anchor and returns to the hero.
5. Reduced-motion landing/contact accessibility scan using axe WCAG A/AA checks.
6. Email-draft form handoff and honest confirmation; no email was sent by the tests.
7. About, technology, achievements, solutions, investors, terms, privacy, legal and contact routes render.
8. GitHub Pages query-path restoration mechanism.
9. Mobile preview can enable 3D and return to a still image.
10. Dark-preference mobile accessibility scan.

No page JavaScript errors or local asset failures were found in the automated landing interaction run. A separate local-image scan of the secondary routes found no missing local image responses.

`npm audit`: zero reported vulnerabilities in the installed dependency tree at review time. This is not a guarantee that no vulnerabilities exist.

### Lighthouse lab measurements

Local production preview, a single release run per profile:

| Profile | Performance | Accessibility | Best practices | SEO | LCP | Total blocking time | Layout shift |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile, simulated throttling | 92 | 100 | 100 | 100 | 3.3 s | 10 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.7 s | 20 ms | 0 |

Mobile LCP still has room to improve on slower networks. These are lab results from this Mac and a local server, not live Core Web Vitals or physical-device measurements. The mobile score improved from an initial 68, with 3.7 seconds of blocking time, after the optimized preview/loading changes.

Evidence:

- `review/checks.txt`
- `review/lighthouse-mobile.json`
- `review/lighthouse-desktop.json`
- `review/dependency-audit.json`
- `review/hero-desktop.png`
- `review/hero-mobile.png`
- Repeatable checks: `tests/launch.spec.ts`

## Before public release

1. **Confirm reference reuse permissions.** `RERUN-SOURCE.md` documents website scene code extracted from rerun.io. `FOOTER-REFERENCE.md` documents code adapted from Sandcastle. The cloud backdrop came from Ghost. Public-use permission for these particular sources has not been established in this review. Obtain permission or replace those items with independently authored equivalents before public publication. Bencho's supplied component retains its notice separately.
2. **Approve business content.** Market forecasts still carry the visible verification note; deployments, advisor roles, brand associations and legal-policy content need the company owner's approval. This technical review does not independently establish those claims or permissions.
3. **Choose the exact subdomain and repository.** No DNS, GitHub repository settings or live site was changed. The build assumes a custom subdomain served from `/`.
4. **Decide whether email drafts are sufficient.** They are usable on static hosting but require a configured email app and a final Send action. Automatic submissions need an approved form service or backend. The old exposed service key should be rotated by its owner.
5. **Run a live smoke check after deployment.** Verify DNS, HTTPS, direct-link refresh, actual email-client handoff, browser caching and social previews on the final domain. Use a physical iPhone and Android phone for a final touch/rendering check.

## Deployment

See `DEPLOYMENT.md`. The existing main website has not been overwritten or deployed.

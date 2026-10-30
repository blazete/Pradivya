# GitHub Pages custom-subdomain deployment

This project builds a static site for a dedicated custom subdomain of pradivya.com. The exact name and GitHub repository have not been supplied. Base URLs assume the site lives at `/`, rather than at a nested `/repository-name/` URL.

## Reproduce the checks

Use Node.js 22.12 or later:

```sh
npm ci
npx playwright install chromium webkit
npm run check
```

The production output is `dist/`. `npm run preview` serves that output locally. `npm run dev -- --port 5174` runs the editable preview.

## Publish when the release items are approved

1. Copy this source into the intended GitHub repository, including `.github/workflows/pages.yml`, scripts and lockfile. Keep node_modules, dist and local test output out of source control.
2. In repository Pages settings, select GitHub Actions as the build source.
3. Configure the chosen custom subdomain for that repository. Use a DNS CNAME to the account's GitHub Pages hostname, following the official documentation. No account hostname or subdomain has been guessed in this project.
4. Run the manually triggered **Publish Pradivya preview** workflow. It installs dependencies, checks lint/types/build/browser behavior, uploads dist, and deploys only if those checks succeed.
5. Once domain validation and the certificate are available, enable HTTPS and test the live domain.

Official custom-domain reference: [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages).

The generated 404 document routes deep links through the real index document, and the bootstrap restores only same-origin paths. Test `/contact#request` and a direct refresh on the real host after publishing.

Forms open an email draft. There is no mail-service key, automatic form submission endpoint or server runtime in this build.

Review `PRE-LAUNCH-REVIEW.md` before publication, particularly the borrowed reference material and business-content confirmations. Update the social-image URL to the final domain if desired after that domain is chosen.

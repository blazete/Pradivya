# Deployment: pradivya.com/ai

This site is served at **https://pradivya.com/ai/**, as a sub-folder of the existing pradivya.com IIS site on the WUSADMIN server (`D:\Pradivya\ai`). The main pradivya.com site (Home, About, …) is a separate build in `D:\Pradivya`. Its top menu has an **AI** tab that opens `/ai/`.

- `vite.config.ts` sets `base: '/ai/'`. The router uses it as its `basename`, and root-relative asset and page URLs in code go through `withBase()` (`src/lib/base.ts`). Without that they would load from the main site's `/img`, `/fonts`, … folders.
- `public/web.config` ships in the build. It clears the main site's SPA rewrite rule (which sends unknown paths to `/`), so `/ai/*` deep links fall back to `/ai/index.html`. It also adds the `.webp` MIME type, which that IIS lacks.

## Reproduce the checks

Use Node.js 22.12 or later:

```sh
npm ci
npx playwright install chromium webkit
npm run check
```

The production output is `dist/`. `npm run preview` serves it at `http://localhost:4173/ai/`. The browser tests run against `/ai/` and fail if anything loads from outside `/ai/`.

## Publish

Copy the contents of `dist/` into `D:\Pradivya\ai` on WUSADMIN, replacing the old contents. No IIS restart is needed. Then check `https://pradivya.com/ai/`, a direct refresh of `https://pradivya.com/ai/about`, and the AI tab on `https://pradivya.com/`.

A GitHub Actions deploy on push to `main` is planned. It will build, upload to S3 and copy to the server over AWS SSM, using a short-lived OIDC role with no stored keys.

Forms open an email draft. There is no mail-service key, automatic form submission endpoint or server runtime in this build.

// The site is served under a sub-path (vite `base`, e.g. /ai/). Prefix root-relative asset and page URLs with it.
export const withBase = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');

/**
 * Public origin of the docs site, used for canonical URLs.
 *
 * Must match the CNAME file and the DNS record pointing at GitHub Pages.
 * Change all three together, or canonicals will point at a domain that does
 * not resolve.
 */
export const SITE_ORIGIN = 'https://karui.rigby-foundation.org';

export const GITHUB_URL = 'https://github.com/Rigby-Foundation/Karui';

/**
 * Framework version shown in the hero badge. Injected by Vite from the
 * installed package, so it cannot drift the way the hardcoded 3.0.4 did.
 */
declare const __KARUI_VERSION__: string;

export const KARUI_VERSION: string = __KARUI_VERSION__;

// middleware.js — no server-side country detection.
// Kept minimal for future use (e.g. security headers, redirects).

export function middleware() {
  // pass-through — country detection is fully client-side via CountryProvider
}

export const config = {
  matcher: [],
}

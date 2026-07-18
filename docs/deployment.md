# Deployment

Ember is prepared for Cloudflare Pages as a static Vite PWA.

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 or newer
- SPA fallback: `public/_redirects`

Connect the GitHub repository in Cloudflare Pages. Every push to the production branch creates a new deployment. Open the resulting HTTPS URL in Safari on iPhone, choose Share, Add to Home Screen, and enable Open as Web App.

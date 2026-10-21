# winsmux.dev

[English](README.md) | [日本語](README.ja.md)

Marketing site for [winsmux](https://github.com/Sora-bluesky/winsmux) — governance for AI agents on Windows.

Live: https://winsmux.dev

## Stack

- [Astro 6](https://astro.build/) — static site generator
- [Tailwind CSS 4](https://tailwindcss.com/) — utility-first styling (`@tailwindcss/vite`)
- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) — hosting

The Worker has no `main` script: only static assets are served, so requests do not invoke a Worker and are free of per-request charges.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # output to ./dist/
npm run preview  # serve ./dist/ locally
```

Requires Node `>=22.12.0` (see `package.json` engines).

## Verify

There is no test suite. A passing `npm run build` is the check. It fails on template and import errors, and with `CI=true` (as the deploy workflow sets) it also fails when the latest winsmux version can't be fetched from the GitHub API, so a stale version is never deployed. That lookup in `src/lib/version.ts` is the only runtime logic. Outside CI, a failed lookup logs a warning and falls back to the version hard-coded in that file. Last confirmed on Node 24.22.1 (2026-10-21).

## Deploy

Deployment is manual via Wrangler. Push to `main` does not auto-deploy yet.

```sh
npm run build
npx wrangler deploy
```

`wrangler.toml` binds the apex domain `winsmux.dev` as a Cloudflare custom domain. The DNS record is provisioned automatically by Wrangler on first deploy.

## Project layout

```
src/
  pages/
    index.astro       # landing page
  styles/
    global.css        # Tailwind entry
public/               # static files copied to dist/
dist/                 # build output (gitignored)
wrangler.toml         # Cloudflare Workers config (assets-only)
astro.config.mjs
```

## License

MIT — see [winsmux](https://github.com/Sora-bluesky/winsmux) for the platform itself (Apache 2.0).

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

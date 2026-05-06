// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// IMPORTANT: This site is designed for $0 hosting on Cloudflare Workers + Static Assets.
// Static assets are free and unlimited per Cloudflare Workers Pricing:
// https://developers.cloudflare.com/workers/platform/pricing/#workers
//
// DO NOT change `output: 'static'` to `'server'` without explicit cost approval.
// DO NOT add `@astrojs/cloudflare` adapter without explicit cost approval.
// DO NOT add API routes (`src/pages/api/*`) without explicit cost approval.
//
// These changes would cause requests to invoke the Worker (not just static assets),
// which counts toward billable usage and could result in unexpected charges
// during traffic spikes.

export default defineConfig({
  output: 'static',
  site: 'https://winsmux.dev',

  vite: {
    plugins: [tailwindcss()],
  },
});
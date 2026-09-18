# Tejas Das portfolio

Next.js 16 / React 19 portfolio with a Blender-rendered scroll animation.

```sh
npm install
npm run dev
npm run lint
node scripts/check-sequence.mjs
npm run build
```

The 96 ready-to-use WebP frames and poster are in `public/armor`. No Blender or animation library is needed to run the website. `scripts/armor-render.py` and `scripts/armor-pack.mjs` document the optional local render pipeline; they use the existing local Blender scene and temporary render directory.

The existing Vercel project is `tejas-portfolio`. Deploy a preview with `npx vercel`, then promote the reviewed deployment with `npx vercel promote <deployment-url>`.

See `PRODUCT.md`, `DESIGN.md`, and `docs/QA.md` for content, art direction, and verification.

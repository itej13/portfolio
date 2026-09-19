# Tejas Das portfolio

Next.js 16 / React 19 portfolio with a Blender-rendered scroll animation.

```sh
npm install
npm run dev
npm run lint
node scripts/check-sequence.mjs
npm run build
```

The WebP sequence and poster are in `public/armor`. No Blender or animation library is needed to run the website. `scripts/armor-render.py` and `scripts/armor-pack.mjs` document the optional local render pipeline. The renderer imports the complete supplied CadNav model at `/Users/tejasdas/Developer/Blender/Iron Man/cadnav-source/cadnav.com_model/Model_D0901A13/IronMan.obj`, retaining 140,755 armor faces after removing 9,072 helper-ring faces. It uses physically based materials informed by the source colors, eye/reactor emission, and rigid arm posing; it does not import the source MAX rig.

The original model and rig stay outside Git and the served website. Only rendered imagery is distributed; see `public/armor/ATTRIBUTION.txt`. The 19 September 2026 replacement passed render and browser verification. `docs/QA.md` contains both verification records.

The existing Vercel project is `tejas-portfolio`. Deploy a preview with `npx vercel`, then promote the reviewed deployment with `npx vercel promote <deployment-url>`.

See `PRODUCT.md`, `DESIGN.md`, and `docs/QA.md` for content, art direction, and verification.

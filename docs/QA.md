# Portfolio verification — 18 September 2026

## Model replacement — 19 September 2026

The hero now uses renders of the complete supplied CadNav IronMan.obj armor model, rather than the earlier partial-model reconstruction. The new renderer retains 140,755 armor faces after removing 9,072 helper-ring faces, reuses source colors through physically based materials, adds eye/reactor emission, and rigidly poses the arms without importing the MAX rig. Original source assets remain outside Git and the website. **Replacement verification passed.**

- The saved Blender scene contains 863 animated mesh parts, 140,755 faces and 120,685 vertices. Custom normals remain on every part; transforms are finite and change at timeline frames 1, 58 and 96.
- All 96 replacement WebP frames decode at 900×1100 with alpha; total frame size is 5.12 MiB. The poster is 1440×1760.
- The production build, ESLint and scroll-boundary checks passed. Desktop (1440×900) and phone (390×844) browser checks showed the supplied suit, no horizontal overflow, and working chapter/frame transitions 0 → 43 → 80. The motion toggle restores the new poster.
- The native MAX rig was not converted: the editable Blender scene uses keyframed rigid component transforms and an animated camera.

 The checks, screenshots, frame size, and observations below are the preserved 18 September record and do not verify the replacement.

## Checks

- ESLint, TypeScript, production build and `node scripts/check-sequence.mjs` passed. The sequence check covers clamping, all frame transitions, chapter boundaries, section offsets and short sections.
- Production browser rendering checked at 1440×900, 1536×1024, 1440×650, 390×844, 360×640 and 844×390. No horizontal overflow was found in the compact layouts.
- Scroll controls advanced through all three chapters and changed the decoded frame (0 → 43 → 80). The poster hides after a successful canvas draw. The motion toggle restores the poster.
- At 360×640, the architecture copy ends at y=455 and bottom controls begin at y=573. At 1440×650 those positions are y=486 and y=579. At 844×390 the hero becomes a 620px static section.
- Project navigation, back-to-top navigation, and native archive expansion/collapse worked. The archive exposes ten live/source links when expanded.
- Keyboard Tab reached the primary action with an unclipped 2px brass focus outline. Inactive chapter content is inert and hidden from assistive technology.
- Nine project demo URLs and six source repository URLs returned HTTP 200 and expected titles. This is a link audit, not an end-to-end test of the linked applications.
- No application warnings/errors were observed in the local production browser console. The Vercel preview login page produced unrelated Google sign-in messages before authenticated access.

## Visual fidelity ledger

The selected work concept is `work-concept.png`; implementation screenshots were compared at 1536×1024.

| Anchor | Result |
| --- | --- |
| Deep black canvas, warm white type, red actions and brass labels | Preserved. |
| Wide “Ideas. Engineered.” heading and right-aligned introduction | Preserved, with more space above the section for continuity from the hero. |
| F.R.I.D.A.Y. illustration left, project story right | Preserved. |
| ClaimShield reverses the feature layout | Preserved. |
| Angled action buttons, thin separators, technical micro-labels | Preserved; focus outline stays outside the angled fill. |
| Generated application mockups | Deliberately replaced with labelled, code-native interface studies using verified workflow facts. |
| Generated character hero | Uses the existing Blender suit, rendered into 96 transparent WebP frames; no generated character asset was used. |
| Mobile hero | Armor is cropped and faded above the body copy; later chapters dim it behind the text. |

## Practical limits

The sequence is a 3D render scrubbed through a canvas, rather than a live WebGL model. Its 96 compressed frames total about 4.87 MiB. Decoded memory is bounded to 12 frames and three simultaneous loads; mobile frames decode at 540px wide. The poster remains available when animation cannot load.

The system reduced-motion and JavaScript-disabled fallbacks were implemented and reviewed, but not separately exercised with OS emulation or JavaScript disabled. Comet opened the page, but its capture was blank; visual assertions used the user-approved Codex browser. Mobile checks used browser viewport resizing, not physical devices. No Lighthouse score is claimed.

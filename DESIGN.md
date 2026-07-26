# DESIGN.md — “Personal HUD” visual world

The site is Tejas's own heads-up display: a dark systems console whose panels are his shipped projects. Light equals state: cyan = powered/online, amber = on-device/standby, red = reserved for offline/warnings only. Replaces the previous blue-accent editorial dark theme entirely.

## Color (strategy: Restrained-plus — neutrals + cyan carrying state, amber as telemetry counterpoint)
- `--void: #030608` — page ground
- `--panel: #08111a` / `rgba(9, 18, 27, .6)` — panel fills
- `--line: #16303e` — 1px structural linework; `--line-bright: #2a5468` on hover
- `--cyan: #53e1ff` — arc-reactor core; state ON, links, focus (≈12:1 on void)
- `--cyan-dim: #35a9c4` — secondary cyan text (≥4.5:1 on void)
- `--amber: #ffb84d` — telemetry secondary; ON-DEVICE state (≈9:1)
- `--red: #ff5c4d` — restrained; offline/warning labels only
- `--text: #dbeaf2` body · `--muted: #8ba3b4` secondary (≥7:1) · `--dim: #5e7a8b` decorative-only
- Glow is a material, but only where it means state (online LEDs, hover power-up, focus, the reactor core). Never ambient decoration on static text.

## Type
- Display: **Chakra Petch** (Google) — squared terminals read as cut-corner HUD panels; caps for the name and section titles, weights 500–700. Tracking never tighter than -0.02em; wide positive tracking (+0.04–0.18em) for caps labels.
- Telemetry/labels/data: **JetBrains Mono**, 11–13px, uppercase, tracking 0.12–0.2em.
- Body copy (short descriptions, about): Chakra Petch 400, 15–17px, line-height ≥1.5, measure ≤ 70ch.

## Linework & panels
- 1px borders, square corners. Panels carry **corner brackets**: two L-shaped marks (top-left + bottom-right), 14–18px arms, drawn by pseudo-elements; they translate in and brighten on hover/focus (“power-up”).
- Background texture: faint blueprint grid (56px cells, `--line` at ~12% opacity) + horizontal scanlines (3px repeat at ~3% opacity). Fixed, pointer-events: none, aria-hidden.
- Viewport-edge HUD frame: four corner brackets fixed at the viewport corners.

## Motion (no libraries; CSS + IntersectionObserver + tiny pointer JS)
- Tokens: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`; `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`.
- Durations: hover/press 140–220ms; reveals 550–700ms (experience surface); boot ≤1.5s total, once per session (sessionStorage `hud-boot`), skippable by any click/key, never under reduced motion.
- The one authored moment: boot overlay → console power-on cascade (hero elements stagger ~70ms, translateY 14px + fade, reactor scales 0.96→1 with glow ramp). Scroll reveals reuse the same grammar, subtler.
- Entrances never start from `scale(0)`; floor is 0.96. Animate transform/opacity only. No `transition: all`.
- Ticker: linear marquee (linear is correct for constant motion); duplicated content is aria-hidden; static under reduced motion.
- Reduced motion: boot removed, reveals/tickers/rotations/parallax/magnetic off; color and glow state feedback stays.
- Hover motion gated behind `(hover: hover) and (pointer: fine)` where it moves things.

## Interaction grammar
- Buttons/links: bracket-cornered mono-caps controls; hover = glow ramp + fill tint; `:active` scale(0.97) at 140ms; magnetic pull ≤5px (pointer-fine + motion-ok only). Focus-visible: 2px cyan outline, 3px offset — never removed.
- Project cards = “modules”: idle shows index, name, one-liner, stack chips, status LED, LIVE/CODE links. Hover/focus-within = power-up (border brightens, brackets slide in, cursor-following radial glow, translateY(-4px), offset shadow).
- Status vocabulary: `ONLINE` (cyan) for live systems, `ON-DEVICE` (amber) for J.A.R.V.I.S. — with non-color redundancy (label text itself).

## Layout
- Content shell: min(100% − 48px, 1200px). Hero is a full-viewport console: identity left, reactor ring assembly right (pure SVG/CSS), status ticker at the base.
- Section headers are console panel titles (e.g. `MODULE REGISTRY // 06 UNITS`), not repeated eyebrow+H2 stamps; each section's header construction varies.
- Module IDs (`SYS.01`…) appear on cards because a registry is the world's grammar; they are addresses, not decoration.

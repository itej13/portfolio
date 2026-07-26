"use client";

/*
DIRECTION CONTRACT
THESIS: The portfolio is Tejas's own heads-up display — a systems console
proving he ships real AI products (he literally built J.A.R.V.I.S. and
F.R.I.D.A.Y.). Refuses the scrolling résumé of same-size gray cards.
OWN-WORLD: Graphite void, arc-reactor cyan = online, amber = on-device,
red reserved; 1px linework, bracket-cornered panels, blueprint grid +
scanlines; Chakra Petch display caps, JetBrains Mono telemetry; glow = state.
STORY: Visitor lands mid-boot, the console powers on, reads "05 live in
production", inspects six modules via LIVE/CODE, then emails the operator.
FIRST VIEWPORT: Viewport-edge HUD brackets; left — callsign LED, giant
TEJAS DAS, role line, lede, three bracket controls; right — SVG reactor ring
assembly with cursor parallax; base — status ticker strip.
FORM: Brief-pinned "personal HUD" console (no seed roll — direction was
pinned by the brief); staging: full-bleed console frame with modular panels.
*/

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

/* ————— data (real systems only — see PRODUCT.md honesty rules) ————— */

type Project = {
  id: string;
  title: string;
  desc: string;
  stack: string[];
  live?: string;
  code?: string;
  wide?: boolean;
  ondevice?: boolean;
  visual?: "console" | "wave";
};

const projects: Project[] = [
  {
    id: "SYS.01",
    title: "F.R.I.D.A.Y.",
    desc: "AI codebase mentor. Point it at any GitHub repo and ask questions — answers come from the source itself, with citations.",
    stack: ["RAG", "Gemini", "ChromaDB", "Next.js"],
    live: "https://friday-brown.vercel.app",
    code: "https://github.com/itej13/F.R.I.D.A.Y.",
    wide: true,
    visual: "console",
  },
  {
    id: "SYS.02",
    title: "UniBuddy",
    desc: "Multi-tenant SaaS that syncs Google Classroom into one dashboard. Tenant isolation enforced at the database level with Postgres RLS.",
    stack: ["Next.js", "Prisma", "Postgres RLS", "NextAuth"],
    live: "https://uni-buddy-kappa.vercel.app",
    code: "https://github.com/itej13/UniBuddy",
  },
  {
    id: "SYS.03",
    title: "SafeRoute",
    desc: "Women's safety map of Delhi. Walking routes scored on safety — NCRB crime data fused with crowd ratings — not just speed.",
    stack: ["React", "Supabase", "Leaflet", "OSRM"],
    live: "https://saferoute-eosin.vercel.app",
    code: "https://github.com/itej13/SafeRoute",
  },
  {
    id: "SYS.04",
    title: "ReplayIQ",
    desc: "Sports-highlight finder. Detects the moments worth replaying by fusing audio, motion, and face signals.",
    stack: ["Python", "OpenCV"],
    live: "https://replayiq-blush.vercel.app",
    code: "https://github.com/itej13/replayiq",
  },
  {
    id: "SYS.05",
    title: "★PTR",
    desc: "A 2D platformer where you ARE a memory pointer. Learn data structures by surviving them.",
    stack: ["TypeScript", "DSA", "Browser game"],
    live: "https://ptr-game.vercel.app",
    code: "https://github.com/itej13/ptr-game",
  },
  {
    id: "SYS.06",
    title: "J.A.R.V.I.S.",
    desc: "Local voice AI: a Node.js core driving a local LLM, a Three.js presence, and voice cloning. Speech in, speech out — runs on-device.",
    stack: ["Node.js", "Local LLM", "Three.js", "Voice cloning"],
    wide: true,
    ondevice: true,
    visual: "wave",
  },
];

const capabilities: [string, string, string][] = [
  ["A", "AI systems", "RAG · Gemini · embeddings · vector search"],
  ["B", "Product engineering", "Next.js · React · TypeScript · Python"],
  ["C", "Data & backend", "Postgres · Supabase · Prisma · APIs"],
  ["D", "Native & platform", "Swift · SwiftUI · Vercel · GitHub"],
];

const tickerItems = [
  "05 SYSTEMS LIVE IN PRODUCTION",
  "01 MODULE ON-DEVICE — J.A.R.V.I.S.",
  "RAG ANSWERS WITH CITATIONS — F.R.I.D.A.Y.",
  "ALSO IN THE WILD: A PAYMENT TRACKER A REAL BUSINESS RUNS ON DAILY",
  "ALL CHANNELS NOMINAL",
  "UPLINK: ITEJ1310@GMAIL.COM",
];

const WAVE_HEIGHTS = [
  0.1, 0.25, 0.45, 0.3, 0.6, 0.85, 0.5, 0.7, 1, 0.65, 0.4, 0.55, 0.8, 0.45,
  0.65, 0.9, 0.55, 0.35, 0.5, 0.3, 0.18, 0.1,
];

/* ————— motion gates (pointer-fine + motion-ok only) ————— */

let mqFine: MediaQueryList | undefined;
let mqReduce: MediaQueryList | undefined;
function motionOk() {
  mqFine ??= window.matchMedia("(hover: hover) and (pointer: fine)");
  mqReduce ??= window.matchMedia("(prefers-reduced-motion: reduce)");
  return mqFine.matches && !mqReduce.matches;
}

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function moduleGlow(e: ReactPointerEvent<HTMLElement>) {
  if (!motionOk()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* ————— small components ————— */

function MagLink({
  href,
  className,
  external,
  children,
}: {
  href: string;
  className?: string;
  external?: boolean;
  children: ReactNode;
}) {
  const inner = useRef<HTMLSpanElement>(null);
  const onMove = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    if (!motionOk() || !inner.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const cap = (v: number) => Math.max(-5, Math.min(5, v));
    inner.current.style.transform = `translate(${cap(dx * 0.12)}px, ${cap(dy * 0.3)}px)`;
  };
  const onLeave = () => {
    if (inner.current) inner.current.style.transform = "";
  };
  return (
    <a
      href={href}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span ref={inner}>{children}</span>
    </a>
  );
}

function Reactor() {
  return (
    <svg className="reactor" viewBox="0 0 440 440" role="presentation">
      <defs>
        <radialGradient id="core-g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d9f7ff" />
          <stop offset="34%" stopColor="#53e1ff" />
          <stop offset="72%" stopColor="rgba(83,225,255,.16)" />
          <stop offset="100%" stopColor="rgba(83,225,255,0)" />
        </radialGradient>
      </defs>
      <circle cx="220" cy="220" r="216" fill="none" stroke="#16303e" strokeWidth="1" />
      <g className="rot r-slow">
        <circle cx="220" cy="220" r="198" fill="none" stroke="#35a9c4" strokeWidth="10" strokeDasharray="1.6 10.8" opacity=".55" />
      </g>
      <circle cx="220" cy="220" r="180" fill="none" stroke="#16303e" strokeWidth="1" />
      <g className="rot r-rev">
        <circle cx="220" cy="220" r="160" fill="none" stroke="#53e1ff" strokeWidth="1.6" strokeDasharray="86 34 180 34 240 60" opacity=".5" />
        <circle cx="220" cy="220" r="150" fill="none" stroke="#35a9c4" strokeWidth="1" strokeDasharray="3 9" opacity=".5" />
      </g>
      <circle cx="220" cy="220" r="132" fill="none" stroke="#2a5468" strokeWidth="1" />
      <g className="rot r-slow" style={{ animationDuration: "120s" }}>
        <circle cx="220" cy="220" r="108" fill="none" stroke="#53e1ff" strokeWidth="26" strokeDasharray="17.5 10.77" opacity=".3" />
      </g>
      <circle cx="220" cy="220" r="82" fill="none" stroke="#2a5468" strokeWidth="1" />
      <g className="core-pulse">
        <circle cx="220" cy="220" r="70" fill="url(#core-g)" />
        <circle cx="220" cy="220" r="26" fill="#eafcff" opacity=".95" />
      </g>
    </svg>
  );
}

function ModVisual({ type }: { type?: "console" | "wave" }) {
  if (type === "console") {
    return (
      <div className="mod-visual" aria-hidden="true">
        <div className="vis-head">
          <span>QUERY FEED</span>
          <span>SIMULATED</span>
        </div>
        <div className="vis-body">
          <p className="q">
            <b>&gt;</b> ask: where is auth handled in this repo?
          </p>
          <p className="a">Session auth lives in the middleware — tokens are validated per request…</p>
          <ul className="cites">
            <li><em>[1]</em> middleware.ts</li>
            <li><em>[2]</em> lib/auth.ts</li>
            <li><em>[3]</em> app/api/session/route.ts</li>
          </ul>
        </div>
      </div>
    );
  }
  if (type === "wave") {
    return (
      <div className="mod-visual" aria-hidden="true">
        <div className="vis-head">
          <span>VOICE LINK</span>
          <span>LOCAL</span>
        </div>
        <div className="wave">
          {WAVE_HEIGHTS.map((h, i) => (
            <i key={i} style={{ "--h": h, "--i": i } as CSSProperties} />
          ))}
        </div>
        <p className="wave-cap">SPEECH IN // SPEECH OUT</p>
      </div>
    );
  }
  return null;
}

function Module({ p, index }: { p: Project; index: number }) {
  const copy = (
    <>
      <div className="mod-top">
        <span className="mod-id">{p.id}</span>
        <span className="mod-status">
          <i className="led" data-hue={p.ondevice ? "amber" : undefined} aria-hidden="true" />
          {p.ondevice ? "ON-DEVICE" : "ONLINE"}
        </span>
      </div>
      <h3>{p.title}</h3>
      <p className="mod-desc">{p.desc}</p>
      <ul className="mod-stack">
        {p.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="mod-links">
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer">
            LIVE ↗<span className="sr-only"> — {p.title}</span>
          </a>
        )}
        {p.code && (
          <a href={p.code} target="_blank" rel="noreferrer">
            CODE ↗<span className="sr-only"> — {p.title}</span>
          </a>
        )}
        {p.ondevice && <span className="local">OFFLINE MODULE // RUNS ON-DEVICE</span>}
      </div>
    </>
  );
  return (
    <article
      className={`module corners${p.wide ? " wide" : ""}`}
      data-state={p.ondevice ? "ondevice" : undefined}
      data-reveal=""
      style={d((index % 2) * 0.08)}
      onPointerMove={moduleGlow}
    >
      <i className="bk" aria-hidden="true" />
      {p.wide ? (
        <>
          <div className="mod-copy">{copy}</div>
          <ModVisual type={p.visual} />
        </>
      ) : (
        copy
      )}
    </article>
  );
}

function TickerSet({ hidden }: { hidden?: boolean }) {
  return (
    <span className="tset" aria-hidden={hidden ? "true" : undefined}>
      {tickerItems.map((t) => (
        <Fragment key={t}>
          <span>{t}</span>
          <i>{"//"}</i>
        </Fragment>
      ))}
    </span>
  );
}

/* ————— page ————— */

export default function Home() {
  const [bootPhase, setBootPhase] = useState<"idle" | "leaving" | "done">("idle");
  const reactorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const timers: number[] = [];
    let io: IntersectionObserver | undefined;

    const startReveals = () => {
      io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              io?.unobserve(en.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      document.querySelectorAll("[data-reveal]").forEach((el) => io?.observe(el));
      // ponytail: if the observer silently never fires (preview/headless renderers, broken
      // hydration), reveal everything rather than strand blank sections behind opacity 0.
      timers.push(
        window.setTimeout(() => {
          if (!document.querySelector("[data-reveal].is-in")) {
            document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
          }
        }, 3000),
      );
    };

    const finish = () => {
      try {
        sessionStorage.setItem("hud-boot", "1");
      } catch {}
      html.removeAttribute("data-boot");
      html.setAttribute("data-online", "1");
      setBootPhase("done");
      startReveals();
    };

    if (html.dataset.boot === "1") {
      let left = false;
      const leave = () => {
        if (left) return;
        left = true;
        setBootPhase("leaving");
        timers.push(window.setTimeout(finish, 420));
      };
      window.addEventListener("pointerdown", leave);
      window.addEventListener("keydown", leave);
      timers.push(window.setTimeout(leave, 1080));
      return () => {
        timers.forEach((t) => clearTimeout(t));
        window.removeEventListener("pointerdown", leave);
        window.removeEventListener("keydown", leave);
        io?.disconnect();
      };
    }
    finish();
    return () => {
      timers.forEach((t) => clearTimeout(t));
      io?.disconnect();
    };
  }, []);

  const onHeroMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (!motionOk() || !reactorRef.current) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    reactorRef.current.style.transform = `translate3d(${nx * 9}px, ${ny * 9}px, 0)`;
  };
  const onHeroLeave = () => {
    if (reactorRef.current) reactorRef.current.style.transform = "";
  };

  return (
    <>
      <a className="skip-link" href="#top">
        SKIP TO CONTENT
      </a>

      {bootPhase !== "done" && (
        <div className={`boot${bootPhase === "leaving" ? " leave" : ""}`} aria-hidden="true">
          <div className="boot-card">
            <p className="os">TD / OS v2.0</p>
            <p className="b1">
              &gt; initializing interface <span className="ok">.......... OK</span>
            </p>
            <p className="b2">
              &gt; loading module registry <span className="ok">...... 06 UNITS</span>
            </p>
            <div className="boot-bar">
              <i />
            </div>
            <p className="online">SYSTEMS ONLINE</p>
          </div>
          <p className="boot-skip">CLICK OR PRESS ANY KEY TO SKIP</p>
        </div>
      )}

      <div className="backdrop" aria-hidden="true" />
      <div className="hud-frame" aria-hidden="true">
        <i />
      </div>

      <header className="site-head">
        <div className="shell">
          <a className="mark" href="#top" aria-label="Tejas Das — top of page">
            <span>TD</span>
            <b>/OS</b>
          </a>
          <nav aria-label="Sections">
            <a href="#projects">PROJECTS</a>
            <a href="#capabilities">CAPABILITIES</a>
            <a href="#about">ABOUT</a>
          </nav>
          <span className="head-status">
            <i className="led" aria-hidden="true" />
            ONLINE
          </span>
        </div>
      </header>

      <main id="top" tabIndex={-1}>
        <section
          className="hero shell"
          aria-labelledby="hero-title"
          onPointerMove={onHeroMove}
          onPointerLeave={onHeroLeave}
        >
          <div className="hero-copy">
            <p className="callsign rise">
              <i className="led" aria-hidden="true" />
              OPERATOR CONSOLE — ONLINE
            </p>
            <h1 id="hero-title" className="rise" style={d(0.07)}>
              Tejas Das
            </h1>
            <p className="role rise" style={d(0.14)}>
              AI-NATIVE PRODUCT ENGINEER
            </p>
            <p className="lede rise" style={d(0.21)}>
              I build AI products and ship them end to end — a codebase mentor that answers with
              citations, a voice AI that runs on my own machine, multi-tenant SaaS in production.
              Every module on this console is real: five live, one on-device.
            </p>
            <div className="hero-ctas rise" style={d(0.28)}>
              <MagLink className="btn btn-primary" href="#projects">
                VIEW SYSTEMS
              </MagLink>
              <MagLink className="btn" href="https://github.com/itej13" external>
                GITHUB ↗
              </MagLink>
              <MagLink className="btn" href="mailto:itej1310@gmail.com">
                EMAIL
              </MagLink>
            </div>
          </div>

          <div className="reactor-par" ref={reactorRef} aria-hidden="true">
            <div className="rise-scale" style={d(0.18)}>
              <div className="reactor-halo" />
              <Reactor />
              <p className="reactor-cap">CORE // STABLE</p>
            </div>
          </div>

          <div className="ticker rise" style={d(0.4)} aria-hidden="true">
            <div className="track">
              <TickerSet />
              <TickerSet hidden />
            </div>
          </div>
        </section>

        <section className="sec shell" id="projects" aria-labelledby="projects-title">
          <div className="sec-head" data-reveal="">
            <h2 id="projects-title">
              Module <em>Registry</em>
            </h2>
            <p className="sec-meta">
              <b>06</b> UNITS &nbsp;//&nbsp; <b>05</b> LIVE IN PRODUCTION &nbsp;//&nbsp; <b>01</b>{" "}
              ON-DEVICE
            </p>
          </div>
          <div className="registry">
            {projects.map((p, i) => (
              <Module key={p.id} p={p} index={i} />
            ))}
          </div>
        </section>

        <section className="sec shell" id="capabilities" aria-labelledby="cap-title">
          <div className="sec-head" data-reveal="">
            <h2 id="cap-title">Capabilities</h2>
            <p className="sec-meta">APPLIED ACROSS THE REGISTRY</p>
          </div>
          <div className="caps">
            {capabilities.map(([id, title, list], i) => (
              <div className="cap" data-reveal="" style={d(i * 0.06)} key={id}>
                <span className="cap-id">CH.{id}</span>
                <h3>{title}</h3>
                <p>{list}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sec shell" id="about" aria-labelledby="about-title">
          <div className="sec-head" data-reveal="">
            <h2 id="about-title">Operator File</h2>
            <p className="sec-meta">THE HUMAN BEHIND THE CONSOLE</p>
          </div>
          <div className="operator corners" data-reveal="">
            <i className="bk" aria-hidden="true" />
            <div className="op-spec">
              <dl>
                <div>
                  <dt>CALLSIGN</dt>
                  <dd>TEJAS DAS</dd>
                </div>
                <div>
                  <dt>ROLE</dt>
                  <dd>AI-NATIVE PRODUCT ENGINEER</dd>
                </div>
                <div>
                  <dt>BASE</dt>
                  <dd>GITHUB.COM/ITEJ13</dd>
                </div>
                <div>
                  <dt>UPLINK</dt>
                  <dd>ITEJ1310@GMAIL.COM</dd>
                </div>
                <div>
                  <dt>METHOD</dt>
                  <dd>BUILT AI-ASSISTED · SHIPPED FOR REAL</dd>
                </div>
              </dl>
            </div>
            <div className="op-body">
              <p>
                I&apos;m a full-stack engineer who builds <b>with AI, deliberately</b> — and says
                so, because leverage is the point. I ship small-and-working over big-and-broken:
                every module in the registry above is real, running software. Comfortable across
                Next.js, React, TypeScript, Python, Swift, Postgres/Supabase, and LLM/RAG app
                patterns.
              </p>
              <div className="op-ctas">
                <MagLink className="btn btn-primary" href="mailto:itej1310@gmail.com">
                  EMAIL ME
                </MagLink>
                <MagLink className="btn" href="https://github.com/itej13" external>
                  GITHUB ↗
                </MagLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell">
          <span>© 2026 TEJAS DAS</span>
          <span>TD/OS v2.0 — BUILT AI-ASSISTED</span>
          <div className="foot-links">
            <a href="https://github.com/itej13" target="_blank" rel="noreferrer">
              GITHUB
            </a>
            <a href="mailto:itej1310@gmail.com">EMAIL</a>
            <a href="#top">▲ TOP</a>
          </div>
        </div>
      </footer>
    </>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { sequenceState } from "./sequence";
import { createFrameLoader } from "./frames";

const motionQuery = "(prefers-reduced-motion: reduce)";
const shortViewportQuery = "(max-height: 600px)";
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  const size = window.matchMedia(shortViewportQuery);
  media.addEventListener("change", callback);
  size.addEventListener("change", callback);
  return () => { media.removeEventListener("change", callback); size.removeEventListener("change", callback); };
}
const getMotion = () => !window.matchMedia(motionQuery).matches && !window.matchMedia(shortViewportQuery).matches;
const serverMotion = () => false;
function Arrow({ down = false }: { down?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={down ? "M12 4v16m-6-6 6 6 6-6" : "M5 19 19 5M5 5h14v14"} stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const systemMotion = useSyncExternalStore(subscribeMotion, getMotion, serverMotion);
  const [motionChoice, setMotionChoice] = useState<boolean | null>(null);
  const [chapter, setChapter] = useState(0);
  const motion = systemMotion && (motionChoice ?? true);

  useEffect(() => {
    const root = section.current, screen = canvas.current;
    if (!root || !screen) return;
    const context = screen.getContext("2d", { alpha: true });
    if (!context) return;
    let disposed = false, drawn = -1, raf = 0, currentChapter = -1;
    const bitmapWidth = window.innerWidth < 700 ? 540 : 900;
    screen.width = bitmapWidth;
    screen.height = Math.round(bitmapWidth * 1100 / 900);
    screen.style.opacity = "0";
    delete root.dataset.rendered;
    const frames = motion && typeof createImageBitmap === "function" ? createFrameLoader(bitmapWidth, schedule) : null;
    const progressBar = root.querySelector<HTMLElement>(".progress-track i");

    function draw() {
      const frame = frames?.nearest();
      if (!frame || !context || disposed || drawn === frame.index) return;
      context.clearRect(0, 0, screen!.width, screen!.height);
      context.drawImage(frame.bitmap, 0, 0, screen!.width, screen!.height);
      screen!.style.opacity = "1";
      screen!.dataset.frame = String(frame.index);
      root!.dataset.rendered = "true";
      drawn = frame.index;
    }
    function update() {
      raf = 0;
      if (disposed) return;
      const rect = root!.getBoundingClientRect();
      const state = sequenceState(window.scrollY, window.scrollY + rect.top, root!.offsetHeight, window.innerHeight);
      const visible = !document.hidden && rect.bottom > 0 && rect.top < window.innerHeight;
      if (progressBar) progressBar.style.transform = `scaleX(${state.progress})`;
      const nextChapter = systemMotion ? state.chapter : 0;
      if (nextChapter !== currentChapter) { currentChapter = nextChapter; setChapter(nextChapter); }
      frames?.update(state.frame, visible);
      if (visible) draw();
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(update); }
    const onVisibility = () => { if (document.hidden) frames?.update(drawn < 0 ? 0 : drawn, false); else schedule(); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", onVisibility);
    schedule();
    return () => {
      disposed = true; frames?.dispose(); cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [motion, systemMotion]);

  function nextChapter() {
    if (!section.current) return;
    if (chapter === 2) { document.getElementById("work")?.scrollIntoView({ behavior: motion ? "smooth" : "instant" }); return; }
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (section.current.offsetHeight - window.innerHeight) * (chapter === 0 ? .45 : .84), behavior: motion ? "smooth" : "instant" });
  }
  return <>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Tejas Das, home"><span className="brand-icon" aria-hidden="true" />TD<span className="brand-name">Tejas Das</span></a>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact <Arrow /></a></nav>
      <button className="motion-toggle" type="button" disabled={!systemMotion} aria-pressed={motion} onClick={() => setMotionChoice(!motion)} aria-label={!systemMotion ? "Scroll animation disabled for your motion preference or screen size" : motion ? "Turn scroll animation off" : "Turn scroll animation on"}><span className="motion-icon" aria-hidden="true"><i /><i /><i /></span><span>Motion {motion ? "on" : "off"}</span></button>
    </header>
    <section className="hero-sequence" ref={section} aria-label="Tejas Das introduction" data-chapter={chapter} data-motion={motion}>
      <div className="hero-sticky">
        <div className="hero-grid" aria-hidden="true" /><div className="hero-aura" aria-hidden="true" />
        <div className="hero-visual" aria-hidden="true"><div className="armor-frame"><Image src="/armor/poster.webp" alt="" width={1440} height={1760} preload unoptimized className="armor-poster" /><canvas ref={canvas} className="armor-canvas" /></div><div className="visual-baseline"><span />Made of ideas. Built in code.<span /></div></div>
        <div className="hero-content shell">
          <div className={`hero-copy chapter-zero ${chapter === 0 ? "current" : ""}`} inert={chapter !== 0} aria-hidden={chapter !== 0}>
            <h1>TEJAS<br />DAS<span className="title-dot">.</span></h1>
            <p className="hero-role">AI-native product engineer.</p><p className="hero-description">I turn ambitious ideas into working software. AI systems, thoughtful interfaces, and the engineering in between.</p>
            <div className="hero-actions"><a className="primary-link" href="#work">Explore my work <Arrow /></a><a className="text-link" href="#contact">Get in touch</a></div>
          </div>
          <div className={`hero-copy chapter-one ${chapter === 1 ? "current" : ""}`} inert={chapter !== 1} aria-hidden={chapter !== 1}>
            <p className="chapter-label">The architecture</p><h2>Every piece.<br />A purpose.</h2><p className="hero-description">An interface is only the surface. I build the intelligence, data, and infrastructure that make it work.</p>
            <div className="architecture-list"><span>Thoughtful interfaces</span><span>Source-grounded AI</span><span>Connected systems</span></div><a className="text-link" href="#about">How I build <Arrow /></a>
          </div>
          <div className={`hero-copy chapter-two ${chapter === 2 ? "current" : ""}`} inert={chapter !== 2} aria-hidden={chapter !== 2}>
            <p className="chapter-label">The result</p><h2>Imagination.<br />Assembled.</h2><p className="hero-description">From a codebase mentor to document intelligence and weather maps. The best part of building is putting it in someone&apos;s hands.</p><a className="primary-link" href="#work">Meet the projects <Arrow /></a>
          </div>
        </div>
        <div className="hero-bottom shell"><button className="scroll-cue" onClick={nextChapter}><Arrow down /><span>{chapter === 2 ? "Explore the work" : "Scroll to assemble"}</span></button><div className="chapter-progress" aria-label={`Chapter ${chapter + 1} of 3`}><span>0{chapter + 1}<i>/ 03</i></span><div className="progress-track"><i /></div><span className="chapter-name">{["The builder", "The architecture", "The result"][chapter]}</span></div></div>
      </div>
    </section>
  </>;
}

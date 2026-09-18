import Hero from "./hero";
import Work from "./work";

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" /></svg>;
}
const capabilities = [
  ["Intelligence", "RAG, language models, embeddings, and source-grounded answers."],
  ["Interfaces", "Next.js, React, TypeScript, and interactions that feel considered."],
  ["Infrastructure", "Python, Postgres, Supabase, APIs, and the systems beneath the surface."],
  ["Beyond the browser", "Swift, local AI, computer vision, and experiments worth building."],
];
export default function Home() {
  return <>
    <a className="skip-link" href="#work">Skip to projects</a>
    <main id="top">
      <Hero /><Work />
      <section className="about-section shell" id="about" aria-labelledby="about-title">
        <div className="section-label">Behind the build <span /></div>
        <div className="about-grid">
          <div><h2 id="about-title">A builder.<br />Before anything.</h2><p className="about-role">Tejas Das <span>/</span> DTU, Computer Science</p></div>
          <div className="about-copy">
            <p>I like the moment an idea stops being a sketch and starts doing something useful.</p>
            <p>I&apos;m an AI-native product engineer studying Computer Science at Delhi Technological University, class of 2029. I work across the whole product: the interface people touch, the intelligence behind it, and the systems that keep it running.</p>
            <p>I build with AI, deliberately. I care about understanding what I ship, tracing decisions back to the source, and making small things work well.</p>
            <a className="text-link" href="https://github.com/itej13" target="_blank" rel="noreferrer">Inside my GitHub <Arrow /></a>
          </div>
        </div>
        <div className="capability-list">{capabilities.map(([title, description]) => <div className="capability" key={title}><h3>{title}</h3><p>{description}</p></div>)}</div>
      </section>
      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="shell">
          <div className="section-label">The next thing <span /></div>
          <div className="contact-heading"><h2 id="contact-title">Let&apos;s build<br />something real.</h2><a className="contact-orbit" href="mailto:itej1310@gmail.com" aria-label="Email Tejas Das"><Arrow /></a></div>
          <div className="contact-bottom"><a className="email-link" href="mailto:itej1310@gmail.com">itej1310@gmail.com</a><div><a href="https://github.com/itej13" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/tejas-das-679504373" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></div>
        </div>
      </section>
    </main>
    <footer className="site-footer shell"><div><span>© {new Date().getFullYear()} Tejas Das</span><span>Built with curiosity. And a little arc energy.</span></div><div><span className="model-credit">Base model components: <a href="https://www.cadnav.com" target="_blank" rel="noreferrer">CadNav</a></span><a href="#top">Back to top <Arrow /></a></div></footer>
  </>;
}

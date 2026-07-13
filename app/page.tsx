const projects = [
  {
    title: "F.R.I.D.A.Y.",
    description:
      "AI codebase mentor: ask any GitHub repo questions, answered with cited sources (RAG).",
    tags: ["Next.js", "Gemini", "ChromaDB", "RAG"],
    live: "https://friday-brown.vercel.app/",
    code: "https://github.com/itej13/F.R.I.D.A.Y",
  },
  {
    title: "UniBuddy",
    description: "Multi-tenant SaaS that syncs Google Classroom into one dashboard.",
    tags: ["Next.js 16", "Prisma", "Supabase", "NextAuth"],
    live: "https://uni-buddy-kappa.vercel.app/",
    code: "https://github.com/itej13/UniBuddy",
  },
  {
    title: "SafeRoute",
    description:
      "Women's safety map of Delhi — scores walking routes on safety, fusing crime data + crowd ratings.",
    tags: ["React", "Supabase", "Leaflet", "OSRM"],
    live: "https://saferoute-eosin.vercel.app/",
    code: "https://github.com/itej13/SafeRoute",
  },
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header shell" aria-label="Primary navigation">
        <a className="mark" href="#top" aria-label="Tejas Das — top of page">
          <span aria-hidden="true">&lt;/&gt;</span>
        </a>
        <nav aria-label="Section navigation">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero shell" id="top" aria-labelledby="hero-title">
        <div className="hero-rail" aria-hidden="true" />
        <div className="hero-content">
          <p className="name">Tejas Das</p>
          <h1 id="hero-title">I build &amp; ship AI-first products, end to end.</h1>
          <p className="prompt" aria-hidden="true">&gt;_</p>
          <div className="hero-actions">
            <a href="https://github.com/itej13" target="_blank" rel="noreferrer">
              GitHub <ExternalArrow />
            </a>
            <a href="mailto:itej1310@gmail.com">Email <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="projects shell" id="projects" aria-labelledby="projects-title">
        <h2 id="projects-title"><span aria-hidden="true">{`// `}</span>Projects</h2>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project" key={project.title}>
              <div className="line-numbers" aria-hidden="true">
                {[1, 2, 3, 4, 5, 6].map((number) => <span key={number}>{String(number).padStart(2, "0")}</span>)}
              </div>
              <div className="project-content">
                <p className="project-index">0{index + 1}</p>
                <h3>{project.title}</h3>
                <p className="description">{project.description}</p>
                <ul className="tags" aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className="project-links">
                  <a href={project.live} target="_blank" rel="noreferrer">Live demo <ExternalArrow /><span className="sr-only">: {project.title}</span></a>
                  <a href={project.code} target="_blank" rel="noreferrer">Code <ExternalArrow /><span className="sr-only">: {project.title}</span></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about shell" id="about" aria-labelledby="about-title">
        <div className="about-rail" aria-hidden="true" />
        <div className="about-content">
          <h2 id="about-title"><span aria-hidden="true">{`// `}</span>About</h2>
          <p>
            I&apos;m a full-stack developer who builds AI-assisted, deliberately. I care about shipping small-and-working over big-and-broken. I&apos;m comfortable across Next.js, React, Python, Swift, Postgres/Supabase, and LLM/RAG app patterns.
          </p>
        </div>
      </section>

      <footer className="footer shell">
        <p>© 2026 Tejas Das</p>
        <div>
          <a href="https://github.com/itej13" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:itej1310@gmail.com">Email</a>
        </div>
      </footer>
    </main>
  );
}

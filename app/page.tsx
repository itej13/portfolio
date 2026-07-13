const projects = [
  {
    number: "01",
    title: "F.R.I.D.A.Y.",
    description:
      "AI codebase mentor: ask any GitHub repo questions, answered with cited sources (RAG).",
    tech: ["Next.js", "Gemini", "ChromaDB", "RAG"],
    live: "https://friday-brown.vercel.app/",
    code: "https://github.com/itej13/F.R.I.D.A.Y",
    visual: "citations",
  },
  {
    number: "02",
    title: "UniBuddy",
    description: "Multi-tenant SaaS that syncs Google Classroom into one dashboard.",
    tech: ["Next.js 16", "Prisma", "Supabase", "NextAuth"],
    live: "https://uni-buddy-kappa.vercel.app/",
    code: "https://github.com/itej13/UniBuddy",
    visual: "sync",
  },
  {
    number: "03",
    title: "SafeRoute",
    description:
      "Women's safety map of Delhi — scores walking routes on safety, fusing crime data + crowd ratings.",
    tech: ["React", "Supabase", "Leaflet", "OSRM"],
    live: "https://saferoute-eosin.vercel.app/",
    code: "https://github.com/itej13/SafeRoute",
    visual: "route",
  },
];

const skills = [
  ["01", "AI systems", "RAG, Gemini, embeddings, vector search"],
  ["02", "Product engineering", "Next.js, React, TypeScript, Python"],
  ["03", "Data & backend", "Postgres, Supabase, Prisma, APIs"],
  ["04", "Native & platform", "Swift, SwiftUI, Vercel, GitHub"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectVisual({ type }: { type: string }) {
  if (type === "citations") {
    return (
      <div className="visual citations" aria-hidden="true">
        <div className="editor-tab"><span>answer.ts</span><i /></div>
        <div className="citation-layout">
          <div className="code-lines">
            <span><b>01</b> const context = retrieve(query)</span>
            <span><b>02</b> const sources = cite(context)</span>
            <span><b>03</b> return answer.with(sources)</span>
          </div>
          <div className="source-list">
            <p>Cited sources</p>
            {["src/lib/rag.ts", "src/app/api/ask/route.ts", "docs/architecture.md"].map((source, index) => (
              <span key={source}><em>{index + 1}</em>{source}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "sync") {
    return (
      <div className="visual sync" aria-hidden="true">
        <p>Classroom sync</p>
        <div className="sync-flow"><span>Class</span><i>↻</i><span>Dash</span></div>
        <div className="calendar-grid">
          {["M", "T", "W", "T", "F", "S", "S", "", "", "", "", "●", "", "", "", "", "", "", "", "●", "", "", "", "", "", "", "", "", "", "●"].map((day, index) => <i key={index}>{day}</i>)}
        </div>
      </div>
    );
  }

  return (
    <div className="visual route" aria-hidden="true">
      <div className="map-grid" />
      <svg viewBox="0 0 300 220" role="presentation">
        <path d="M43 185C65 154 115 171 107 124S168 112 161 72 224 82 250 33" />
        <circle cx="43" cy="185" r="7" /><circle cx="250" cy="33" r="7" />
        <circle cx="107" cy="124" r="4" /><circle cx="161" cy="72" r="4" />
      </svg>
      <p>recommended route</p>
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: (typeof projects)[number]; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? "featured" : ""} reveal`}>
      <div className="project-copy">
        <p className="project-number">{project.number}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <p className="project-tech">{project.tech.join(" · ")}</p>
        <div className="project-links">
          <a href={project.live} target="_blank" rel="noreferrer">Live demo <Arrow /><span className="sr-only">: {project.title}</span></a>
          <a href={project.code} target="_blank" rel="noreferrer">Code <Arrow /><span className="sr-only">: {project.title}</span></a>
        </div>
      </div>
      <ProjectVisual type={project.visual} />
    </article>
  );
}

export default function Home() {
  return (
    <main id="top">
      <div className="page-rail" aria-hidden="true" />
      <header className="site-header shell" aria-label="Primary navigation">
        <a className="mark" href="#top" aria-label="Tejas Das — top of page">&lt;/&gt;</a>
        <nav aria-label="Section navigation">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy reveal">
          <p className="name">Tejas Das</p>
          <h1 id="hero-title">I build &amp; ship AI-first products, end to end.</h1>
          <p className="hero-note"><span>&gt;_</span> shipping useful software, deliberately.</p>
          <div className="hero-actions">
            <a href="https://github.com/itej13/portfolio" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=itej1310%40gmail.com" target="_blank" rel="noreferrer">Email <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <div className="workbench reveal" aria-label="Illustration of an AI product workbench">
          <div className="workbench-head"><span>workbench.arch</span><span className="status"><i /> active</span></div>
          <div className="workbench-body">
            <div className="workbench-code" aria-hidden="true">
              <p><i>01</i><span>async</span> function ship(input) {'{'}</p>
              <p><i>02</i>  plan = <span>reason</span>(input)</p>
              <p><i>03</i>  context = <span>retrieve</span>(plan)</p>
              <p><i>04</i>  return <span>build</span>(context)</p>
              <p><i>05</i>{'}'}</p>
              <p className="muted"><i>06</i>{"// small, useful, shipped."}</p>
            </div>
            <div className="system-map" aria-hidden="true">
              <div className="source-nodes"><span>Repo</span><span>Data</span><span>API</span></div>
              <div className="connector-line" />
              <div className="system-node">Retrieve</div>
              <div className="connector-line short" />
              <div className="system-node">Plan</div>
              <div className="connector-line short" />
              <div className="system-node focus">Ship</div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects shell" id="projects" aria-labelledby="projects-title">
        <div className="section-heading reveal">
          <p>01</p>
          <h2 id="projects-title">Featured projects</h2>
        </div>
        <ProjectCard project={projects[0]} featured />
        <div className="project-pair">
          <ProjectCard project={projects[1]} />
          <ProjectCard project={projects[2]} />
        </div>
      </section>

      <section className="skills shell" id="skills" aria-labelledby="skills-title">
        <div className="section-heading reveal">
          <p>02</p>
          <h2 id="skills-title">Capabilities, applied.</h2>
        </div>
        <div className="skill-track" aria-hidden="true"><span /></div>
        <div className="skills-grid">
          {skills.map(([number, title, description], index) => (
            <article className={`skill reveal delay-${index + 1}`} key={title}>
              <p className="skill-number">{number}</p>
              <span className="skill-dot" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about shell" id="about" aria-labelledby="about-title">
        <div className="about-index reveal">03</div>
        <div className="about-content reveal">
          <h2 id="about-title">About</h2>
          <p>I&apos;m a full-stack developer who builds AI-assisted, deliberately. I care about shipping small-and-working over big-and-broken. I&apos;m comfortable across Next.js, React, Python, Swift, Postgres/Supabase, and LLM/RAG app patterns.</p>
          <div className="about-links">
            <a href="https://github.com/itej13/portfolio" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=itej1310%40gmail.com" target="_blank" rel="noreferrer">Email <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <footer className="footer shell"><span>© 2026 Tejas Das</span><span>Built with focus.</span></footer>
    </main>
  );
}

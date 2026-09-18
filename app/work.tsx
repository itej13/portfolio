import "./work.css";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="work-arrow">
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 16 18" fill="none" aria-hidden="true">
      <path d="M3 1.5h6l4 4v11H3zM9 1.5v4h4M5.5 9h5M5.5 12h5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function FridayStudy() {
  return (
    <figure className="work-study work-friday" aria-label="Illustration of F.R.I.D.A.Y.'s source-grounded answer workflow">
      <div className="work-window">
        <div className="work-window-bar"><span className="work-window-dots"><i /><i /><i /></span><span>F.R.I.D.A.Y.</span><span className="work-window-end">Codebase intelligence</span></div>
        <div className="work-friday-body">
          <div className="work-file-tree">
            <span className="work-ui-label">Repository</span>
            <p className="work-repository">F.R.I.D.A.Y.</p>
            <div className="work-tree-folder">src / lib</div>
            <div className="work-tree-file work-tree-active"><FileIcon />rag.ts</div>
            <div className="work-tree-file"><FileIcon />repository.ts</div>
            <div className="work-tree-folder">src / app / api</div>
            <div className="work-tree-file"><FileIcon />chat / route.ts</div>
            <div className="work-tree-file"><FileIcon />index-repo</div>
            <div className="work-tree-foot"><span />Source connected</div>
          </div>
          <div className="work-answer">
            <div className="work-question"><span className="work-user-mark">T</span>Where do the answers come from?</div>
            <div className="work-answer-body">
              <span className="work-ai-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2 15 9l7 3-7 3-3 7-3-7-7-3 7-3z" stroke="currentColor" /></svg></span>
              <div><p>From the code itself.</p><p className="work-answer-explanation">Selected files become searchable context. Relevant passages ground the answer, with sources you can follow.</p></div>
            </div>
            <div className="work-source-list"><span className="work-ui-label">Referenced sources</span><span><FileIcon />src/lib/rag.ts<Arrow diagonal /></span><span><FileIcon />src/lib/repository.ts<Arrow diagonal /></span></div>
            <div className="work-query-hint">Ask about the source<Arrow /></div>
          </div>
        </div>
      </div>
      <figcaption>Interface study <span>Retrieval / reasoning / references</span></figcaption>
    </figure>
  );
}

function ClaimStudy() {
  return (
    <figure className="work-study work-claim" aria-label="Illustration of ClaimShield's document extraction and fixed-rule audit workflow">
      <div className="work-window">
        <div className="work-window-bar"><span className="work-window-dots"><i /><i /><i /></span><span>ClaimShield</span><span className="work-window-end">A clearer case</span></div>
        <div className="work-claim-body">
          <div className="work-document">
            <div className="work-paper-header"><svg viewBox="0 0 24 28" fill="none" aria-hidden="true"><path d="m12 2 9 4v8c0 6-9 11-9 11S3 20 3 14V6zM8 13l3 3 5-6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg><span>Document review</span></div>
            <h4>Every deduction<br />has a reason.</h4>
            <p>Make it traceable.</p>
            <div className="work-paper-rule" />
            <div className="work-paper-lines" aria-hidden="true"><i /><i /><i /></div>
            <div className="work-paper-highlight"><span>Settlement letter</span><FileIcon /></div>
            <div className="work-paper-lines work-paper-lines-short" aria-hidden="true"><i /><i /></div>
            <div className="work-paper-seal"><span />Facts before findings</div>
          </div>
          <div className="work-rule-trace">
            <span className="work-ui-label">An auditable path</span>
            <div className="work-rule-step"><span className="work-step-dot" /><div><strong>Read the documents</strong><p>AI extracts the facts.</p></div></div>
            <div className="work-rule-step"><span className="work-step-dot" /><div><strong>Check fixed rules</strong><p>Trace each finding to its source.</p></div></div>
            <div className="work-rule-step"><span className="work-step-dot" /><div><strong>Build the dossier</strong><p>A printable record for review.</p></div></div>
            <div className="work-trace-note">The AI never generates law.</div>
          </div>
        </div>
      </div>
      <figcaption>Interface study <span>Document facts / fixed rules</span></figcaption>
    </figure>
  );
}

function RainStudy() {
  return (
    <figure className="work-study work-rain" aria-label="Geographic illustration for Rain Atlas, not a current weather observation">
      <div className="work-window">
        <div className="work-window-bar"><span className="work-window-dots"><i /><i /><i /></span><span>Rain Atlas</span><span className="work-window-end">Uganda</span></div>
        <div className="work-rain-body">
          <svg className="work-rain-map" viewBox="0 0 640 380" fill="none" aria-hidden="true">
            <defs>
              <radialGradient id="work-weather-glow"><stop stopColor="#55988b" stopOpacity=".25" /><stop offset="1" stopColor="#55988b" stopOpacity="0" /></radialGradient>
              <linearGradient id="work-country-fill" x1="290" y1="40" x2="350" y2="320" gradientUnits="userSpaceOnUse"><stop stopColor="#173b37" /><stop offset="1" stopColor="#112825" /></linearGradient>
              <pattern id="work-map-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0v40" stroke="#58857f" strokeOpacity=".14" strokeWidth=".6" /></pattern>
            </defs>
            <path fill="#0b1415" d="M0 0h640v380H0z" />
            <path fill="url(#work-map-grid)" d="M0 0h640v380H0z" />
            <ellipse cx="336" cy="160" rx="258" ry="240" fill="url(#work-weather-glow)" />
            <g stroke="#68938a" strokeOpacity=".14" strokeWidth="1">
              <path d="M-20 100C120 10 147 220 285 91S482 7 660 135M-20 120C110 38 154 240 292 112S475 28 660 155M-20 140C108 64 161 260 299 133S468 49 660 175M-20 160C112 88 168 280 306 154S461 70 660 195M-20 180C118 114 175 300 313 175S454 91 660 215M-20 200C124 140 182 320 320 196S447 112 660 235M-20 220C130 166 189 340 327 217S440 133 660 255M-20 240C136 192 196 360 334 238S433 154 660 275M-20 260C142 218 203 380 341 259S426 175 660 295" />
            </g>
            <path d="m257 70 34-14 21 8 31-17 41 13 16 36 28 14 7 31-18 20 7 36-29 22-20 41-40 15-29 27-47-12-28-39-4-31-22-18 11-37 22-30 4-35z" fill="url(#work-country-fill)" stroke="#719a86" strokeWidth="1.2" />
            <path d="m302 279 9-27 28-13 17-2 21 13-6 18 20 18 30 5 23 23-27 20-43-5-30 7-26-18z" fill="#122d36" stroke="#426373" strokeWidth=".8" />
            <path d="M311 259c-39-27-26-38-10-57s-5-23 14-47 9-28 7-48" stroke="#5f8b8a" strokeOpacity=".55" strokeWidth="1.2" strokeDasharray="3 4" />
            <g fill="#a9c4b2" fontFamily="monospace" fontSize="10" letterSpacing="1"><text x="148" y="177" fill="#68817b">DR CONGO</text><text x="443" y="214" fill="#68817b">KENYA</text><text x="279" y="32" fill="#68817b">SOUTH SUDAN</text><text x="335" y="358" fill="#68817b">TANZANIA</text><text x="288" y="187" fontSize="14" letterSpacing="4">UGANDA</text></g>
            <g fill="#b8b999" stroke="#0b1415" strokeWidth="3"><circle cx="309" cy="260" r="5" /><circle cx="308" cy="123" r="4" /><circle cx="384" cy="209" r="4" /></g>
            <g fill="#d9dfcf" fontFamily="monospace" fontSize="10"><text x="321" y="264">Kampala</text><text x="319" y="127">Gulu</text><text x="395" y="213">Mbale</text></g>
            <circle cx="309" cy="260" r="16" stroke="#c4a46a" strokeOpacity=".6" /><circle cx="309" cy="260" r="25" stroke="#c4a46a" strokeOpacity=".18" />
            <path d="M583 59V31m0 0-4 9m4-9 4 9" stroke="#95afa5" /><text x="580" y="23" fill="#95afa5" fontFamily="monospace" fontSize="9">N</text>
          </svg>
          <div className="work-rain-overlay"><span className="work-ui-label">Watch the weather unfold.</span><span>Forecasts. Clouds. Context.</span></div>
          <div className="work-rain-legend"><span><i />Forecast</span><span><i />Satellite</span><span><i />Research</span></div>
        </div>
      </div>
      <figcaption>Geographic illustration <span>No current weather data shown</span></figcaption>
    </figure>
  );
}

const archive = [
  { title: "Orbit Garden", description: "A generative-art playground for making and sharing moving worlds.", category: "Creative coding", live: "https://orbit-garden.vercel.app", code: undefined },
  { title: "Aftermark", description: "Trace how a client change affects connected creative work.", category: "Product tools", live: "https://aftermark-six.vercel.app", code: undefined },
  { title: "UniBuddy", description: "Google Classroom, timetables, and attendance in one student dashboard.", category: "Full-stack", live: "https://uni-buddy-kappa.vercel.app", code: "https://github.com/itej13/UniBuddy" },
  { title: "SafeRoute", description: "Explore Delhi walking routes through crime data and community ratings.", category: "Maps & data", live: "https://saferoute-eosin.vercel.app", code: "https://github.com/itej13/SafeRoute" },
  { title: "ReplayIQ", description: "Find sports highlights through audio and motion signals.", category: "Signal processing", live: "https://replayiq-blush.vercel.app", code: "https://github.com/itej13/replayiq" },
  { title: "★PTR", description: "A platformer where data structures become the world you navigate.", category: "Game development", live: "https://ptr-game.vercel.app", code: "https://github.com/itej13/ptr-game" },
];

export default function Work() {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="work-inner">
        <header className="work-heading">
          <div><p className="work-eyebrow">Selected work<span /></p><h2 id="work-title">Ideas<span>.</span> Engineered<span>.</span></h2></div>
          <p className="work-intro">Real problems. Working software.<br />A few things I have built.</p>
        </header>

        <article className="work-feature" aria-labelledby="work-friday-title">
          <FridayStudy />
          <div className="work-copy"><p className="work-category">AI / Developer tools</p><h3 id="work-friday-title">F.R.I.D.A.Y.</h3><p className="work-description">A codebase mentor that answers from the source. Explore public GitHub repositories with cited AI answers.</p><p className="work-stack">Next.js <span /> Gemini <span /> ChromaDB</p><div className="work-actions"><a className="work-primary-link" href="https://friday-brown.vercel.app" target="_blank" rel="noreferrer" aria-label="Explore F.R.I.D.A.Y. (opens in a new tab)">Explore project<Arrow /></a><a className="work-code-link" href="https://github.com/itej13/F.R.I.D.A.Y." target="_blank" rel="noreferrer" aria-label="View F.R.I.D.A.Y. source code (opens in a new tab)">View code<Arrow diagonal /></a></div></div>
        </article>

        <article className="work-feature work-feature-reverse" aria-labelledby="work-claim-title">
          <ClaimStudy />
          <div className="work-copy"><p className="work-category">AI / Insurance</p><h3 id="work-claim-title">ClaimShield</h3><p className="work-description">AI extracts document facts. Fixed rules produce traceable findings. A clearer way to understand health-insurance deductions.</p><p className="work-stack">Next.js <span /> TypeScript <span /> Gemini</p><div className="work-actions"><a className="work-primary-link" href="https://claimshield-iota.vercel.app" target="_blank" rel="noreferrer" aria-label="Explore ClaimShield (opens in a new tab)">Explore project<Arrow /></a><span className="work-source-note">Private source</span></div></div>
        </article>

        <article className="work-feature" aria-labelledby="work-rain-title">
          <RainStudy />
          <div className="work-copy"><p className="work-category">Data / Earth observation</p><h3 id="work-rain-title">Rain Atlas<span className="work-title-sub">Uganda</span></h3><p className="work-description">A window into Uganda&apos;s changing weather. Hourly forecasts and satellite imagery, with a separate experimental rain model.</p><p className="work-stack">React <span /> Leaflet <span /> Python</p><div className="work-actions"><a className="work-primary-link" href="https://uganda-rain-atlas.vercel.app" target="_blank" rel="noreferrer" aria-label="Explore Rain Atlas (opens in a new tab)">Explore project<Arrow /></a><a className="work-code-link" href="https://github.com/itej13/uganda-rain-atlas" target="_blank" rel="noreferrer" aria-label="View Rain Atlas source code (opens in a new tab)">View code<Arrow diagonal /></a></div></div>
        </article>

        <details className="work-archive">
          <summary><span>More from the workshop</span><span className="work-archive-toggle"><span className="work-archive-closed">Explore the archive</span><span className="work-archive-open">Close the archive</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" /></svg></span></summary>
          <div className="work-archive-list">
            {archive.map((project) => (
              <article className="work-archive-item" key={project.title}>
                <div><p className="work-archive-category">{project.category}</p><h3>{project.title}</h3></div><p className="work-archive-description">{project.description}</p><div className="work-archive-links"><a href={project.live} target="_blank" rel="noreferrer" aria-label={`Explore ${project.title} (opens in a new tab)`}>Explore<Arrow diagonal /></a>{project.code && <a href={project.code} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source code (opens in a new tab)`}>Code<Arrow diagonal /></a>}</div>
              </article>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}

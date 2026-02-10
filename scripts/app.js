const root = document.getElementById("app-root");
const sidebarList = document.getElementById("sidebar-list");
const btnHome = document.getElementById("btn-home");
const btnCollapse = document.getElementById("btn-collapse");
const appShell = document.querySelector(".app");

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function getRoute(){
  // hash routes: #/ , #/rhythms , #/about , #/case-studies , #/reviews , #/sim/<id>
  const hash = window.location.hash || "#/";
  const clean = hash.replace(/^#/, "");
  const parts = clean.split("/").filter(Boolean);
  return parts; // [] => landing home
}

function setActiveSidebar(activeId){
  const items = sidebarList.querySelectorAll("a.sideitem");
  items.forEach(a => {
    const id = a.getAttribute("data-id");
    a.classList.toggle("sideitem--active", id === activeId);
  });
}

function renderSidebar(){
  sidebarList.innerHTML = window.RHYTHMS.map(r => `
    <a class="sideitem" href="#/sim/${escapeHtml(r.id)}" data-id="${escapeHtml(r.id)}">
      <div class="sideitem__name">${escapeHtml(r.name)}</div>
      <div class="sideitem__tag">${escapeHtml(r.tag)}</div>
    </a>
  `).join("");
}

/* NEW: Landing home page with 3 boxes (Rhythms / Case Studies / Reviews) */
function pageLanding(){
  setActiveSidebar(null);

  root.innerHTML = `
    <section class="page">
      <div class="home-center">
        <h1 class="home-title">Scottsdale Fire Dept.</h1>
<<<<<<< HEAD
        <p class="home-subtitle">Cardiac Simulator Learning Tool</p>
=======
        <p class="home-subtitle">Cardiac Simulator Teaching Site</p>
>>>>>>> ec44823aab8e0979e16be7001386a3ef370e62d2

<div class="home-tiles" role="list" aria-label="Main sections">
  <a class="home-tile" href="#/rhythms" role="listitem" aria-label="Open Rhythms">
    <div class="home-tile__box">
      <img class="home-tile__icon" src="assets/icon-rhythms.svg" alt="" />
    </div>
    <div class="home-tile__label">Rhythms</div>
  </a>

  <a class="home-tile" href="case-studies.html" role="listitem" aria-label="Open Case Studies">
    <div class="home-tile__box">
      <img class="home-tile__icon" src="assets/icon-case-studies.svg" alt="" />
    </div>
    <div class="home-tile__label">Case Studies</div>
  </a>

  <a class="home-tile" href="reviews.html" role="listitem" aria-label="Open Reviews">
    <div class="home-tile__box">
      <img class="home-tile__icon" src="assets/icon-reviews.svg" alt="" />
    </div>
    <div class="home-tile__label">Reviews</div>
  </a>
</div>

      </div>
    </section>
  `;
}

/* Your existing Rhythms grid becomes its own page: #/rhythms */
function pageRhythms(){
  setActiveSidebar(null);

  const cards = window.RHYTHMS.map(r => `
    <a class="card" href="#/sim/${escapeHtml(r.id)}">
      <div class="card__thumb">
        <img src="${escapeHtml(r.image)}" alt="${escapeHtml(r.name)} ECG" />
      </div>
      <div class="card__body">
        <div class="card__title">${escapeHtml(r.name)}</div>
        <div class="card__desc">${escapeHtml(r.description)}</div>
      </div>
    </a>
  `).join("");

  root.innerHTML = `
    <section class="page">
      <div class="hero">
        <h1 class="hero__title">Rhythms</h1>
        <p class="hero__sub">
          Select a rhythm to open the simulator module.
        </p>
      </div>

      <div class="grid" role="list" aria-label="Rhythm modules">
        ${cards}
      </div>
    </section>
  `;
}

/* Optional (still works in-app if you ever link to these routes) */
function pageAbout(){
  setActiveSidebar(null);
  root.innerHTML = `
    <section class="page">
      <div class="hero">
        <h1 class="hero__title">About</h1>
        <p class="hero__sub">
          The Interactive 3D Cardiac Simulator aims to support paramedic learning through
          visual + interactive training. This coded version gives you full control over layout,
          navigation, and future interactive features.
        </p>
      </div>
    </section>
  `;
}

function pageCaseStudies(){
  setActiveSidebar(null);
  root.innerHTML = `
    <section class="page">
      <div class="hero">
        <h1 class="hero__title">Case Studies</h1>
        <p class="hero__sub">
          This section is ready for scenario-based cases (symptoms, vitals, rhythm strip, treatment choices, outcomes).
          For now, use the “Case Studies” box on Home which opens case-studies.html.
        </p>
      </div>
    </section>
  `;
}

function pageReviews(){
  setActiveSidebar(null);
  root.innerHTML = `
    <section class="page">
      <div class="hero">
        <h1 class="hero__title">Reviews</h1>
        <p class="hero__sub">
          This section can hold quick knowledge checks, quizzes, or skill validations.
          For now, use the “Reviews” box on Home which opens reviews.html.
        </p>
      </div>
    </section>
  `;
}

function pageSim(id){
  const r = window.RHYTHMS.find(x => x.id === id);
  if (!r){
    root.innerHTML = `
      <section class="page">
        <div class="hero">
          <h1 class="hero__title">Not found</h1>
          <p class="hero__sub">That module doesn’t exist. Go back to <a href="#/">Home</a>.</p>
        </div>
      </section>
    `;
    return;
  }

  setActiveSidebar(id);

  root.innerHTML = `
    <section class="page">
      <div class="sim-head">
        <div>
          <h1 class="sim-title">${escapeHtml(r.name)}</h1>
          <div class="sim-meta">${escapeHtml(r.description)}</div>
        </div>
        <div class="badge">Module • ${escapeHtml(r.tag)}</div>
      </div>

      <div class="sim-grid">
        <div class="canvas" aria-label="Animation canvas placeholder">
          <div class="canvas__placeholder">
            <div>
              <strong>Animation / 3D Area (placeholder)</strong><br/>
              Drop in Blender renders, a WebGL viewer (GLB), or a rhythm animation later.<br/>
              This layout is already sized and styled for it.
            </div>
          </div>
        </div>

        <aside class="panel" aria-label="Module info panel">
          <div class="panel__head">Status</div>
          <div class="panel__body">
            <div class="kv"><span>View</span><strong>Simulator</strong></div>
            <div class="kv"><span>Rhythm</span><strong>${escapeHtml(r.tag)}</strong></div>
            <div class="kv"><span>Controls</span><strong>Coming soon</strong></div>

            <div class="panel__head" style="margin:10px -14px 0; border-top:1px solid rgba(255,255,255,0.08);">
              Notes
            </div>
            <div style="color: rgba(255,255,255,0.72); line-height:1.6; font-size:13px;">
              Next upgrades you can plug in here:
              <ul style="margin:10px 0 0 18px; padding:0;">
                <li>Rate slider / conduction overlay toggles</li>
                <li>Medication scenarios + outcomes</li>
                <li>Hotspots for anatomical exploration</li>
                <li>3D heart (GLB) with guided labels</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function render(){
  const parts = getRoute();

  // [] => landing home (3 boxes)
  if (parts.length === 0){
    pageLanding();
    return;
  }

  if (parts[0] === "rhythms"){
    pageRhythms();
    return;
  }

  if (parts[0] === "about"){
    pageAbout();
    return;
  }

  if (parts[0] === "case-studies"){
    pageCaseStudies();
    return;
  }

  if (parts[0] === "reviews"){
    pageReviews();
    return;
  }

  if (parts[0] === "sim" && parts[1]){
    pageSim(parts[1]);
    return;
  }

  // fallback
  pageLanding();
}

function init(){
  renderSidebar();
  appShell.classList.add("app--collapsed");
  btnCollapse.textContent = "Expand Sidebar";

  btnHome.addEventListener("click", () => {
    window.location.hash = "#/";
  });

  btnCollapse.addEventListener("click", () => {
    appShell.classList.toggle("app--collapsed");
    btnCollapse.textContent = appShell.classList.contains("app--collapsed")
      ? "Expand sidebar"
      : "Collapse sidebar";
  });

  window.addEventListener("hashchange", render);
  render();
}


init();

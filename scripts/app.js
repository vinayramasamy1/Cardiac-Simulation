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
  // hash routes: #/ , #/about , #/sim/<id>
  const hash = window.location.hash || "#/";
  const clean = hash.replace(/^#/, "");
  const parts = clean.split("/").filter(Boolean);
  return parts; // [] => home, ["about"], ["sim","normal-sinus"]
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

function pageHome(){
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
        <h1 class="hero__title">Cardiac Simulator</h1>
        <p class="hero__sub">
          An interactive cardiac simulator that visualizes heart rhythms in real time, helping students
           and clinicians explore normal and abnormal ECG patterns through clear, dynamic simulations.
        </p>
      </div>

      <div class="grid" role="list" aria-label="Rhythm modules">
        ${cards}
      </div>
    </section>
  `;
}

/*
This is a polished layout prototype with a permanent sidebar and a simulator view.
          Replace the placeholder “animation canvas” with improved visuals (Blender exports, images, or true 3D)
          when you’re ready.
*/

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

  if (parts.length === 0){
    pageHome();
    return;
  }

  if (parts[0] === "about"){
    pageAbout();
    return;
  }

  if (parts[0] === "sim" && parts[1]){
    pageSim(parts[1]);
    return;
  }

  // fallback
  pageHome();
}

function init(){
  renderSidebar();

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

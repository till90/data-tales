(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");
  const grid = document.getElementById("projectGrid");
  const chipWrap = document.getElementById("tagChips");
  const searchInput = document.getElementById("searchInput");

  // --- PROJECT DATA (hier pflegst du später deine echten Links) ---
  const projects = [
    {
      title: "Weather Tool – Standortbasierte Abfragen",
      desc: "Kleines Web-Tool: Userinput → Wetterinfos/Visualisierungen. Fokus auf saubere UI und schnelle Antwortzeiten.",
      tags: ["python", "flask", "api", "data"],
      links: [
        { label: "Demo", href: "https://example.com" },
        { label: "Code", href: "https://github.com/" }
      ]
    },
    {
      title: "Dashboard – Datenvisualisierung",
      desc: "Interaktives Dashboard für Zeitreihen/Statistiken. Exportfähige Charts und klare Storytelling-Struktur.",
      tags: ["dashboard", "python", "data", "viz"],
      links: [
        { label: "Demo", href: "https://example.com" },
        { label: "Case Study", href: "https://example.com" }
      ]
    },
    {
      title: "Browser Quiz",
      desc: "Mini-Quiz mit Score, Progress und responsivem Layout. Ideal als leichtgewichtige Demo für UX und State-Handling.",
      tags: ["quiz", "frontend", "js"],
      links: [
        { label: "Demo", href: "https://example.com" },
        { label: "Code", href: "https://github.com/" }
      ]
    },
    {
      title: "Geräte-/Produktvorstellung",
      desc: "Landing + Doku für ein selbst entwickeltes Gerät inkl. Screenshots, Features, Architektur und Roadmap.",
      tags: ["hardware", "product", "docs"],
      links: [
        { label: "Page", href: "https://example.com" }
      ]
    }
  ];

  // --- THEME ---
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) root.setAttribute("data-theme", storedTheme);

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    themeToggle.querySelector("span[aria-hidden]").textContent = next === "dark" ? "☾" : "☀";
  }

  if (themeToggle) {
    const initial = root.getAttribute("data-theme") || "dark";
    themeToggle.querySelector("span[aria-hidden]").textContent = initial === "dark" ? "☾" : "☀";
    themeToggle.addEventListener("click", toggleTheme);
  }

  // --- FILTERING ---
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort((a, b) => a.localeCompare(b));
  let activeTag = "all";
  let query = "";

  function makeChip(label) {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.type = "button";
    btn.textContent = label;
    btn.setAttribute("aria-pressed", label === activeTag ? "true" : "false");
    btn.addEventListener("click", () => {
      activeTag = label;
      renderChips();
      renderProjects();
    });
    return btn;
  }

  function renderChips() {
    chipWrap.innerHTML = "";
    chipWrap.appendChild(makeChip("all"));
    allTags.forEach(t => chipWrap.appendChild(makeChip(t)));
  }

  function matches(p) {
    const tagOk = activeTag === "all" || p.tags.includes(activeTag);
    if (!tagOk) return false;

    const q = query.trim().toLowerCase();
    if (!q) return true;

    const hay = (p.title + " " + p.desc + " " + p.tags.join(" ")).toLowerCase();
    return hay.includes(q);
  }

  function projectCard(p) {
    const el = document.createElement("article");
    el.className = "card";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = p.title;

    const desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = p.desc;

    const tags = document.createElement("div");
    tags.className = "card-tags";
    p.tags.forEach(t => {
      const s = document.createElement("span");
      s.className = "tag";
      s.textContent = t;
      tags.appendChild(s);
    });

    const links = document.createElement("div");
    links.className = "card-links";
    (p.links || []).forEach(l => {
      const a = document.createElement("a");
      a.href = l.href;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = l.label;
      links.appendChild(a);
    });

    el.appendChild(title);
    el.appendChild(desc);
    el.appendChild(tags);
    el.appendChild(links);
    return el;
  }

  function renderProjects() {
    grid.innerHTML = "";
    const filtered = projects.filter(matches);
    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "card";
      empty.innerHTML = `<h3 class="card-title">Keine Treffer</h3><p class="card-desc">Passe Suche oder Tag-Filter an.</p>`;
      grid.appendChild(empty);
      return;
    }
    filtered.forEach(p => grid.appendChild(projectCard(p)));
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      query = e.target.value || "";
      renderProjects();
    });
  }

  // Footer year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  renderChips();
  renderProjects();
})();

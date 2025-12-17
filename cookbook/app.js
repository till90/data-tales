/* global marked */
(() => {
  const $ = (id) => document.getElementById(id);

  const q = $("q");
  const list = $("list");
  const tagsEl = $("tags");
  const countEl = $("count");
  const titleEl = $("title");
  const dateEl = $("date");
  const taglineEl = $("tagline");
  const rawEl = $("raw");
  const docEl = $("doc");
  const themeBtn = $("theme");

  const INDEX_URL = "./index.json";

  let entries = [];
  let activeTag = "all";
  let query = "";

  // Theme
  const root = document.documentElement;
  const saved = localStorage.getItem("cookbook-theme");
  if (saved) root.setAttribute("data-theme", saved);
  themeBtn.addEventListener("click", () => {
    const cur = root.getAttribute("data-theme") || "dark";
    const next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("cookbook-theme", next);
  });

  function uniq(arr){ return [...new Set(arr)]; }

  function renderTags() {
    const allTags = uniq(entries.flatMap(e => e.tags || [])).sort((a,b)=>a.localeCompare(b));
    tagsEl.innerHTML = "";

    const mk = (label) => {
      const b = document.createElement("button");
      b.className = "tag";
      b.type = "button";
      b.textContent = label;
      b.setAttribute("aria-pressed", label === activeTag ? "true" : "false");
      b.addEventListener("click", () => {
        activeTag = label;
        renderTags();
        renderList();
      });
      return b;
    };

    tagsEl.appendChild(mk("all"));
    allTags.forEach(t => tagsEl.appendChild(mk(t)));
  }

  function matches(e) {
    if (activeTag !== "all" && !(e.tags || []).includes(activeTag)) return false;
    const qq = query.trim().toLowerCase();
    if (!qq) return true;
    const hay = `${e.title || ""} ${e.summary || ""} ${(e.tags || []).join(" ")}`.toLowerCase();
    return hay.includes(qq);
  }

  function setActiveInList(slug) {
    [...list.querySelectorAll(".item")].forEach(a => {
      a.classList.toggle("active", a.dataset.slug === slug);
    });
  }

  async function openEntry(slug) {
    const e = entries.find(x => x.slug === slug);
    if (!e) return;

    setActiveInList(slug);

    titleEl.textContent = e.title || slug;
    dateEl.textContent = e.date ? `Datum: ${e.date}` : "";
    taglineEl.textContent = (e.tags && e.tags.length) ? `Tags: ${e.tags.join(", ")}` : "";

    rawEl.style.display = "inline";
    rawEl.href = e.path;

    const res = await fetch(e.path, { cache: "no-store" });
    const md = await res.text();

    // Frontmatter entfernen (--- ... ---)
    const cleaned = md.replace(/^---[\s\S]*?---\s*/m, "");
    docEl.innerHTML = marked.parse(cleaned);
  }

  function renderList() {
    list.innerHTML = "";
    const filtered = entries.filter(matches);

    countEl.textContent = `${filtered.length} Einträge`;

    filtered.forEach(e => {
      const a = document.createElement("a");
      a.className = "item";
      a.href = `#${encodeURIComponent(e.slug)}`;
      a.dataset.slug = e.slug;

      const t = document.createElement("div");
      t.className = "t";
      t.textContent = e.title || e.slug;

      const s = document.createElement("div");
      s.className = "s";
      s.textContent = e.summary || "";

      a.appendChild(t);
      a.appendChild(s);
      list.appendChild(a);
    });

    // Wenn Hash gesetzt: öffnen
    const slug = decodeURIComponent((location.hash || "").replace(/^#/, ""));
    if (slug) openEntry(slug);
  }

  async function init() {
    const res = await fetch(INDEX_URL, { cache: "no-store" });
    entries = await res.json();

    renderTags();
    renderList();

    window.addEventListener("hashchange", () => {
      const slug = decodeURIComponent((location.hash || "").replace(/^#/, ""));
      if (slug) openEntry(slug);
    });

    q.addEventListener("input", (ev) => {
      query = ev.target.value || "";
      renderList();
    });
  }

  init().catch(err => {
    docEl.innerHTML = `<p class="muted">Fehler beim Laden des Cookbook-Index: ${String(err)}</p>`;
  });
})();

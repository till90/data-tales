(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");
  const servicesSlider = document.getElementById("servicesSlider");
  const projectSlider = document.getElementById("projectSlider");

  // --- DATA ---
  const services = [
    {
      title: "PLZ zu Koordinaten",
      img: "/assets/img/services/plz.png",
      href: "https://plz.data-tales.dev"
    },
    {
      title: "OSM Baumbestand zählen",
      img: "/assets/img/services/tree-locator.png",
      href: "https://tree-locator.data-tales.dev"
    },
    {
      title: "Cookbook",
      img: "/assets/img/services/cookbook.png",
      href: "/cookbook"
    },
    {
      title: "Paw Patrole Wiki",
      img: "/assets/img/services/paw-wiki.png",
      href: "https://paw-wiki.data-tales.dev"
    },
    {
      title: "Paw Patrole Quiz",
      img: "/assets/img/services/paw-quiz.png",
      href: "https://paw-quiz.data-tales.dev"
    },
    {
      title: "Wurm Attacke 3000",
      img: "/assets/img/services/worm-attack.png",
      href: "https://worm-attack-3000.data-tales.dev"
    }
  ];

  const projects = [
   {
     title: "FlyBi/SoniTrace: Offline Vogel-Erkennung",
     desc: "Ein innovatives System zur automatischen Vogel-Erkennung auf dem Raspberry Pi, das offline arbeitet. Es nutzt BirdNET/TFLite-Modelle, um Vogelstimmen in Echtzeit zu identifizieren – ideal für den Einsatz in abgelegenen Gebieten ohne Internetverbindung.",
     tags: ["Raspberry Pi", "Python", "TFLite", "BirdNET", "SQLite", "Web-Dashboard"],
     links: [
       { label: "Website", href: "https://sonitrace.com/" }
     ],
     images: [
       "/assets/img/projects/flybi-1.png",
       "/assets/img/projects/flybi-2.png",
       "/assets/img/projects/flybi-3.png",
       "/assets/img/projects/flybi-4.png",
       "/assets/img/projects/flybi-5.png",
       "/assets/img/projects/flybi-6.png",
       "/assets/img/projects/flybi-7.png",
       "/assets/img/projects/flybi-8.png",
       "/assets/img/projects/flybi-9.png",
       "/assets/img/projects/flybi-10.png",
       "/assets/img/projects/flybi-11.png",
       "/assets/img/projects/flybi-12.png",
       "/assets/img/projects/flybi-13.png",
       "/assets/img/projects/flybi-14.png"
     ]
   },
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

  // --- SLIDESHOW LOGIC ---
  function createSlideshow(sliderEl, data, cardRenderer) {
    if (!sliderEl) return;

    let currentIndex = 0;
    let touchStartX = 0;

    const wrapper = sliderEl.parentElement;
    const prevBtn = wrapper.querySelector(".nav-btn.prev");
    const nextBtn = wrapper.querySelector(".nav-btn.next");

    function render() {
      sliderEl.innerHTML = "";
      data.forEach(item => {
       const card = cardRenderer(item);
       sliderEl.appendChild(card);
     });
      updateSlider();
    }

    function updateSlider() {
      const offset = -currentIndex * 100;
      sliderEl.style.transform = `translateX(${offset}%)`;
    }

    function next() {
      currentIndex = (currentIndex + 1) % data.length;
      updateSlider();
    }

    function prev() {
      currentIndex = (currentIndex - 1 + data.length) % data.length;
      updateSlider();
    }

    function handleTouchStart(e) {
      touchStartX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
      if (touchStartX === 0) return;
      const touchEndX = e.touches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (diff > 50) { // Swipe left
        next();
        touchStartX = 0;
      } else if (diff < -50) { // Swipe right
        prev();
        touchStartX = 0;
      }
    }

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);
    sliderEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    sliderEl.addEventListener("touchmove", handleTouchMove, { passive: true });

    render();
  }

  // --- RENDER FUNCTIONS ---
  function renderServiceCard(item) {
    const el = document.createElement("a");
    el.className = "card service-card";
    el.href = item.href;
    el.innerHTML = `
      <img src="${item.img}" alt="${item.title}" loading="lazy">
      <div class="card-title">${item.title}</div>
    `;
    return el;
  }

  function renderProjectCard(item) {
   const el = document.createElement("div");
   el.className = "slide";
   
   let imageSlider = "";
   if(item.images && item.images.length > 0){
       imageSlider = `
       <div class="card-img">
           <div class="project-img-slider" data-images='${JSON.stringify(item.images)}'></div>
       </div>
       `;
   }

   el.innerHTML = `
       <div class="card project-card">
           ${imageSlider}
           <div class="card-content">
               <h3>${item.title}</h3>
               <p>${item.desc}</p>
               <div class="pill-row" aria-label="Technologien">
                   ${item.tags.map(tag => `<span class="pill">${tag}</span>`).join('')}
               </div>
               <div class="card-actions">
                   ${item.links.map(link => `<a class="btn btn-secondary" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join('')}
               </div>
           </div>
       </div>
   `;
   return el;
}

  // --- INIT ---
  if (servicesSlider) createSlideshow(servicesSlider, services, renderServiceCard);
  if (projectSlider) createSlideshow(projectSlider, projects, renderProjectCard);

  // Footer year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

window.addEventListener('load', () => {
   const sliders = document.querySelectorAll('.project-img-slider');
   sliders.forEach(slider => {
     const images = JSON.parse(slider.dataset.images);
     let currentIndex = 0;
     setInterval(() => {
       slider.style.backgroundImage = `url(${images[currentIndex]})`;
       currentIndex = (currentIndex + 1) % images.length;
     }, 5000);
     slider.style.backgroundImage = `url(${images[0]})`;
   });
 });

(function(){
  const dd = document.querySelector('[data-dropdown]');
  if(!dd) return;

  const btn = dd.querySelector('.nav-dropbtn');
  const menu = dd.querySelector('.nav-menu');

  function setOpen(isOpen){
    btn.setAttribute('aria-expanded', String(isOpen));
    if(isOpen){
      menu.hidden = false;
      dd.classList.add('open');
    }else{
      menu.hidden = true;
      dd.classList.remove('open');
    }
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  document.addEventListener('click', (e) => {
    if(!dd.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') setOpen(false);
  });

  // Wenn per Tab aus dem Dropdown rausnavigiert wird: schließen
  dd.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if(!dd.contains(document.activeElement)) setOpen(false);
    });
  });

  // Initial geschlossen
  setOpen(false);
})();

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- i18n (EN default, PL) ---------- */
  const PL = {
    skip: "Przejdź do treści",
    "nav.features": "Funkcje",
    "nav.showcase": "Galeria",
    "nav.faq": "FAQ",
    "nav.download": "Pobierz",
    "hero.badge": "Zawsze za darmo · Wsparcie Fabric",
    "hero.t1": "Więcej klatek.",
    "hero.t2": "Lepsza gra.",
    "hero.lead": "Wszystko w jednym kliencie Minecraft: solidny boost FPS, ponad 60 wbudowanych modów PvP, Twoje własne mody Fabric i darmowe kosmetyki — gotowe w jedno kliknięcie.",
    "hero.cta": "Pobierz na",
    "hero.cta2": "Zobacz w akcji",
    "hero.m1": "Bez zakładania konta",
    "hero.m2": "Windows, macOS, Linux",
    "hero.m3": "Bez cheatów, bezpieczny na serwerach",
    "stats.mods": "wbudowanych modów",
    "stats.price": "zawsze za darmo",
    "stats.os": "systemy operacyjne",
    "stats.install": "instalacja",
    "feat.eyebrow": "Dlaczego Dream Client",
    "feat.title": "Wszystko, czego potrzebujesz. Nic zbędnego.",
    "feat.lead": "Dla graczy, którzy chcą płynnej rozgrywki i czystego HUD-u bez żonglowania dziesiątkami modów.",
    "f1.t": "Ogromny boost FPS",
    "f1.d": "Nowoczesne optymalizacje renderowania, sprytniejsze ładowanie chunków i dopracowane zarządzanie pamięcią. Płynnie nawet na starszych laptopach.",
    "f1.vanilla": "Vanilla",
    "f2.t": "60+ modów PvP",
    "f2.d": "Keystrokes, CPS, armor status, toggle sprint, zoom, kolor uderzeń i wiele więcej — wszystko wbudowane.",
    "f3.t": "Wsparcie Fabric",
    "f3.d": "Dodaj swoje ulubione mody Fabric i zarządzaj nimi we wbudowanym menedżerze modów.",
    "f4.t": "Darmowe kosmetyki",
    "f4.d": "Peleryny, skrzydła, czapki i więcej w Twojej szafce. Bez paywalli i lootboxów.",
    "f5.t": "Edytor HUD drag & drop",
    "f5.d": "Ustaw każdy element dokładnie tam, gdzie chcesz, z przyciąganiem do pikseli na żywo.",
    "f6.t": "Bezpieczny na serwerach",
    "f6.d": "Tylko wydajność i funkcje ułatwiające grę — zero cheatów. Graj na ulubionych serwerach bez obaw.",
    "show.eyebrow": "Galeria",
    "show.title": "Zajrzyj do środka",
    "show.t1": "Menu główne",
    "show.t2": "Menu modów i HUD",
    "show.t3": "Szafka z kosmetykami",
    "show.t4": "Mody Fabric",
    "show.c1": "Przejrzyste menu główne z szybkim dostępem do serwerów, modów i szafki.",
    "show.c2": "Konfiguruj mody i układaj HUD z przyciąganiem do pikseli na żywo.",
    "show.c3": "Darmowe peleryny, skrzydła i dodatki — wybierz swój styl.",
    "show.c4": "Wbudowany menedżer modów Fabric — dodawaj, włączaj i wyłączaj jednym kliknięciem.",
    "steps.eyebrow": "Zacznij",
    "steps.title": "Grasz w mniej niż minutę",
    "s1.t": "Pobierz",
    "s1.d": "Pobierz instalator dla swojego systemu.",
    "s2.t": "Zaloguj się",
    "s2.d": "Zaloguj się kontem Microsoft, tak jak w oficjalnym launcherze.",
    "s3.t": "Graj",
    "s3.d": "Wybierz mody, ustaw HUD i wskakuj do gry.",
    "faq.title": "Pytania? Odpowiedzi.",
    "faq.lead": "Nie znalazłeś odpowiedzi? Zapytaj nas na Discordzie.",
    "faq.cta": "Dołącz do Discorda",
    q1: "Czy Dream Client jest całkowicie darmowy?",
    a1: "Tak. Dream Client jest w 100% darmowy — łącznie z kosmetykami.",
    q2: "Czy naprawdę zwiększa FPS?",
    a2: "Tak. Optymalizacje renderowania i lepsze zarządzanie pamięcią wyraźnie zwiększają FPS na większości komputerów, szczególnie słabszych.",
    q3: "Jakie systemy są wspierane?",
    a3: "Windows, macOS i Linux.",
    q4: "Czy mogę używać własnych modów Fabric?",
    a4: "Tak. Dodaj je przez wbudowany menedżer modów Fabric i używaj razem z wbudowanymi modami.",
    q5: "Czy dostanę bana na serwerach?",
    a5: "Dream Client nie zawiera cheatów — tylko wydajność i funkcje ułatwiające grę. Mimo to zawsze sprawdzaj regulamin serwera, na którym grasz.",
    "dl.title": "Gotowy na płynniejszą grę?",
    "dl.lead": "Pobierz Dream Client za darmo i poczuj różnicę od pierwszego meczu.",
    "dl.fine": "Wymaga legalnej kopii Minecraft: Java Edition.",
    "foot.disc": "To nie jest oficjalny produkt Minecraft. Nie jest zatwierdzony ani powiązany z Mojang lub Microsoft.",
    rec: "polecane",
  };
  const CAPTIONS = {
    mainmenu: ["show.t1", "show.c1", "A clean main menu with quick access to servers, mods and your locker."],
    modmenu: ["show.t2", "show.c2", "Configure mods and arrange your HUD with live pixel snapping."],
    locker: ["show.t3", "show.c3", "Free capes, wings and accessories — pick your style."],
    mods: ["show.t4", "show.c4", "Built-in Fabric mods manager — add, enable and disable mods in one click."],
  };

  const EN = {};
  $$("[data-i18n]").forEach((el) => (EN[el.dataset.i18n] = el.innerHTML.trim()));
  Object.values(CAPTIONS).forEach(([, k, v]) => (EN[k] = EN[k] || v));
  EN.rec = "recommended";

  let lang = "en";
  const t = (k) => (lang === "pl" ? PL[k] : EN[k]) ?? EN[k] ?? k;

  function setLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => {
      const v = t(el.dataset.i18n);
      if (v != null) el.innerHTML = v;
    });
    $("#langToggle").textContent = lang === "pl" ? "EN" : "PL";
    $$(".os").forEach((o) => o.setAttribute("data-rec", t("rec")));
    updateShotLabel();
    try { localStorage.setItem("dc-lang", lang); } catch (_) {}
  }

  /* ---------- OS detection ---------- */
  const ua = navigator.userAgent;
  const os = /Mac|iPhone|iPad/.test(ua) ? "mac" : /Linux|X11/.test(ua) && !/Android/.test(ua) ? "linux" : "windows";
  const osLabel = { windows: "Windows", mac: "macOS", linux: "Linux" }[os];
  $$(".os-name").forEach((el) => (el.textContent = osLabel));
  const osCard = $(`.os[data-os="${os}"]`);
  if (osCard) osCard.classList.add("detected");

  /* ---------- nav ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 10);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $("#burger");
  const links = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", open);
    links.classList.toggle("open", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      burger.setAttribute("aria-expanded", "false");
      links.classList.remove("open");
    }
  });

  $("#langToggle").addEventListener("click", () => setLang(lang === "pl" ? "en" : "pl"));

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }),
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });

  /* ---------- card spotlight ---------- */
  $$(".card").forEach((c) =>
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    })
  );

  /* ---------- hero tilt ---------- */
  const tilt = $("#tilt");
  if (tilt && !reduced && matchMedia("(pointer: fine) and (min-width: 981px)").matches) {
    const hero = $(".hero");
    hero.addEventListener("pointermove", (e) => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      tilt.style.transform = `rotateY(${-8 + x * 10}deg) rotateX(${4 - y * 8}deg)`;
    });
    hero.addEventListener("pointerleave", () => (tilt.style.transform = ""));
  }

  /* ---------- HUD animation ---------- */
  const fpsEl = $("#fps"), cpsEl = $("#cps");
  if (fpsEl) {
    let fps = 0;
    const target = () => 340 + Math.round(Math.random() * 90);
    let goal = target();
    const step = () => {
      fps += (goal - fps) * 0.08;
      fpsEl.textContent = Math.round(fps);
      if (Math.abs(goal - fps) < 2) goal = target();
      if (!reduced) requestAnimationFrame(step);
    };
    if (reduced) fpsEl.textContent = "380"; else requestAnimationFrame(step);
    if (!reduced) {
      const keys = $$(".hud-keys kbd");
      setInterval(() => {
        cpsEl.textContent = 9 + Math.floor(Math.random() * 6);
        keys.forEach((k) => k.classList.remove("on"));
        keys[Math.floor(Math.random() * keys.length)].classList.add("on");
      }, 700);
    }
  }

  /* ---------- counters ---------- */
  const countIO = new IntersectionObserver((entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || "";
      if (reduced) { el.textContent = end + suf; return; }
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / 1200);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    })
  );
  $$("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- showcase tabs ---------- */
  const img = $("#shotImg"), label = $("#shotLabel"), cap = $("#shotCaption");
  let current = "mainmenu";
  function updateShotLabel() {
    const [lk, ck] = CAPTIONS[current];
    label.textContent = t(lk).replace(/&amp;/g, "&");
    cap.dataset.i18n = ck;
    cap.innerHTML = t(ck);
    img.alt = `Dream Client — ${label.textContent}`;
  }
  const tabs = $$('[role="tab"]');
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      if (tab.dataset.shot === current) return;
      current = tab.dataset.shot;
      tabs.forEach((b) => b.setAttribute("aria-selected", b === tab));
      img.classList.add("fade");
      const next = new Image();
      next.src = `/preview/${current}.webp`;
      const swap = () => { img.src = next.src; updateShotLabel(); img.classList.remove("fade"); };
      next.decode ? next.decode().then(swap, swap) : setTimeout(swap, 200);
    })
  );
  // keyboard arrows between tabs
  $(".tabs").addEventListener("keydown", (e) => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0 || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const n = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    n.focus(); n.click();
  });

  /* ---------- init ---------- */
  $("#year").textContent = new Date().getFullYear();
  const params = new URLSearchParams(location.search);
  let initial = params.get("lang");
  if (!initial) { try { initial = localStorage.getItem("dc-lang"); } catch (_) {} }
  if (!initial) initial = (navigator.language || "").toLowerCase().startsWith("pl") ? "pl" : "en";
  setLang(initial === "pl" ? "pl" : "en");
})();

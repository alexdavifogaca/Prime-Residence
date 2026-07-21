/* Interações — header, menu, busca, favoritos, FAQ, formulários */

const Interactions = (() => {
  const state = {
    purpose: "comprar",
    chip: "all",
    favorites: new Set(JSON.parse(localStorage.getItem("pr-favs") || "[]"))
  };

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2800);
  }

  function initHeader() {
    const header = document.getElementById("siteHeader");
    const toggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
      const back = document.getElementById("backToTop");
      if (back) back.classList.toggle("is-visible", window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && mobileNav) {
      const close = () => {
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
        mobileNav.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      };

      toggle.addEventListener("click", () => {
        const open = !mobileNav.classList.contains("is-open");
        toggle.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        mobileNav.classList.toggle("is-open", open);
        mobileNav.setAttribute("aria-hidden", String(!open));
        document.body.style.overflow = open ? "hidden" : "";
      });

      mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", close);
      });
    }

    document.getElementById("backToTop")?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Active nav on scroll
    const sections = [...document.querySelectorAll("main section[id]")];
    const navLinks = document.querySelectorAll(".nav-desktop .nav-link");

    const spy = () => {
      const y = window.scrollY + 120;
      let current = "home";
      sections.forEach((sec) => {
        if (sec.offsetTop <= y) current = sec.id;
      });
      navLinks.forEach((link) => {
        const href = link.getAttribute("href")?.replace("#", "");
        link.classList.toggle("active", href === current);
      });
    };
    window.addEventListener("scroll", spy, { passive: true });
  }

  function formatMeta(p) {
    return `
      <span><i class="fa-solid fa-ruler-combined"></i> ${p.area} m²</span>
      <span><i class="fa-solid fa-bed"></i> ${p.rooms}</span>
      <span><i class="fa-solid fa-bath"></i> ${p.baths}</span>
      <span><i class="fa-solid fa-car"></i> ${p.garage}</span>
    `;
  }

  function tagClass(tag) {
    if (tag === "Lançamento" || tag === "Alto padrão") return "gold";
    if (tag === "Cobertura") return "petroleum";
    return "";
  }

  function createPropertyCard(p, index = 0) {
    const fav = state.favorites.has(p.id);
    const tags = p.tags
      .slice(0, 2)
      .map((t) => `<span class="tag ${tagClass(t)}">${t}</span>`)
      .join("");

    const card = document.createElement("article");
    card.className = "property-card is-entering";
    card.dataset.id = p.id;
    card.dataset.type = p.type;
    card.dataset.purpose = p.purpose;
    card.dataset.city = p.city;
    card.dataset.price = p.price;
    card.dataset.rooms = p.rooms;
    card.dataset.tags = p.tags.join(",");
    card.style.animationDelay = `${(index % 6) * 0.06}s`;

    card.innerHTML = `
      <div class="property-media">
        <img src="${p.image}" alt="${p.title} em ${p.neighborhood}" loading="lazy">
        <div class="property-skeleton" aria-hidden="true"></div>
        <div class="property-tags">${tags}</div>
        <button class="fav-btn ${fav ? "is-active" : ""}" type="button" aria-label="Favoritar ${p.title}" data-fav="${p.id}">
          <i class="${fav ? "fa-solid" : "fa-regular"} fa-heart"></i>
        </button>
      </div>
      <div class="property-body">
        <div class="property-price">${p.priceLabel}${p.priceSuffix ? `<small>${p.priceSuffix}</small>` : ""}</div>
        <h3 class="property-title">${p.title}</h3>
        <p class="property-location"><i class="fa-solid fa-location-dot"></i> ${p.neighborhood}, ${p.city}</p>
        <div class="property-meta">${formatMeta(p)}</div>
        <p class="property-desc">${p.description}</p>
        <div class="property-cta">
          <a href="#contato" class="btn btn-outline btn-sm">Agendar visita</a>
        </div>
      </div>
    `;

    const img = card.querySelector("img");
    const sk = card.querySelector(".property-skeleton");
    const markLoaded = () => {
      img.classList.add("is-loaded");
      if (sk) sk.style.opacity = "0";
    };
    if (img.complete) markLoaded();
    else img.addEventListener("load", markLoaded);

    return card;
  }

  function getFiltered() {
    const city = document.getElementById("filterCity")?.value || "";
    const type = document.getElementById("filterType")?.value || "";
    const price = document.getElementById("filterPrice")?.value || "";
    const rooms = document.getElementById("filterRooms")?.value || "";

    return PROPERTIES.filter((p) => {
      if (p.purpose !== state.purpose) return false;
      if (state.chip !== "all") {
        const matchChip =
          p.type === state.chip ||
          p.tags.includes(state.chip) ||
          (state.chip === "Lançamento" && p.launch);
        if (!matchChip) return false;
      }
      if (city && p.city !== city) return false;
      if (type && p.type !== type) return false;
      if (rooms && p.rooms < Number(rooms)) return false;
      if (price) {
        const [min, max] = price.split("-").map(Number);
        if (p.price < min || p.price > max) return false;
      }
      return true;
    });
  }

  function renderProperties() {
    const grid = document.getElementById("propertiesGrid");
    const empty = document.getElementById("propertiesEmpty");
    if (!grid) return;

    const list = getFiltered();
    grid.innerHTML = "";

    if (!list.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    list.forEach((p, i) => {
      grid.appendChild(createPropertyCard(p, i));
    });

    if (typeof AOS !== "undefined") AOS.refresh();
  }

  function initFavorites() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-fav]");
      if (!btn) return;
      const id = Number(btn.dataset.fav);
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
        btn.classList.remove("is-active");
        btn.querySelector("i").className = "fa-regular fa-heart";
        showToast("Removido dos favoritos");
      } else {
        state.favorites.add(id);
        btn.classList.add("is-active");
        btn.querySelector("i").className = "fa-solid fa-heart";
        showToast("Salvo nos favoritos");
      }
      localStorage.setItem("pr-favs", JSON.stringify([...state.favorites]));
    });
  }

  function initSearch() {
    const priceSelect = document.getElementById("filterPrice");
    const priceOptions = {
      comprar: `
        <option value="">Qualquer valor</option>
        <option value="0-500000">Até R$ 500 mil</option>
        <option value="500000-1000000">R$ 500 mil – 1 mi</option>
        <option value="1000000-2000000">R$ 1 mi – 2 mi</option>
        <option value="2000000-99999999">Acima de R$ 2 mi</option>
      `,
      alugar: `
        <option value="">Qualquer valor</option>
        <option value="0-3000">Até R$ 3 mil</option>
        <option value="3000-6000">R$ 3 mil – 6 mil</option>
        <option value="6000-15000">R$ 6 mil – 15 mil</option>
        <option value="15000-99999999">Acima de R$ 15 mil</option>
      `
    };

    const syncPriceOptions = () => {
      if (!priceSelect) return;
      priceSelect.innerHTML = priceOptions[state.purpose] || priceOptions.comprar;
    };

    document.querySelectorAll(".search-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".search-tab").forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        state.purpose = tab.dataset.purpose;
        syncPriceOptions();
        renderProperties();
      });
    });

    document.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        state.chip = chip.dataset.chip;
        renderProperties();
      });
    });

    document.getElementById("searchForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      renderProperties();
      document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" });
      showToast("Busca atualizada");
    });

    document.getElementById("clearFilters")?.addEventListener("click", () => {
      state.chip = "all";
      state.purpose = "comprar";
      document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.dataset.chip === "all"));
      document.querySelectorAll(".search-tab").forEach((t) => {
        const active = t.dataset.purpose === "comprar";
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", String(active));
      });
      syncPriceOptions();
      ["filterCity", "filterType", "filterPrice", "filterRooms"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      renderProperties();
    });

    document.querySelectorAll("[data-filter-jump]").forEach((link) => {
      link.addEventListener("click", () => {
        state.purpose = link.dataset.filterJump;
        document.querySelectorAll(".search-tab").forEach((t) => {
          const active = t.dataset.purpose === state.purpose;
          t.classList.toggle("active", active);
          t.setAttribute("aria-selected", String(active));
        });
        syncPriceOptions();
        renderProperties();
      });
    });
  }

  function renderLaunches() {
    const track = document.getElementById("launchesTrack");
    if (!track) return;

    const items = LAUNCHES.length ? LAUNCHES : PROPERTIES.slice(0, 3);
    track.innerHTML = items
      .map(
        (p) => `
      <div class="swiper-slide">
        <article class="launch-card">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <div class="launch-overlay">
            <span class="tag gold">Lançamento</span>
            <h3>${p.title}</h3>
            <p>${p.neighborhood}, ${p.city} · ${p.area} m²</p>
            <div class="launch-price">${p.priceLabel}</div>
          </div>
        </article>
      </div>`
      )
      .join("");

    if (typeof Swiper !== "undefined") {
      new Swiper(".launches-swiper", {
        slidesPerView: 1.15,
        spaceBetween: 16,
        loop: items.length > 2,
        pagination: { el: ".launches-pagination", clickable: true },
        breakpoints: {
          640: { slidesPerView: 1.6, spaceBetween: 18 },
          900: { slidesPerView: 2.2, spaceBetween: 22 },
          1100: { slidesPerView: 2.6, spaceBetween: 24 }
        }
      });
    }
  }

  function renderTestimonials() {
    const track = document.getElementById("testimonialsTrack");
    if (!track) return;

    track.innerHTML = TESTIMONIALS.map(
      (t) => `
      <div class="swiper-slide">
        <article class="testimonial-card">
          <div class="testimonial-stars">${'<i class="fa-solid fa-star"></i>'.repeat(t.rating)}</div>
          <p class="testimonial-text">“${t.text}”</p>
          <div class="testimonial-author">
            <img src="${t.avatar}" alt="Foto de ${t.name}" loading="lazy" width="48" height="48">
            <div>
              <strong>${t.name}</strong>
              <span>${t.role}</span>
            </div>
          </div>
        </article>
      </div>`
    ).join("");

    if (typeof Swiper !== "undefined") {
      new Swiper(".testimonials-swiper", {
        slidesPerView: 1,
        spaceBetween: 18,
        loop: true,
        autoplay: { delay: 5200, disableOnInteraction: false },
        navigation: {
          nextEl: ".testimonials-next",
          prevEl: ".testimonials-prev"
        },
        breakpoints: {
          720: { slidesPerView: 2 },
          1020: { slidesPerView: 3 }
        }
      });
    }
  }

  function renderBlog() {
    const grid = document.getElementById("blogGrid");
    if (!grid) return;

    grid.innerHTML = BLOG_POSTS.map(
      (post, i) => `
      <article class="blog-card" data-aos="fade-up" data-aos-delay="${i * 80}">
        <div class="blog-thumb">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-body">
          <span class="blog-meta">${post.category} · ${post.date}</span>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <a href="#contato" class="text-link">Ler artigo <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </article>`
    ).join("");
  }

  function renderFAQ() {
    const list = document.getElementById("faqList");
    if (!list) return;

    list.innerHTML = FAQ_ITEMS.map(
      (item, i) => `
      <div class="faq-item ${i === 0 ? "is-open" : ""}">
        <button class="faq-question" type="button" aria-expanded="${i === 0}">
          <span>${item.q}</span>
          <span class="faq-icon"><i class="fa-solid fa-plus"></i></span>
        </button>
        <div class="faq-answer"><p>${item.a}</p></div>
      </div>`
    ).join("");

    list.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq-question");
      if (!btn) return;
      const item = btn.closest(".faq-item");
      const open = item.classList.contains("is-open");
      list.querySelectorAll(".faq-item").forEach((el) => {
        el.classList.remove("is-open");
        el.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  }

  function initContactForm() {
    document.getElementById("contactForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      showToast("Mensagem enviada! Em breve entraremos em contato.");
      form.reset();
    });
  }

  function initYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function init() {
    initHeader();
    initSearch();
    initFavorites();
    initContactForm();
    initYear();
    renderProperties();
    renderLaunches();
    renderTestimonials();
    renderBlog();
    renderFAQ();
  }

  return { init, renderProperties, showToast, state };
})();

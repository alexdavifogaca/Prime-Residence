/* Animações — GSAP, AOS, contadores, parallax */

const Animations = (() => {
  let countersStarted = new WeakSet();

  function initAOS() {
    if (typeof AOS === "undefined") return;
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    });
  }

  function initGSAP() {
    if (typeof gsap === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const heroImage = document.getElementById("heroImage");
    if (heroImage) {
      gsap.to(heroImage, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    gsap.utils.toArray(".diff-card").forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: i * 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none"
        }
      });
    });

    gsap.utils.toArray(".process-step").forEach((step, i) => {
      gsap.from(step, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".process-timeline",
          start: "top 80%"
        }
      });
    });
  }

  function animateCounter(el) {
    if (countersStarted.has(el)) return;
    countersStarted.add(el);

    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();

    const format = (n) => {
      if (target >= 1000) {
        return Math.floor(n).toLocaleString("pt-BR") + suffix;
      }
      return Math.floor(n) + suffix;
    };

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = format(target);
    };

    requestAnimationFrame(tick);
  }

  function initCounters() {
    const els = document.querySelectorAll("[data-count]");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    els.forEach((el) => observer.observe(el));
  }

  function initMouseLight() {
    document.querySelectorAll("[data-mouse-light]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });
  }

  function initButtonRipple() {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("pointerdown", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty("--ripple-x", `${x}px`);
        btn.style.setProperty("--ripple-y", `${y}px`);

        const circle = document.createElement("span");
        circle.className = "ripple";
        const size = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = `${size}px`;
        circle.style.left = `${x - size / 2}px`;
        circle.style.top = `${y - size / 2}px`;
        btn.appendChild(circle);
        circle.addEventListener("animationend", () => circle.remove());
      });
    });
  }

  function initCustomCursor() {
    const cursor = document.getElementById("customCursor");
    const dot = document.getElementById("customCursorDot");
    if (!cursor || !dot) return;
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 900) return;

    document.body.classList.add("has-custom-cursor");

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    const loop = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll("a, button, .chip, .fav-btn, input, select, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
  }

  function initPageLoader() {
    const loader = document.getElementById("pageLoader");
    if (!loader) return;

    const hide = () => {
      loader.classList.add("is-done");
      setTimeout(() => loader.remove(), 700);
    };

    if (document.readyState === "complete") {
      setTimeout(hide, 600);
    } else {
      window.addEventListener("load", () => setTimeout(hide, 600));
    }
  }

  function init() {
    initPageLoader();
    initAOS();
    initGSAP();
    initCounters();
    initMouseLight();
    initButtonRipple();
    initCustomCursor();
  }

  return { init, animateCounter };
})();

/** Small progressive-enhancement helpers: scroll reveal, mobile nav, year. */

function initReveal() {
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.transitionDelay =
            (entry.target as HTMLElement).dataset.delay || "0ms";
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );
  els.forEach((el) => io.observe(el));
}

function initNav() {
  document.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t.closest("[data-nav-toggle]")) {
      document.documentElement.classList.toggle("nav-open");
    } else if (t.closest("[data-nav-link]")) {
      document.documentElement.classList.remove("nav-open");
    }
  });
}

function initYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

function start() {
  initReveal();
  initNav();
  initYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

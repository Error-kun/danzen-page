(function () {
  var THEME_KEY = "danzen-theme";
  var navToggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  var backdrop = document.querySelector("[data-nav-backdrop]");
  var brand = document.querySelector("[data-brand]");
  var themeSwitch = document.querySelector("[data-theme-switch]");

  function themeAttr(choice) {
    return choice === "default" ? "dark" : choice;
  }

  function applyTheme(choice) {
    var root = document.documentElement;
    root.setAttribute("data-theme", themeAttr(choice));
    localStorage.setItem(THEME_KEY, choice);

    if (!themeSwitch) return;
    themeSwitch.querySelectorAll("[data-theme-choice]").forEach(function (btn) {
      var active = btn.getAttribute("data-theme-choice") === choice;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark") saved = "default";
    var choice =
      saved === "light" || saved === "default" || saved === "auto"
        ? saved
        : "default";
    applyTheme(choice);
  }

  if (themeSwitch) {
    themeSwitch.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-theme-choice]");
      if (!btn) return;
      applyTheme(btn.getAttribute("data-theme-choice"));
    });
  }

  initTheme();

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    if (backdrop) backdrop.hidden = true;
    navToggle.focus();
  }

  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    if (backdrop) backdrop.hidden = false;
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.querySelectorAll("a, button").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 1279px)").matches) {
          closeNav();
        }
      });
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeNav);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav && nav.classList.contains("is-open")) {
      closeNav();
    }
  });

  if (brand) {
    brand.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();

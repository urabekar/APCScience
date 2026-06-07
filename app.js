/* APC Science — nav toggle, demo contact form, footer year. No framework. */
(function () {
  "use strict";

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form -> composes a real email via the visitor's mail client (mailto).
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (form.querySelector('[name="_gotcha"]') && form.querySelector('[name="_gotcha"]').value) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      function val(n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ""; }
      var name = val("name");
      var body = [
        "Name: " + name,
        "Email: " + val("email"),
        "Company / institution: " + val("company"),
        "Role: " + val("role"),
        "Program stage: " + val("stage"),
        "Modality: " + val("modality"),
        "Topic: " + val("topic"),
        "",
        val("message")
      ].join("\n");
      var subject = "APC Science inquiry" + (name ? " — " + name : "");
      window.location.href = "mailto:amrit@apc.science?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var ok = form.querySelector(".form-ok");
      if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

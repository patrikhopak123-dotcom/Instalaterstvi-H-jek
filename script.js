(() => {
  "use strict";

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Zavřít navigaci" : "Otevřít navigaci");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Otevřít navigaci");
      });
    });
  }

  // Kliknutí na konkrétní službu předvyplní pole ve formuláři.
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const select = document.getElementById("service");
      if (select) select.value = link.dataset.service || "";
    });
  });

  // Statický GitHub Pages web: formulář připraví e-mail přes mailto.
  // Pro skutečné serverové ukládání / doručování je nutná formulářová služba nebo backend.
  const form = document.getElementById("lead-form");
  const status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const email = String(data.get("email") || "").trim();
      const service = String(data.get("service") || "").trim();
      const location = String(data.get("location") || "").trim();
      const message = String(data.get("message") || "").trim();

      // PO OVĚŘENÍ FIRMOU nahraďte e-mail níže její potvrzenou adresou.
      const recipient = "";
      const subject = `Poptávka webem – ${service}`;
      const body = [
        "Dobrý den,",
        "",
        "posílám poptávku z webu.",
        `Jméno: ${name}`,
        `Telefon: ${phone}`,
        `E-mail: ${email || "neuveden"}`,
        `Služba: ${service}`,
        `Místo realizace: ${location || "neuvedeno"}`,
        "",
        "Popis požadavku:",
        message,
        "",
        "Odesláno z webového formuláře."
      ].join("\n");

      if (!recipient) {
        if (status) {
          status.textContent = "Formulář je vyplněný, ale před použitím je potřeba doplnit potvrzený e-mail firmy do script.js (const recipient). Zpráva nebyla odeslána.";
          status.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        return;
      }

      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (status) status.textContent = "Otevírá se váš e-mailový program. Zprávu ještě zkontrolujte a odešlete.";
    });
  }
})();
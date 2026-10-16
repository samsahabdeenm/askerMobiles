const WHATSAPP_NUMBER = "918675002200";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("click", (event) => {
      if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      }
    });
  }

  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const property = String(data.get("property") || "").trim();
      const location = String(data.get("location") || "").trim();
      const message = String(data.get("message") || "").trim();

      const lines = [
        "Vanakkam Asker Land Promoters,",
        "",
        "I would like to enquire about a property.",
        "Name: " + name,
        "Phone: " + phone,
        "Interested in: " + property,
        "Preferred location: " + (location || "Not specified"),
        "Additional details: " + (message || "Not specified")
      ];
      const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
});
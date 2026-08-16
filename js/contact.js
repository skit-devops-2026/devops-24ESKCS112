/* ============================================================
   TravelX - contact.js
   Contact form submit + success state on contact.html.
   Depends on common.js (must be loaded first for shared data,
   render helpers, and localStorage-based selected-package state).
   ============================================================ */

/* ---------- 8. Contact form ---------- */

function initContactForm() {
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("contactEmail").value.trim();
    document.getElementById("contactSuccessMsg").textContent =
      `Our support team will reply to ${email} within 24 hours.`;
    document.getElementById("contactForm").classList.add("hidden");
    document.getElementById("contactSuccess").classList.add("active");
  });

  document.getElementById("contactAnother").addEventListener("click", () => {
    document.getElementById("contactForm").reset();
    document.getElementById("contactForm").classList.remove("hidden");
    document.getElementById("contactSuccess").classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
});


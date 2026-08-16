/* ============================================================
   TravelX - home.js
   Renders featured destinations, popular packages, and testimonials on index.html.
   Depends on common.js (must be loaded first for shared data,
   render helpers, and localStorage-based selected-package state).
   ============================================================ */

/* ---------- 4. Home page render ---------- */

function renderHome() {
  document.getElementById("featuredDestinations").innerHTML =
    destinations.slice(0, 3).map(destinationCard).join("");
  document.getElementById("popularPackages").innerHTML =
    packages.map(packageCard).join("");
  document.getElementById("testimonials").innerHTML =
    testimonials.map(testimonialCard).join("");
}

/* ---------- 14. Hero search form (Home page) ---------- */

function initHeroSearch() {
  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const destinationQuery = document.getElementById("searchDestination").value.trim();
    /* Pass the search text to explore.html via a URL query param since
       each page now loads fresh (no shared in-memory state anymore) */
    window.location.href = "explore.html?q=" + encodeURIComponent(destinationQuery);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  initHeroSearch();
});


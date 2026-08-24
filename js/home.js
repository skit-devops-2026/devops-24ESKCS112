/* ============================================================
   TravelX - home.js
   Renders featured destinations, popular packages, and testimonials
   on index.html. Waits for destinations.json to load (via
   common.js's getDestinations()) before rendering anything that
   depends on it.
   ============================================================ */

function renderHome(destinationsList) {
  const featuredContainer = document.getElementById("featuredDestinations");
  const packagesContainer = document.getElementById("popularPackages");

  /* Feature the 3 highest-rated destinations rather than a fixed
     array position, so this keeps working no matter how the JSON
     is ordered or how many entries it has. */
  const featured = destinationsList.slice().sort((a, b) => b.rating - a.rating).slice(0, 3);
  featuredContainer.innerHTML = featured.map(destinationCard).join("");

  packagesContainer.innerHTML = packages.map((p) => packageCard(p, destinationsList)).join("");

  document.getElementById("testimonials").innerHTML = testimonials.map(testimonialCard).join("");
}

/* ---------- Hero search form (Home page) ---------- */

function initHeroSearch() {
  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const destinationQuery = document.getElementById("searchDestination").value.trim();
    /* Pass the search text to explore.html via a URL query param since
       each page loads fresh (no shared in-memory state across pages) */
    window.location.href = "explore.html?q=" + encodeURIComponent(destinationQuery);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroSearch();

  getDestinations()
    .then((destinationsList) => renderHome(destinationsList))
    .catch(() => {
      showLoadError(document.getElementById("featuredDestinations"));
      showLoadError(document.getElementById("popularPackages"));
    });
});

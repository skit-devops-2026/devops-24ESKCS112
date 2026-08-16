/* ============================================================
   TravelX - details.js
   Renders a single destination's hero, gallery, itinerary, and price sidebar on details.html (reads ?id=... from the URL, falls back to the last-viewed package).
   Depends on common.js (must be loaded first for shared data,
   render helpers, and localStorage-based selected-package state).
   ============================================================ */

/* Local page state (only needed on details.html) */
let activeGalleryImage = 0;

/* ---------- 6. Package details page ---------- */

function renderDetails(packageId) {
  const d = destinations.find((x) => x.id === packageId) || destinations[0];
  setSelectedPackageId(d.id);
  activeGalleryImage = 0;

  document.getElementById("detailsHeroImg").src = d.gallery[0];
  document.getElementById("detailsHeroImg").alt = d.name;
  document.getElementById("detailsCategory").textContent = d.category;
  document.getElementById("detailsTitle").textContent = d.name;
  document.getElementById("detailsLocation").textContent = d.name;
  document.getElementById("detailsDuration").textContent = d.duration;
  document.getElementById("detailsRating").textContent = `${d.rating} (${d.reviews})`;
  document.getElementById("detailsDescription").textContent = d.description;
  document.getElementById("detailsPrice").textContent = "$" + d.price;
  document.getElementById("detailsDurationSide").textContent = d.duration;
  document.getElementById("detailsCategorySide").textContent = d.category;
  document.getElementById("detailsRatingSide").textContent = d.rating;

  document.getElementById("galleryStrip").innerHTML = d.gallery
    .map((img, i) => `<div class="gallery-thumb ${i === 0 ? "active-thumb" : ""}" data-index="${i}"><img src="${img}" alt="" /></div>`)
    .join("");

  document.querySelectorAll(".gallery-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const idx = Number(thumb.dataset.index);
      document.getElementById("detailsHeroImg").src = d.gallery[idx];
      document.querySelectorAll(".gallery-thumb").forEach((t) => t.classList.remove("active-thumb"));
      thumb.classList.add("active-thumb");
    });
  });

  document.getElementById("itineraryList").innerHTML = d.itinerary
    .map((step) => `
      <div class="itinerary-step">
        <div class="itinerary-num">${step.day}</div>
        <div class="itinerary-body"><h4>${step.title}</h4><p>${step.detail}</p></div>
      </div>`)
    .join("");

  document.getElementById("detailsReviews").innerHTML = testimonials.slice(0, 2).map(testimonialCard).join("");

  document.getElementById("detailsBookBtn").onclick = () => {
    window.location.href = "booking.html";
  };
}

document.addEventListener("DOMContentLoaded", () => {
  renderDetails(getSelectedPackageId());
});


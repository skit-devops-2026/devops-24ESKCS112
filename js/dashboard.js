/* ============================================================
   TravelX - dashboard.js
   Tab switching, booking history, wishlist, and profile form on
   dashboard.html. The wishlist stores only destination IDs
   (see common.js), so this file resolves those IDs against the
   loaded destinations.json data before rendering the cards.
   ============================================================ */

function renderDashboardBookings() {
  const container = document.getElementById("dashBookings");
  if (bookingsHistory.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-calendar-days"></i>
        <h3>No bookings yet</h3>
        <p>Once you book a trip, it will show up here.</p>
      </div>`;
    return;
  }
  container.innerHTML = bookingsHistory.map((b) => `
    <div class="booking-history-item">
      <div>
        <h4>${b.destination}</h4>
        <p class="small">Booking ID: ${b.id} - ${b.date}</p>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;">
        <span class="booking-status ${b.status === "Completed" ? "status-completed" : "status-upcoming"}">${b.status}</span>
        <strong>₹${b.price.toLocaleString("en-IN")}</strong>
      </div>
    </div>`).join("");
}

function renderWishlist(destinationsList) {
  const container = document.getElementById("dashWishlist");
  const wishlistIds = getWishlistIds();
  const wishlistDestinations = wishlistIds
    .map((id) => destinationsList.find((d) => d.id === id))
    .filter(Boolean); // drop any stale IDs that no longer exist in destinations.json

  if (wishlistDestinations.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-heart"></i>
        <h3>Your wishlist is empty</h3>
        <p>Save destinations you love while exploring.</p>
      </div>`;
    return;
  }
  container.innerHTML = `<div class="grid grid-2">${wishlistDestinations.map((d) => `
    <div class="card wishlist-card">
      <img src="${d.image}" alt="${d.name}" />
      <div class="wishlist-card-body">
        <div><h5>${d.name}</h5><p><i class="fa-solid fa-location-dot"></i> ${d.category}</p></div>
        <button type="button" class="wishlist-remove" data-remove="${d.id}" aria-label="Remove from wishlist"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`).join("")}</div>`;

  container.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromWishlist(btn.dataset.remove);
      renderWishlist(destinationsList);
    });
  });
}

function initDashboard(destinationsList) {
  document.querySelectorAll(".dash-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".dash-tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".dash-panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("dash" + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1)).classList.add("active");
    });
  });

  document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Profile changes saved.");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDashboardBookings();
  initDashboard();

  getDestinations()
    .then((destinationsList) => {
      renderWishlist(destinationsList);
    })
    .catch(() => {
      showLoadError(document.getElementById("dashWishlist"));
    });
});

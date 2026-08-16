/* ============================================================
   TravelX - dashboard.js
   Tab switching, booking history, wishlist, and profile form on dashboard.html.
   Depends on common.js (must be loaded first for shared data).
   ============================================================ */

/* ---------- 10. Dashboard (bookings, wishlist, profile) ---------- */

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
        <strong>$${b.price}</strong>
      </div>
    </div>`).join("");
}

function renderWishlist() {
  const container = document.getElementById("dashWishlist");
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-heart"></i>
        <h3>Your wishlist is empty</h3>
        <p>Save destinations you love while exploring.</p>
      </div>`;
    return;
  }
  container.innerHTML = `<div class="grid grid-2">${wishlist.map((d) => `
    <div class="card wishlist-card">
      <img src="${d.image}" alt="${d.name}" />
      <div class="wishlist-card-body">
        <div><h5>${d.name}</h5><p><i class="fa-solid fa-location-dot"></i> ${d.category}</p></div>
        <button type="button" class="wishlist-remove" data-remove="${d.id}" aria-label="Remove from wishlist"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`).join("")}</div>`;

  container.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      wishlist = wishlist.filter((d) => d.id !== btn.dataset.remove);
      renderWishlist();
    });
  });
}

function initDashboard() {
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

  renderDashboardBookings();
  renderWishlist();
}

document.addEventListener("DOMContentLoaded", () => {
  renderDashboardBookings();
  renderWishlist();
  initDashboard();
});


/* ============================================================
   TravelX - explore.js
   Filtering, sorting, and pagination for explore.html.
   Depends on common.js (must be loaded first for shared data,
   render helpers, and localStorage-based selected-package state).
   ============================================================ */

/* ---------- 5. Explore page (filter, sort, paginate) ---------- */

/* Local page state (only needed on explore.html) */
const state = {
  exploreQuery: new URLSearchParams(window.location.search).get("q") || "",
  exploreCategories: [],
  exploreMaxPrice: 1500,
  exploreMinRating: 0,
  exploreSort: "recommended",
  explorePage: 1,
  pageSize: 6
};

function getFilteredDestinations() {
  let list = destinations.filter((d) => {
    const matchesQuery = state.exploreQuery
      ? d.name.toLowerCase().includes(state.exploreQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(state.exploreQuery.toLowerCase())
      : true;
    const matchesCategory =
      state.exploreCategories.length === 0 || state.exploreCategories.includes(d.category);
    const matchesPrice = d.price <= state.exploreMaxPrice;
    const matchesRating = d.rating >= state.exploreMinRating;
    return matchesQuery && matchesCategory && matchesPrice && matchesRating;
  });

  if (state.exploreSort === "price-asc") list = list.slice().sort((a, b) => a.price - b.price);
  if (state.exploreSort === "price-desc") list = list.slice().sort((a, b) => b.price - a.price);
  if (state.exploreSort === "rating") list = list.slice().sort((a, b) => b.rating - a.rating);

  return list;
}

function renderExplore() {
  const filtered = getFilteredDestinations();
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
  if (state.explorePage > totalPages) state.explorePage = totalPages;

  const start = (state.explorePage - 1) * state.pageSize;
  const pageItems = filtered.slice(start, start + state.pageSize);

  document.getElementById("resultsCount").textContent = filtered.length;

  const grid = document.getElementById("exploreGrid");
  const emptyState = document.getElementById("exploreEmpty");

  if (pageItems.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    grid.innerHTML = pageItems.map(destinationCard).join("");
  }

  /* Pagination controls */
  const pagination = document.getElementById("pagination");
  let html = `<button type="button" class="page-btn" id="prevPage" ${state.explorePage === 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i></button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button type="button" class="page-btn ${i === state.explorePage ? "active-page" : ""}" data-page="${i}">${i}</button>`;
  }
  html += `<button type="button" class="page-btn" id="nextPage" ${state.explorePage === totalPages ? "disabled" : ""}><i class="fa-solid fa-chevron-right"></i></button>`;
  pagination.innerHTML = html;

  pagination.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => { state.explorePage = Number(btn.dataset.page); renderExplore(); });
  });
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  if (prevBtn) prevBtn.addEventListener("click", () => { state.explorePage = Math.max(1, state.explorePage - 1); renderExplore(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { state.explorePage = Math.min(totalPages, state.explorePage + 1); renderExplore(); });
}

function initExploreControls() {
  document.getElementById("exploreSearch").addEventListener("input", (e) => {
    state.exploreQuery = e.target.value;
    state.explorePage = 1;
    renderExplore();
  });

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    state.exploreSort = e.target.value;
    renderExplore();
  });

  document.querySelectorAll("#categoryFilters input[type=checkbox]").forEach((box) => {
    box.addEventListener("change", () => {
      state.exploreCategories = Array.from(
        document.querySelectorAll("#categoryFilters input:checked")
      ).map((el) => el.value);
      state.explorePage = 1;
      renderExplore();
    });
  });

  const priceRange = document.getElementById("priceRange");
  priceRange.addEventListener("input", (e) => {
    state.exploreMaxPrice = Number(e.target.value);
    document.getElementById("maxPriceLabel").textContent = "$" + state.exploreMaxPrice;
    state.explorePage = 1;
    renderExplore();
  });

  document.querySelectorAll("#ratingFilters .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#ratingFilters .chip").forEach((c) => c.classList.remove("active-chip"));
      chip.classList.add("active-chip");
      state.exploreMinRating = Number(chip.dataset.rating);
      state.explorePage = 1;
      renderExplore();
    });
  });
  document.querySelector('#ratingFilters .chip[data-rating="0"]').classList.add("active-chip");

  function resetFilters() {
    state.exploreCategories = [];
    state.exploreMaxPrice = 1500;
    state.exploreMinRating = 0;
    state.exploreQuery = "";
    state.explorePage = 1;
    document.querySelectorAll("#categoryFilters input").forEach((c) => (c.checked = false));
    document.getElementById("priceRange").value = 1500;
    document.getElementById("maxPriceLabel").textContent = "$1500";
    document.getElementById("exploreSearch").value = "";
    document.querySelectorAll("#ratingFilters .chip").forEach((c) => c.classList.remove("active-chip"));
    document.querySelector('#ratingFilters .chip[data-rating="0"]').classList.add("active-chip");
    renderExplore();
  }
  document.getElementById("resetFilters").addEventListener("click", resetFilters);
  document.getElementById("emptyReset").addEventListener("click", resetFilters);
}

document.addEventListener("DOMContentLoaded", () => {
  /* Prefill the search box if we arrived from the home page's hero search (explore.html?q=...) */
  if (state.exploreQuery) {
    document.getElementById("exploreSearch").value = state.exploreQuery;
  }
  initExploreControls();
  renderExplore();
});


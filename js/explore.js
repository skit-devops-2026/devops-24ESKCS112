/* ============================================================
   TravelX - explore.js
   Search (with suggestions), category/price/rating filters,
   sorting, and pagination for explore.html. All filtering runs
   against the destinations array loaded once from
   data/destinations.json via common.js's getDestinations().
   ============================================================ */

/* Local page state (only needed on explore.html) */
const state = {
  allDestinations: [],
  exploreQuery: new URLSearchParams(window.location.search).get("q") || "",
  exploreCategories: [],
  explorePriceBucket: "any",
  exploreMinRating: 0,
  exploreSort: "recommended",
  explorePage: 1,
  pageSize: 6,
};

/* ---------- Search matching (name, category, description, region - case-insensitive) ---------- */

function matchesSearch(d, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    d.name.toLowerCase().includes(q) ||
    d.category.toLowerCase().includes(q) ||
    d.description.toLowerCase().includes(q) ||
    (d.region && d.region.toLowerCase().includes(q))
  );
}

/* ---------- Price bucket matching ---------- */

function matchesPriceBucket(price, bucket) {
  switch (bucket) {
    case "under10":
      return price < 10000;
    case "10-15":
      return price >= 10000 && price <= 15000;
    case "15-20":
      return price > 15000 && price <= 20000;
    case "above20":
      return price > 20000;
    default:
      return true; // "any"
  }
}

function getFilteredDestinations() {
  let list = state.allDestinations.filter((d) => {
    const matchesQuery = matchesSearch(d, state.exploreQuery);
    const matchesCategory =
      state.exploreCategories.length === 0 || state.exploreCategories.includes(d.category);
    const matchesPrice = matchesPriceBucket(d.price, state.explorePriceBucket);
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

/* ---------- Search suggestions dropdown ---------- */

function renderSuggestions(query) {
  const box = document.getElementById("searchSuggestions");
  if (!query) {
    box.innerHTML = "";
    box.classList.add("hidden");
    return;
  }

  const q = query.toLowerCase();
  const matches = state.allDestinations
    .filter((d) => d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q))
    .slice(0, 6);

  if (matches.length === 0) {
    box.innerHTML = "";
    box.classList.add("hidden");
    return;
  }

  box.innerHTML = matches
    .map((d) => `<button type="button" class="suggestion-item" data-suggest="${d.name.replace(/"/g, "&quot;")}">${d.name}</button>`)
    .join("");
  box.classList.remove("hidden");

  box.querySelectorAll("[data-suggest]").forEach((item) => {
    item.addEventListener("click", () => {
      const searchInput = document.getElementById("exploreSearch");
      searchInput.value = item.dataset.suggest;
      state.exploreQuery = item.dataset.suggest;
      state.explorePage = 1;
      box.innerHTML = "";
      box.classList.add("hidden");
      renderExplore();
    });
  });
}

function initExploreControls() {
  const searchInput = document.getElementById("exploreSearch");

  searchInput.addEventListener("input", (e) => {
    state.exploreQuery = e.target.value;
    state.explorePage = 1;
    renderSuggestions(e.target.value.trim());
    renderExplore();
  });

  /* Hide suggestions when clicking anywhere outside the search box */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-with-suggestions")) {
      document.getElementById("searchSuggestions").classList.add("hidden");
    }
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

  document.querySelectorAll('input[name="priceBucket"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      state.explorePriceBucket = radio.value;
      state.explorePage = 1;
      renderExplore();
    });
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
    state.explorePriceBucket = "any";
    state.exploreMinRating = 0;
    state.exploreQuery = "";
    state.explorePage = 1;
    document.querySelectorAll("#categoryFilters input").forEach((c) => (c.checked = false));
    document.querySelector('input[name="priceBucket"][value="any"]').checked = true;
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

  getDestinations()
    .then((destinationsList) => {
      state.allDestinations = destinationsList;
      renderExplore();
    })
    .catch(() => {
      showLoadError(document.getElementById("exploreGrid"));
    });
});

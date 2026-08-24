/* ============================================================
   TravelX - common.js
   Shared code used by EVERY page: destination data loading (from
   data/destinations.json), reusable render helpers, wishlist,
   dark mode, mobile nav, cross-page navigation state, and
   active-link highlighting. Load this file BEFORE each page's
   own <page>.js file.
   ============================================================ */

/* ---------- 1. Destination data loading ----------
   destinations.json (in /data) is now the single source of truth
   for all destination data - nothing is hardcoded here anymore.
   Every page that needs destinations calls getDestinations(),
   which fetches the JSON once and caches it for the rest of that
   page's lifetime (no repeat network requests per card/render).

   IMPORTANT: fetch() cannot read local files opened directly as
   file:// in most browsers (blocked for security reasons). Run
   this project through a local server instead, for example:
     - VS Code "Live Server" extension, or
     - `python -m http.server` from the project's root folder
   then open the printed http://localhost... address. */

const DESTINATIONS_JSON_PATH = "../data/destinations.json";

let destinationsCache = null;
let destinationsPromise = null;

function loadDestinationsJSON() {
  if (destinationsPromise) return destinationsPromise;

  destinationsPromise = fetch(DESTINATIONS_JSON_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load destinations.json (status ${response.status})`);
      }
      return response.json();
    })
    .then((data) => {
      destinationsCache = data;
      return data;
    })
    .catch((error) => {
      console.error("TravelX: could not load destination data.", error);
      throw error;
    });

  return destinationsPromise;
}

/* Call this from any page before rendering anything that needs
   destination data. Resolves to the full array; safe to call many
   times (only fetches once per page load). */
function getDestinations() {
  if (destinationsCache) return Promise.resolve(destinationsCache);
  return loadDestinationsJSON();
}

/* Shows a friendly inline message inside a container when the JSON
   fails to load, instead of leaving the page blank with a silent
   console error. */
function showLoadError(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="empty-state">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <h3>Unable to load destinations</h3>
      <p>Please refresh the page. If this keeps happening, make sure the site is running
         through a local server (see README) rather than opened directly as a file.</p>
    </div>`;
}

/* ---------- 2. Packages (reference destinations by ID, not array index) ----------
   Package data still lives here since it's small, but each package
   now points at a destinationId instead of copying an image or
   relying on destinations[0]/[1]/[2] - so nothing breaks if the
   destination list is reordered or filtered. */

const packages = [
  {
    id: "goa-beach-escape",
    name: "Goa Beach Escape",
    destinationId: "goa-north",
    price: 12999,
    includes: ["4-star beach resort", "Airport transfers", "North Goa sightseeing"],
  },
  {
    id: "udaipur-royal-romance",
    name: "Udaipur Royal Romance",
    destinationId: "udaipur",
    price: 17999,
    includes: ["Lake-view heritage hotel", "Private boat ride", "Candlelight dinner"],
  },
  {
    id: "manali-himalayan-adventure",
    name: "Manali Himalayan Adventure",
    destinationId: "manali",
    price: 14999,
    includes: ["Mountain resort stay", "Guided Solang Valley trip", "Bonfire evening"],
  },
];

/* Resolves a package's destinationId to the full destination object.
   Needs the loaded destinations array, since packages only carry
   IDs until the JSON has loaded. */
function getPackageDestination(pkg, destinationsList) {
  return destinationsList.find((d) => d.id === pkg.destinationId) || destinationsList[0];
}

const testimonials = [
  { name: "Aditi Sharma", location: "Jaipur, Rajasthan", avatar: "https://i.pravatar.cc/60?img=47", text: "TravelX made our Goa trip completely stress-free from start to finish." },
  { name: "Rohan Mehta", location: "Delhi", avatar: "https://i.pravatar.cc/60?img=12", text: "The Udaipur package exceeded every expectation we had." },
  { name: "Priya Nair", location: "Kochi, Kerala", avatar: "https://i.pravatar.cc/60?img=32", text: "Booking was seamless and support responded within minutes." },
];

const team = [
  { name: "Rhea Kapoor", role: "Founder and CEO", avatar: "https://i.pravatar.cc/100?img=5" },
  { name: "Aman Verma", role: "Head of Operations", avatar: "https://i.pravatar.cc/100?img=8" },
  { name: "Sara Malik", role: "Lead Travel Curator", avatar: "https://i.pravatar.cc/100?img=9" },
  { name: "Devon Lee", role: "Customer Success", avatar: "https://i.pravatar.cc/100?img=15" },
];

const bookingsHistory = [
  { id: "TX10234", destination: "North Goa, Goa", date: "12 Mar 2026", status: "Completed", price: 12999 },
  { id: "TX10598", destination: "Udaipur, Rajasthan", date: "02 Sep 2026", status: "Upcoming", price: 17999 },
];

/* ---------- 3. Wishlist (stores destination IDs only, not full objects) ----------
   Storing only IDs in localStorage keeps things small and avoids
   the wishlist going stale if a destination's price/rating/etc.
   changes later in destinations.json. */

const WISHLIST_KEY = "travelx_wishlist";
const WISHLIST_SEEDED_KEY = "travelx_wishlist_seeded";

function getWishlistIds() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("TravelX: could not read wishlist from localStorage.", error);
    return [];
  }
}

function setWishlistIds(ids) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
}

function isInWishlist(id) {
  return getWishlistIds().includes(id);
}

function addToWishlist(id) {
  const ids = getWishlistIds();
  if (!ids.includes(id)) {
    ids.push(id);
    setWishlistIds(ids);
  }
}

function removeFromWishlist(id) {
  setWishlistIds(getWishlistIds().filter((x) => x !== id));
}

/* First-ever visit: seed two example destinations so the wishlist
   isn't empty on a brand new browser (matches the old demo
   behaviour), without overwriting anything the user has already
   changed on later visits. */
function seedWishlistOnce() {
  if (localStorage.getItem(WISHLIST_SEEDED_KEY)) return;
  setWishlistIds(["goa-north", "munnar"]);
  localStorage.setItem(WISHLIST_SEEDED_KEY, "true");
}

/* ---------- 4. Shared render helpers ----------
   Used by home.js, explore.js, details.js, and about.js to turn
   a data object into an HTML string. */

function starRow(rating) {
  return `<span class="dest-rating"><i class="fa-solid fa-star star-filled"></i> ${rating.toFixed(1)}</span>`;
}

function destinationCard(d) {
  const inWishlist = isInWishlist(d.id);
  return `
    <div class="card dest-card">
      <div class="dest-card-img">
        <img src="${d.image}" alt="${d.name}" />
        <span class="dest-tag">${d.category}</span>
        <button type="button" class="wishlist-toggle ${inWishlist ? "active" : ""}" data-wishlist-toggle="${d.id}" aria-label="${inWishlist ? "Remove from wishlist" : "Add to wishlist"}">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
      <div class="dest-card-body">
        <div class="dest-card-top">
          <h3>${d.name}</h3>
          ${starRow(d.rating)}
        </div>
        <p class="dest-meta"><i class="fa-solid fa-clock"></i> ${d.duration}</p>
        <div class="dest-card-footer">
          <p class="dest-price">₹${d.price.toLocaleString("en-IN")}<span>/person</span></p>
          <a href="details.html?id=${d.id}" class="dest-link-btn" data-package="${d.id}">View details</a>
        </div>
      </div>
    </div>`;
}

function packageCard(p, destinationsList) {
  const dest = getPackageDestination(p, destinationsList);
  return `
    <div class="card pkg-card">
      <div class="dest-card-img" style="height:140px;border-radius:16px;overflow:hidden;margin:-1.25rem -1.25rem 1rem;">
        <img src="${dest.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div class="pkg-card-top"><h3>${p.name}</h3></div>
      <ul class="pkg-included">
        ${p.includes.map((item) => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`).join("")}
      </ul>
      <div class="dashed-divider"></div>
      <div class="pkg-card-footer">
        <p class="dest-price">₹${p.price.toLocaleString("en-IN")}<span>/person</span></p>
        <button type="button" class="btn btn-accent btn-sm" data-book="${p.id}">Book Now</button>
      </div>
    </div>`;
}

function testimonialCard(t) {
  return `
    <div class="card testimonial-card">
      <i class="fa-solid fa-quote-right testimonial-quote-icon"></i>
      <div class="testimonial-head">
        <img src="${t.avatar}" alt="${t.name}" />
        <div><h4>${t.name}</h4><p>${t.location}</p></div>
      </div>
      <p class="testimonial-body">${t.text}</p>
    </div>`;
}

function teamCard(m) {
  return `
    <div class="card team-card">
      <img src="${m.avatar}" alt="${m.name}" />
      <h4>${m.name}</h4>
      <p>${m.role}</p>
    </div>`;
}

/* ---------- 5. Selected-package state (persisted across page loads) ----------
   Since each page is a real, separate HTML file, in-memory state
   resets on every navigation. localStorage carries the selection
   from "View details" -> details.html and "Book Now" -> booking.html. */

const SELECTED_PACKAGE_KEY = "travelx_selected_package";

function setSelectedPackageId(id) {
  localStorage.setItem(SELECTED_PACKAGE_KEY, id);
}

/* destinationsList is the already-loaded array, used only as a
   last-resort fallback if nothing is stored yet. */
function getSelectedPackageId(destinationsList) {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("id");
  if (fromQuery) {
    setSelectedPackageId(fromQuery);
    return fromQuery;
  }
  const stored = localStorage.getItem(SELECTED_PACKAGE_KEY);
  if (stored) return stored;
  return destinationsList && destinationsList.length ? destinationsList[0].id : null;
}

/* ---------- 6. Card click delegation (package links, book buttons, wishlist hearts) ----------
   Destination/package cards are injected as HTML strings, so one
   delegated listener on document handles clicks for all of them
   instead of attaching a listener to every single card. */

function initGlobalDelegation() {
  document.addEventListener("click", (e) => {
    const packageLink = e.target.closest("[data-package]");
    if (packageLink) {
      setSelectedPackageId(packageLink.dataset.package);
    }

    const bookBtn = e.target.closest("[data-book]");
    if (bookBtn) {
      const pkg = packages.find((p) => p.id === bookBtn.dataset.book);
      if (pkg) {
        setSelectedPackageId(pkg.destinationId);
      }
      window.location.href = "booking.html";
    }

    const wishlistBtn = e.target.closest("[data-wishlist-toggle]");
    if (wishlistBtn) {
      const id = wishlistBtn.dataset.wishlistToggle;
      if (isInWishlist(id)) {
        removeFromWishlist(id);
        wishlistBtn.classList.remove("active");
        wishlistBtn.setAttribute("aria-label", "Add to wishlist");
      } else {
        addToWishlist(id);
        wishlistBtn.classList.add("active");
        wishlistBtn.setAttribute("aria-label", "Remove from wishlist");
      }
    }
  });
}

/* ---------- 7. Dark mode (shared across all pages via localStorage) ---------- */

function initTheme() {
  const saved = localStorage.getItem("travelx-theme");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("themeIcon").classList.replace("fa-moon", "fa-sun");
  }

  document.getElementById("themeToggle").addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("travelx-theme", "light");
      document.getElementById("themeIcon").classList.replace("fa-sun", "fa-moon");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("travelx-theme", "dark");
      document.getElementById("themeIcon").classList.replace("fa-moon", "fa-sun");
    }
  });
}

/* ---------- 8. Mobile nav toggle ---------- */

function initMobileNav() {
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("mobile-open");
  });
}

/* ---------- 9. Highlight the current page's nav link ---------- */

function initNavHighlight() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href");
    link.classList.toggle("active-link", linkPage === current);
  });
}

/* ---------- 10. Shared form helpers ---------- */

function isValidEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value);
}

/* Wires up a show/hide toggle button next to a password field.
   Used by both login.js and signup.js (Signup has more than one
   password input: password + confirm password). */
function initPasswordToggle(toggleButton, inputEl) {
  toggleButton.addEventListener("click", () => {
    const isHidden = inputEl.type === "password";
    inputEl.type = isHidden ? "text" : "password";
    toggleButton.querySelector("i").className = isHidden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    toggleButton.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
  });
}

/* ---------- 11. Bootstrap the parts every page needs ---------- */

document.addEventListener("DOMContentLoaded", () => {
  seedWishlistOnce();
  initTheme();
  initMobileNav();
  initNavHighlight();
  initGlobalDelegation();
});

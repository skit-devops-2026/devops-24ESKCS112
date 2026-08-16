/* ============================================================
   TravelX - Vanilla JavaScript
   Converted from React state/props/hooks into plain DOM
   manipulation + event listeners. Replace the mock DATA arrays
   below with real fetch() calls to your Express/MongoDB API
   when you connect the backend.
   ============================================================ */

/* ---------- 1. Mock data (stand-in for API responses) ---------- */

const destinations = [
  {
    id: "bali",
    name: "Bali, Indonesia",
    category: "Beach",
    price: 599,
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviews: 2140,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1518544866330-4b3f3d9b3a8f?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Discover the island of the gods - emerald rice terraces, ancient temples, and sun-soaked beaches blending relaxation with culture.",
    itinerary: [
      { day: 1, title: "Arrival and beach welcome", detail: "Airport pickup, resort check-in, sunset dinner." },
      { day: 2, title: "Ubud culture tour", detail: "Rice terraces, monkey forest, art villages." },
      { day: 3, title: "Water temple and waterfalls", detail: "Tirta Empul, Tegenungan waterfall visit." }
    ]
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    category: "Mountain",
    price: 1299,
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 1560,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Snow-capped peaks, alpine trains, and cozy mountain villages - a scenic escape through Switzerland's most breathtaking routes.",
    itinerary: [
      { day: 1, title: "Arrival in Zurich", detail: "Transfer to Interlaken, evening lake walk." },
      { day: 2, title: "Jungfraujoch excursion", detail: "Train to the Top of Europe, glacier views." },
      { day: 3, title: "Lucerne day trip", detail: "Chapel Bridge, boat cruise, old town." }
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo, Japan",
    category: "City",
    price: 1099,
    duration: "7 Days / 6 Nights",
    rating: 4.7,
    reviews: 1890,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Neon-lit streets, ancient shrines, and world-class food - Tokyo blends tradition and the future like nowhere else.",
    itinerary: [
      { day: 1, title: "Shibuya and Shinjuku", detail: "Crossing, city lights, izakaya dinner." },
      { day: 2, title: "Asakusa and Senso-ji", detail: "Temple visit, traditional market streets." },
      { day: 3, title: "Day trip to Hakone", detail: "Mt. Fuji views, hot springs, ropeway." }
    ]
  },
  {
    id: "santorini",
    name: "Santorini, Greece",
    category: "Beach",
    price: 899,
    duration: "5 Days / 4 Nights",
    rating: 4.9,
    reviews: 2450,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1601581875039-e899893d520c?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Whitewashed villages perched on volcanic cliffs, legendary sunsets, and crystal-clear Aegean waters.",
    itinerary: [
      { day: 1, title: "Arrival in Fira", detail: "Caldera views, welcome dinner." },
      { day: 2, title: "Oia sunset tour", detail: "Blue-domed churches, iconic sunset point." },
      { day: 3, title: "Catamaran cruise", detail: "Red Beach, hot springs, BBQ on board." }
    ]
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu, Peru",
    category: "Adventure",
    price: 1450,
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviews: 980,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Trek through the Andes to the lost city of the Incas - a bucket-list adventure through cloud forests and ancient ruins.",
    itinerary: [
      { day: 1, title: "Arrival in Cusco", detail: "Acclimatization day, San Pedro market." },
      { day: 2, title: "Sacred Valley", detail: "Pisac ruins, Ollantaytambo fortress." },
      { day: 3, title: "Machu Picchu sunrise", detail: "Early train, guided ruins tour." }
    ]
  },
  {
    id: "dubai",
    name: "Dubai, UAE",
    category: "City",
    price: 999,
    duration: "5 Days / 4 Nights",
    rating: 4.6,
    reviews: 1670,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Futuristic skylines, desert safaris, and luxury shopping - Dubai delivers larger-than-life experiences at every turn.",
    itinerary: [
      { day: 1, title: "Burj Khalifa and Downtown", detail: "Observation deck, fountain show." },
      { day: 2, title: "Desert safari", detail: "Dune bashing, camel ride, BBQ dinner." },
      { day: 3, title: "Palm Jumeirah and Marina", detail: "Beach day, yacht cruise at sunset." }
    ]
  },
  {
    id: "queenstown",
    name: "Queenstown, New Zealand",
    category: "Adventure",
    price: 1350,
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 870,
    image: "https://images.unsplash.com/photo-1589802757116-24c8a1a5a1b6?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1589802757116-24c8a1a5a1b6?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "New Zealand's adventure capital - bungee jumping, jet boating, and jaw-dropping fiord and mountain scenery.",
    itinerary: [
      { day: 1, title: "Arrival and lake cruise", detail: "TSS Earnslaw steamship, welcome dinner." },
      { day: 2, title: "Milford Sound day trip", detail: "Fiord cruise, waterfalls, wildlife." },
      { day: 3, title: "Adventure day", detail: "Bungee jump, jet boat, gondola ride." }
    ]
  },
  {
    id: "kyoto",
    name: "Kyoto, Japan",
    category: "City",
    price: 950,
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviews: 1340,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Japan's ancient capital - thousands of temples, geisha districts, and serene bamboo groves.",
    itinerary: [
      { day: 1, title: "Fushimi Inari shrine", detail: "Thousand torii gates hike." },
      { day: 2, title: "Arashiyama bamboo grove", detail: "Tenryu-ji temple, monkey park." },
      { day: 3, title: "Gion district evening", detail: "Geisha spotting, traditional dinner." }
    ]
  }
];

const testimonials = [
  { name: "Aditi Sharma", location: "Jaipur, India", avatar: "https://i.pravatar.cc/60?img=47", text: "TravelX made our Bali trip completely stress-free from start to finish." },
  { name: "James Carter", location: "London, UK", avatar: "https://i.pravatar.cc/60?img=12", text: "The Swiss Alps package exceeded every expectation we had." },
  { name: "Mei Lin", location: "Singapore", avatar: "https://i.pravatar.cc/60?img=32", text: "Booking was seamless and support responded within minutes." }
];

const packages = [
  { id: "honeymoon-bali", name: "Bali Honeymoon Special", price: 1199, image: destinations[0].image, includes: ["5-star resort stay", "Private candlelight dinner", "Airport transfers included"] },
  { id: "alps-adventure", name: "Swiss Alps Adventure", price: 1799, image: destinations[1].image, includes: ["Guided glacier trek", "All meals included", "Scenic train passes"] },
  { id: "tokyo-explorer", name: "Tokyo City Explorer", price: 1399, image: destinations[2].image, includes: ["4-star hotel in Shibuya", "JR rail pass", "Guided city tour"] }
];

const team = [
  { name: "Rhea Kapoor", role: "Founder and CEO", avatar: "https://i.pravatar.cc/100?img=5" },
  { name: "Aman Verma", role: "Head of Operations", avatar: "https://i.pravatar.cc/100?img=8" },
  { name: "Sara Malik", role: "Lead Travel Curator", avatar: "https://i.pravatar.cc/100?img=9" },
  { name: "Devon Lee", role: "Customer Success", avatar: "https://i.pravatar.cc/100?img=15" }
];

const bookingsHistory = [
  { id: "TX10234", destination: "Bali, Indonesia", date: "12 Mar 2026", status: "Completed", price: 599 },
  { id: "TX10598", destination: "Santorini, Greece", date: "02 Sep 2026", status: "Upcoming", price: 899 }
];

/* Wishlist is mutable state, stored in-memory (swap for localStorage or an API list) */
let wishlist = [destinations[3], destinations[4]];

/* ---------- 2. State (replaces React useState) ---------- */

const state = {
  currentPackageId: destinations[0].id,
  activeGalleryImage: 0,
  bookingTravelers: 2,
  exploreQuery: "",
  exploreCategories: [],
  exploreMaxPrice: 1500,
  exploreMinRating: 0,
  exploreSort: "recommended",
  explorePage: 1,
  pageSize: 6
};

/* ---------- 3. Small render helpers ---------- */

function starRow(rating) {
  return `<span class="dest-rating"><i class="fa-solid fa-star star-filled"></i> ${rating.toFixed(1)}</span>`;
}

function destinationCard(d) {
  return `
    <div class="card dest-card">
      <div class="dest-card-img">
        <img src="${d.image}" alt="${d.name}" />
        <span class="dest-tag">${d.category}</span>
      </div>
      <div class="dest-card-body">
        <div class="dest-card-top">
          <h3>${d.name}</h3>
          ${starRow(d.rating)}
        </div>
        <p class="dest-meta"><i class="fa-solid fa-clock"></i> ${d.duration}</p>
        <div class="dest-card-footer">
          <p class="dest-price">$${d.price}<span>/person</span></p>
          <a href="#details" class="dest-link-btn" data-link data-package="${d.id}">View details</a>
        </div>
      </div>
    </div>`;
}

function packageCard(p) {
  return `
    <div class="card pkg-card">
      <div class="dest-card-img" style="height:140px;border-radius:16px;overflow:hidden;margin:-1.25rem -1.25rem 1rem;">
        <img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div class="pkg-card-top"><h3>${p.name}</h3></div>
      <ul class="pkg-included">
        ${p.includes.map((item) => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`).join("")}
      </ul>
      <div class="dashed-divider"></div>
      <div class="pkg-card-footer">
        <p class="dest-price">$${p.price}<span>/person</span></p>
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

/* ---------- 4. Home page render ---------- */

function renderHome() {
  document.getElementById("featuredDestinations").innerHTML =
    destinations.slice(0, 3).map(destinationCard).join("");
  document.getElementById("popularPackages").innerHTML =
    packages.map(packageCard).join("");
  document.getElementById("testimonials").innerHTML =
    testimonials.map(testimonialCard).join("");
}


/* ---------- 6. Package details page ---------- */

function renderDetails(packageId) {
  const d = destinations.find((x) => x.id === packageId) || destinations[0];
  state.currentPackageId = d.id;
  state.activeGalleryImage = 0;

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
    window.location.hash = "#booking";
  };
}


/* ---------- 11. About page team render ---------- */

function renderAbout() {
  document.getElementById("teamGrid").innerHTML = team.map(teamCard).join("");
}

/* ---------- 12. Dark mode ---------- */

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

/* ---------- 13. Mobile nav toggle ---------- */

function initMobileNav() {
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("mobile-open");
  });
}

/* ---------- 14. Hero search form (Home page) ---------- */

function initHeroSearch() {
  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const destinationQuery = document.getElementById("searchDestination").value.trim();
    state.exploreQuery = destinationQuery;
    window.location.hash = "#explore";
  });
}

/* ---------- 15. Package/Book button delegation (event delegation for dynamically-injected cards) ---------- */

function initGlobalDelegation() {
  document.addEventListener("click", (e) => {
    const packageLink = e.target.closest("[data-package]");
    if (packageLink) {
      state.currentPackageId = packageLink.dataset.package;
    }

    const bookBtn = e.target.closest("[data-book]");
    if (bookBtn) {
      /* Popular package cards map back to a matching destination for the details/booking demo */
      const pkg = packages.find((p) => p.id === bookBtn.dataset.book);
      if (pkg) {
        const matchingDestination = destinations.find((d) => d.image === pkg.image) || destinations[0];
        state.currentPackageId = matchingDestination.id;
      }
      window.location.hash = "#booking";
    }
  });
}

/* ---------- 16. Router (hash-based SPA navigation, replaces React Router) ---------- */

const validRoutes = ["home", "explore", "details", "booking", "about", "contact", "login", "signup", "dashboard"];

function navigateTo(routeId) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  const target = document.getElementById(routeId) || document.getElementById("notfound");
  target.classList.add("active");

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active-link", link.getAttribute("href") === "#" + routeId);
  });

  if (routeId === "details") renderDetails(state.currentPackageId);
  if (routeId === "booking") renderBookingSummary();
  if (routeId === "explore") renderExplore();

  document.getElementById("navLinks").classList.remove("mobile-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleRouteChange() {
  const hash = window.location.hash.replace("#", "") || "home";
  const routeId = validRoutes.includes(hash) ? hash : "notfound";
  navigateTo(routeId);
}

function initRouter() {
  window.addEventListener("hashchange", handleRouteChange);
  handleRouteChange();
}

/* ---------- 17. App bootstrap ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderHome();
  renderAbout();
  initExploreControls();
  initBookingFlow();
  initContactForm();
  initAuthForms();
  initDashboard();
  initTheme();
  initMobileNav();
  initHeroSearch();
  initGlobalDelegation();
  initRouter();
});

/* ============================================================
   TravelX - common.js
   Shared code used by EVERY page: mock data, reusable render
   helpers, dark mode, mobile nav, cross-page navigation state,
   and active-link highlighting. Load this file BEFORE each
   page's own <page>.js file.
   ============================================================ */

/* ---------- 1. Mock data (stand-in for API responses) ----------
   Replace these arrays with real fetch() calls to your Express/
   MongoDB backend once it's ready (e.g. GET /api/destinations). */

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
  },
  /* new data insert */
  {
    id: "goa",
    name: "Goa, India",
    category: "Beach",
    price: 12999,
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    reviews: 3250,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Relax on golden beaches, explore Portuguese heritage, enjoy vibrant nightlife, and experience Goa's famous coastal culture.",
    itinerary: [
      { day: 1, title: "Arrival and beach evening", detail: "Airport pickup, hotel check-in, Baga Beach and sunset dinner." },
      { day: 2, title: "North Goa exploration", detail: "Visit Fort Aguada, Calangute Beach, Anjuna and Vagator." },
      { day: 3, title: "South Goa escape", detail: "Explore Colva Beach, Basilica of Bom Jesus and Old Goa." },
      { day: 4, title: "Shopping and departure", detail: "Local shopping, breakfast and airport transfer." }
    ]
  },

  {
    id: "manali",
    name: "Manali, Himachal Pradesh",
    category: "Mountain",
    price: 14999,
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviews: 2870,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Discover snow-covered mountains, scenic valleys, adventure activities, waterfalls, and peaceful Himalayan landscapes.",
    itinerary: [
      { day: 1, title: "Arrival in Manali", detail: "Hotel check-in, Mall Road walk and evening sightseeing." },
      { day: 2, title: "Solang Valley adventure", detail: "Visit Solang Valley and enjoy snow and adventure activities." },
      { day: 3, title: "Old Manali exploration", detail: "Explore Hadimba Temple, Manu Temple and Old Manali." },
      { day: 4, title: "Rohtang region", detail: "Scenic mountain drive and Himalayan sightseeing." },
      { day: 5, title: "Departure", detail: "Breakfast, local shopping and departure transfer." }
    ]
  },

  {
    id: "jaipur",
    name: "Jaipur, Rajasthan",
    category: "Heritage",
    price: 9999,
    duration: "3 Days / 2 Nights",
    rating: 4.8,
    reviews: 4120,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Explore the Pink City with magnificent forts, royal palaces, colorful markets, traditional cuisine, and Rajasthan's rich heritage.",
    itinerary: [
      { day: 1, title: "Pink City arrival", detail: "Hotel check-in, City Palace and Hawa Mahal visit." },
      { day: 2, title: "Royal Jaipur", detail: "Visit Amber Fort, Jal Mahal and Jaigarh Fort." },
      { day: 3, title: "Markets and departure", detail: "Explore local markets, enjoy Rajasthani food and depart." }
    ]
  },

  {
    id: "udaipur",
    name: "Udaipur, Rajasthan",
    category: "Romantic",
    price: 11999,
    duration: "3 Days / 2 Nights",
    rating: 4.8,
    reviews: 2680,
    image: "https://images.unsplash.com/photo-1582972236019-ea9e6a5e4e50?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1582972236019-ea9e6a5e4e50?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1602643163981-8f5c9c7f1a1a?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Experience the City of Lakes with magnificent palaces, peaceful lakes, romantic sunsets, and royal Rajasthani architecture.",
    itinerary: [
      { day: 1, title: "Arrival and Lake Pichola", detail: "Hotel check-in followed by an evening boat ride." },
      { day: 2, title: "Royal Udaipur", detail: "Visit City Palace, Jagdish Temple and Saheliyon Ki Bari." },
      { day: 3, title: "Sunrise and departure", detail: "Explore local markets and depart after breakfast." }
    ]
  },

  {
    id: "ladakh",
    name: "Leh-Ladakh, India",
    category: "Adventure",
    price: 22999,
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 3540,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1533693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Ride through dramatic Himalayan landscapes, high mountain passes, turquoise lakes, ancient monasteries, and remote valleys.",
    itinerary: [
      { day: 1, title: "Arrival in Leh", detail: "Airport pickup, hotel check-in and acclimatization." },
      { day: 2, title: "Leh sightseeing", detail: "Visit Shanti Stupa, Leh Palace and local markets." },
      { day: 3, title: "Nubra Valley", detail: "Cross Khardung La and explore Nubra Valley." },
      { day: 4, title: "Pangong Lake", detail: "Drive to Pangong Lake and enjoy the spectacular landscape." },
      { day: 5, title: "Monasteries", detail: "Visit Thiksey and Hemis monasteries." },
      { day: 6, title: "Departure", detail: "Breakfast and airport transfer." }
    ]
  },

  {
    id: "kerala",
    name: "Kerala, India",
    category: "Nature",
    price: 16999,
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviews: 3010,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Explore Kerala's lush backwaters, tea plantations, tropical landscapes, waterfalls, and traditional culture.",
    itinerary: [
      { day: 1, title: "Arrival in Kochi", detail: "Airport pickup and explore Fort Kochi." },
      { day: 2, title: "Munnar journey", detail: "Drive through scenic hills and visit tea plantations." },
      { day: 3, title: "Munnar exploration", detail: "Visit waterfalls, viewpoints and tea gardens." },
      { day: 4, title: "Alleppey houseboat", detail: "Enjoy a relaxing backwater cruise on a traditional houseboat." },
      { day: 5, title: "Departure", detail: "Breakfast and transfer to the airport." }
    ]
  },

  {
    id: "varanasi",
    name: "Varanasi, Uttar Pradesh",
    category: "Spiritual",
    price: 8999,
    duration: "3 Days / 2 Nights",
    rating: 4.7,
    reviews: 3920,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Experience one of India's oldest cities through sacred ghats, Ganga Aarti, ancient temples, spiritual traditions, and local culture.",
    itinerary: [
      { day: 1, title: "Arrival and Ganga Aarti", detail: "Hotel check-in and evening Ganga Aarti at Dashashwamedh Ghat." },
      { day: 2, title: "Spiritual Varanasi", detail: "Sunrise boat ride, Kashi Vishwanath Temple and local ghats." },
      { day: 3, title: "Sarnath and departure", detail: "Visit Sarnath, explore local markets and depart." }
    ]
  },

  {
    id: "rishikesh",
    name: "Rishikesh, Uttarakhand",
    category: "Adventure",
    price: 10999,
    duration: "3 Days / 2 Nights",
    rating: 4.7,
    reviews: 2460,
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Combine spiritual relaxation with thrilling river rafting, Himalayan scenery, yoga, temples, and peaceful riverside experiences.",
    itinerary: [
      { day: 1, title: "Arrival and Ganga Aarti", detail: "Check-in, explore Ram Jhula and attend evening Ganga Aarti." },
      { day: 2, title: "River adventure", detail: "Enjoy white-water rafting and explore riverside cafes." },
      { day: 3, title: "Yoga and departure", detail: "Morning yoga, local sightseeing and departure." }
    ]
  },

  {
    id: "jaisalmer",
    name: "Jaisalmer, Rajasthan",
    category: "Desert",
    price: 11999,
    duration: "3 Days / 2 Nights",
    rating: 4.8,
    reviews: 2210,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Discover the Golden City with its magnificent fort, ancient havelis, golden sand dunes, camel safaris, and desert sunsets.",
    itinerary: [
      { day: 1, title: "Golden City arrival", detail: "Visit Jaisalmer Fort and explore the old city." },
      { day: 2, title: "Desert safari", detail: "Camel safari, dune adventure and cultural desert evening." },
      { day: 3, title: "Havelis and departure", detail: "Visit Patwon Ki Haveli, local shopping and departure." }
    ]
  },

  {
    id: "andaman",
    name: "Andaman Islands, India",
    category: "Beach",
    price: 24999,
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 1850,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Escape to tropical islands featuring crystal-clear waters, white-sand beaches, coral reefs, snorkeling, and unforgettable sunsets.",
    itinerary: [
      { day: 1, title: "Arrival in Port Blair", detail: "Airport pickup and cellular jail sightseeing." },
      { day: 2, title: "Havelock Island", detail: "Travel to Havelock and relax at the beach." },
      { day: 3, title: "Radhanagar Beach", detail: "Enjoy one of India's most beautiful beaches." },
      { day: 4, title: "Snorkeling adventure", detail: "Explore coral reefs and marine life." },
      { day: 5, title: "Island exploration", detail: "Explore nearby beaches and local attractions." },
      { day: 6, title: "Departure", detail: "Breakfast and return transfer." }
    ]
  },

  {
    id: "shimla",
    name: "Shimla, Himachal Pradesh",
    category: "Mountain",
    price: 12999,
    duration: "4 Days / 3 Nights",
    rating: 4.6,
    reviews: 2760,
    image: "https://images.unsplash.com/photo-1609948543911-7f5f1f2d5f6f?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1609948543911-7f5f1f2d5f6f?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Enjoy colonial architecture, mountain views, pine forests, peaceful valleys, and the charming atmosphere of India's hill capital.",
    itinerary: [
      { day: 1, title: "Arrival in Shimla", detail: "Hotel check-in and Mall Road evening walk." },
      { day: 2, title: "Shimla sightseeing", detail: "Visit Kufri, Jakhu Temple and Ridge." },
      { day: 3, title: "Mountain escape", detail: "Explore nearby scenic villages and viewpoints." },
      { day: 4, title: "Departure", detail: "Breakfast and return journey." }
    ]
  },

  {
    id: "agra",
    name: "Agra, Uttar Pradesh",
    category: "Heritage",
    price: 7999,
    duration: "2 Days / 1 Night",
    rating: 4.7,
    reviews: 4510,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Visit the iconic Taj Mahal and explore Mughal architecture, historic forts, local markets, and the rich heritage of Agra.",
    itinerary: [
      { day: 1, title: "Arrival and Agra Fort", detail: "Check-in and explore Agra Fort and local markets." },
      { day: 2, title: "Taj Mahal and departure", detail: "Sunrise visit to the Taj Mahal followed by departure." }
    ]
  },

  {
    id: "darjeeling",
    name: "Darjeeling, West Bengal",
    category: "Mountain",
    price: 13999,
    duration: "4 Days / 3 Nights",
    rating: 4.7,
    reviews: 1980,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1622308644420-b20142dc993c?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Enjoy spectacular Himalayan views, famous tea gardens, the Darjeeling Himalayan Railway, and peaceful mountain landscapes.",
    itinerary: [
      { day: 1, title: "Arrival in Darjeeling", detail: "Hotel check-in and explore Mall Road." },
      { day: 2, title: "Tiger Hill sunrise", detail: "Watch sunrise at Tiger Hill and visit Ghoom Monastery." },
      { day: 3, title: "Tea garden experience", detail: "Visit tea estates and explore local attractions." },
      { day: 4, title: "Departure", detail: "Breakfast and transfer for departure." }
    ]
  },

  {
    id: "mysore",
    name: "Mysore, Karnataka",
    category: "Heritage",
    price: 8999,
    duration: "3 Days / 2 Nights",
    rating: 4.6,
    reviews: 1740,
    image: "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1600112356915-089abb8fc71a?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1590050752117-23a9d3d4b6f5?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Discover royal palaces, colorful markets, traditional South Indian culture, gardens, and the magnificent Mysore Palace.",
    itinerary: [
      { day: 1, title: "Royal Mysore", detail: "Visit Mysore Palace and Devaraja Market." },
      { day: 2, title: "Culture and nature", detail: "Visit Chamundi Hills and Brindavan Gardens." },
      { day: 3, title: "Departure", detail: "Breakfast, shopping and departure." }
    ]
  },

  {
    id: "mumbai",
    name: "Mumbai, Maharashtra",
    category: "City",
    price: 10999,
    duration: "3 Days / 2 Nights",
    rating: 4.6,
    reviews: 3180,
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Experience India's energetic financial capital through historic landmarks, coastal promenades, Bollywood culture, and incredible food.",
    itinerary: [
      { day: 1, title: "South Mumbai", detail: "Visit Gateway of India, Colaba and Marine Drive." },
      { day: 2, title: "City exploration", detail: "Explore Chhatrapati Shivaji Maharaj Terminus and local markets." },
      { day: 3, title: "Mumbai culture", detail: "Explore Bandra, cafes and Bollywood landmarks before departure." }
    ]
  },

  {
    id: "kaziranga",
    name: "Kaziranga, Assam",
    category: "Wildlife",
    price: 15999,
    duration: "4 Days / 3 Nights",
    rating: 4.8,
    reviews: 1320,
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=600&q=70",
    gallery: [
      "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=70",
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=70"
    ],
    description: "Explore the wild landscapes of Assam and experience thrilling safaris through one of India's most famous wildlife destinations.",
    itinerary: [
      { day: 1, title: "Arrival and nature walk", detail: "Resort check-in and explore the surrounding area." },
      { day: 2, title: "Morning safari", detail: "Early morning jeep safari and wildlife exploration." },
      { day: 3, title: "Wildlife adventure", detail: "Second safari and visit nearby villages and tea gardens." },
      { day: 4, title: "Departure", detail: "Breakfast and departure transfer." }
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

/* ---------- 2. Shared render helpers ----------
   Used by home.js, explore.js, details.js, and about.js to turn
   a data object into an HTML string. */

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
          <a href="details.html?id=${d.id}" class="dest-link-btn" data-package="${d.id}">View details</a>
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

function teamCard(m) {
  return `
    <div class="card team-card">
      <img src="${m.avatar}" alt="${m.name}" />
      <h4>${m.name}</h4>
      <p>${m.role}</p>
    </div>`;
}

/* ---------- 3. Selected-package state (persisted across page loads) ----------
   Since each page is now a real, separate HTML file, in-memory
   state resets on every navigation. We use localStorage instead
   so "View details" -> details.html and "Book Now" -> booking.html
   remember which destination was picked. */

const SELECTED_PACKAGE_KEY = "travelx_selected_package";

function setSelectedPackageId(id) {
  localStorage.setItem(SELECTED_PACKAGE_KEY, id);
}

function getSelectedPackageId() {
  /* details.html?id=xxx (from a direct link) takes priority over
     whatever was previously stored */
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("id");
  if (fromQuery) {
    setSelectedPackageId(fromQuery);
    return fromQuery;
  }
  return localStorage.getItem(SELECTED_PACKAGE_KEY) || destinations[0].id;
}

/* ---------- 4. Package/Book button delegation ----------
   Destination cards and package cards are injected as HTML
   strings (see common helpers above), so we use one delegated
   listener instead of attaching a listener to each card. */

function initGlobalDelegation() {
  document.addEventListener("click", (e) => {
    const packageLink = e.target.closest("[data-package]");
    if (packageLink) {
      setSelectedPackageId(packageLink.dataset.package);
    }

    const bookBtn = e.target.closest("[data-book]");
    if (bookBtn) {
      /* Popular package cards map back to a matching destination for the details/booking demo */
      const pkg = packages.find((p) => p.id === bookBtn.dataset.book);
      if (pkg) {
        const matchingDestination = destinations.find((d) => d.image === pkg.image) || destinations[0];
        setSelectedPackageId(matchingDestination.id);
      }
      window.location.href = "booking.html";
    }
  });
}

/* ---------- 5. Dark mode (shared across all pages via localStorage) ---------- */

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

/* ---------- 6. Mobile nav toggle ---------- */

function initMobileNav() {
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("mobile-open");
  });
}

/* ---------- 7. Highlight the current page's nav link ----------
   Compares each nav link's href against the current file name
   (e.g. "explore.html"), since there is no more client-side router. */

function initNavHighlight() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href");
    link.classList.toggle("active-link", linkPage === current);
  });
}

/* ---------- 8. Shared form helper ---------- */

function isValidEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value);
}

/* ---------- 9. Bootstrap the parts every page needs ----------
   Each page's own <page>.js file has its own DOMContentLoaded
   listener for page-specific rendering; this one only wires up
   the shared navbar/footer behaviour so it runs on every page. */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  initNavHighlight();
  initGlobalDelegation();
});

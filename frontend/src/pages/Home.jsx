import { Link } from "react-router-dom";
import {
  FaLocationDot,
  FaCalendarDays,
  FaUsers,
  FaMagnifyingGlass,
  FaShieldHalved,
  FaWallet,
  FaHeadset,
  FaCircleCheck,
  FaQuoteRight,
} from "react-icons/fa6";
import { useDestinations } from '../hooks/useDestinations';
import DestinationCard from "../components/DestinationCard";

import { useWishlist } from "../hooks/useWishlist";

// Tumhari common.js se Packages ka data
const packages = [
  {
    id: "goa-beach-escape",
    name: "Goa Beach Escape",
    destinationId: "goa-north",
    price: 12999,
    includes: [
      "4-star beach resort",
      "Airport transfers",
      "North Goa sightseeing",
    ],
  },
  {
    id: "udaipur-royal-romance",
    name: "Udaipur Royal Romance",
    destinationId: "udaipur",
    price: 17999,
    includes: [
      "Lake-view heritage hotel",
      "Private boat ride",
      "Candlelight dinner",
    ],
  },
  {
    id: "manali-himalayan-adventure",
    name: "Manali Himalayan Adventure",
    destinationId: "manali",
    price: 14999,
    includes: [
      "Mountain resort stay",
      "Guided Solang Valley trip",
      "Bonfire evening",
    ],
  },
];

// Tumhari common.js se Testimonials ka data
const testimonials = [
  {
    name: "Aditi Sharma",
    location: "Jaipur, Rajasthan",
    avatar: "https://i.pravatar.cc/60?img=47",
    text: "TravelX made our Goa trip completely stress-free from start to finish.",
  },
  {
    name: "Rohan Mehta",
    location: "Delhi",
    avatar: "https://i.pravatar.cc/60?img=12",
    text: "The Udaipur package exceeded every expectation we had.",
  },
  {
    name: "Priya Nair",
    location: "Kochi, Kerala",
    avatar: "https://i.pravatar.cc/60?img=32",
    text: "Booking was seamless and support responded within minutes.",
  },
];

const Home = () => {
  const { destinations } = useDestinations();
  const { wishlist, toggleWishlist } = useWishlist(); // Hook use karo
  const featured = [...destinations]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Package ke liye uske destination ki image nikalna
  const getPackageImage = (destId) => {
    const dest = destinations.find((d) => d.id === destId);
    return dest ? dest.image : "";
  };

  return (
    <main>
      <section id="home" className="page active">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>
          <div className="container hero-inner">
            <span className="badge-pill">
              Over 2M+ happy travelers worldwide
            </span>
            <h1 className="hero-title">
              Explore More. <span className="text-sunset">Worry Less.</span>
            </h1>
            <p className="hero-subtitle">
              Discover handpicked destinations, exclusive travel packages, and
              unforgettable experiences &mdash; all in one place.
            </p>

            {/* Search bar */}
            <form className="search-bar">
              <div className="search-field">
                <FaLocationDot />
                <input type="text" placeholder="Where do you want to go?" />
              </div>
              <div className="search-field">
                <FaCalendarDays />
                <input type="date" />
              </div>
              <div className="search-field">
                <FaUsers />
                <select defaultValue="2">
                  <option value="1">1 traveler</option>
                  <option value="2">2 travelers</option>
                  <option value="3">3 travelers</option>
                  <option value="4">4+ travelers</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary search-btn">
                <FaMagnifyingGlass /> Search
              </button>
            </form>
          </div>
        </section>

        {/* Trust perks */}
        <section className="container perks">
          <div className="perk-card">
            <span className="perk-icon">
              <FaShieldHalved />
            </span>
            <div>
              <h3>Verified stays</h3>
              <p>Every hotel quality-checked by our experts.</p>
            </div>
          </div>
          <div className="perk-card">
            <span className="perk-icon">
              <FaWallet />
            </span>
            <div>
              <h3>Best price guarantee</h3>
              <p>Found it cheaper? We'll match it.</p>
            </div>
          </div>
          <div className="perk-card">
            <span className="perk-icon">
              <FaHeadset />
            </span>
            <div>
              <h3>24/7 support</h3>
              <p>Round-the-clock help, any time.</p>
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section className="container section">
          <div className="section-heading">
            <span className="eyebrow">Handpicked for you</span>
            <h2>Featured Destinations</h2>
            <p>Our travel experts' top picks for this season.</p>
          </div>
          <div className="grid grid-3">
            {featured.map((dest) => (
              <DestinationCard
                key={dest.id}
                data={dest}
                isWishlisted={wishlist.includes(dest.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </section>

        {/* Popular Packages */}
        <section className="container section">
          <div className="section-heading">
            <span className="eyebrow">Best value</span>
            <h2>Popular Packages</h2>
            <p>All-inclusive bundles with everything planned for you.</p>
          </div>
          <div className="grid grid-3">
            {packages.map((pkg) => (
              <div key={pkg.id} className="card pkg-card">
                {/* Inline style kyunki humne waisa hi code copy kiya hai */}
                <div
                  className="dest-card-img"
                  style={{
                    height: "140px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    margin: "-1.25rem -1.25rem 1rem",
                  }}
                >
                  <img
                    src={getPackageImage(pkg.destinationId)}
                    alt={pkg.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="pkg-card-top">
                  <h3>{pkg.name}</h3>
                </div>
                <ul className="pkg-included">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx}>
                      <FaCircleCheck /> {item}
                    </li>
                  ))}
                </ul>
                <div className="dashed-divider"></div>
                <div className="pkg-card-footer">
                  <p className="dest-price">
                    ₹{pkg.price.toLocaleString("en-IN")}
                    <span>/person</span>
                  </p>
                  <Link
                    to={`/booking?id=${pkg.destinationId}`}
                    className="btn btn-accent btn-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section section-muted">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Real experiences</span>
              <h2>What Our Travelers Say</h2>
            </div>
            <div className="grid grid-3">
              {testimonials.map((t, idx) => (
                <div key={idx} className="card testimonial-card">
                  <FaQuoteRight className="testimonial-quote-icon" />
                  <div className="testimonial-head">
                    <img src={t.avatar} alt={t.name} />
                    <div>
                      <h4>{t.name}</h4>
                      <p>{t.location}</p>
                    </div>
                  </div>
                  <p className="testimonial-body">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container section">
          <div className="cta-banner">
            <div className="cta-glow"></div>
            <h2>Ready for your next adventure?</h2>
            <p>Book today and get exclusive early-bird discounts.</p>
            <Link to="/explore" className="btn btn-accent">
              Book Now
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Home;

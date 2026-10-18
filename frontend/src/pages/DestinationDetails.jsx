import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import destinationsData from '../data/destinations.json';
import { 
  FaLocationDot, 
  FaClock, 
  FaStar, 
  FaShieldHalved, 
  FaCalendarCheck, 
  FaUsers,
  FaQuoteRight
} from 'react-icons/fa6';

// Hardcoded reviews as per your original setup
const testimonials = [
  { name: "Aditi Sharma", location: "Jaipur, Rajasthan", avatar: "https://i.pravatar.cc/60?img=47", text: "TravelX made our Goa trip completely stress-free from start to finish." },
  { name: "Rohan Mehta", location: "Delhi", avatar: "https://i.pravatar.cc/60?img=12", text: "The Udaipur package exceeded every expectation we had." },
];

const DestinationDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  const [destination, setDestination] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    // Find destination by ID, fallback to the first one if not found
    const foundDest = destinationsData.find(d => d.id === id) || destinationsData[0];
    setDestination(foundDest);
    if (foundDest && foundDest.gallery) {
      setActiveImage(foundDest.gallery[0]);
    }
  }, [id]);

  if (!destination) {
    return <div className="container section"><h2>Loading...</h2></div>;
  }

  const handleBookNow = () => {
    navigate(`/booking?id=${destination.id}`);
  };

  return (
    <main>
      <section id="details" className="page active">
        
        {/* Hero Section */}
        <div className="details-hero">
          <img src={activeImage} alt={destination.name} />
          <div className="details-hero-overlay"></div>
          <div className="container details-hero-content">
            <span className="badge-pill">{destination.category}</span>
            <h1>{destination.name}</h1>
            <div className="details-meta">
              <span><FaLocationDot /> {destination.name}</span>
              <span><FaClock /> {destination.duration}</span>
              <span><FaStar className="star-filled" /> {destination.rating} ({destination.reviews})</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="container section details-layout">
          
          <div className="details-main">
            
            {/* Gallery Strip */}
            <div className="gallery-strip">
              {destination.gallery.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`gallery-thumb ${activeImage === img ? 'active-thumb' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`Gallery ${idx + 1}`} />
                </div>
              ))}
            </div>

            <h2>Overview</h2>
            <p className="text-muted">{destination.description}</p>

            <div className="grid grid-3 feature-badges">
              <div className="feature-badge"><FaShieldHalved /> Verified Package</div>
              <div className="feature-badge"><FaCalendarCheck /> Free Cancellation</div>
              <div className="feature-badge"><FaUsers /> Group Friendly</div>
            </div>

            <h2>Itinerary</h2>
            <div className="itinerary">
              {destination.itinerary.map((step) => (
                <div key={step.day} className="itinerary-step">
                  <div className="itinerary-num">{step.day}</div>
                  <div className="itinerary-body">
                    <h4>{step.title}</h4>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2>Traveler Reviews</h2>
            <div className="grid grid-2">
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

          {/* Sticky Booking Sidebar */}
          <aside className="booking-sidebar">
            <div className="card">
              <div className="price-row">
                <div>
                  <span className="text-muted small">Starting from</span>
                  <p className="price-large">
                    ₹{destination.price.toLocaleString('en-IN')}
                    <span className="small text-muted"> / person</span>
                  </p>
                </div>
                <span className="rating-badge">
                  <FaStar className="star-filled" /> {destination.rating}
                </span>
              </div>
              
              <div className="dashed-divider"></div>
              
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Duration</span>
                  <span>{destination.duration}</span>
                </div>
                <div className="summary-row">
                  <span>Category</span>
                  <span>{destination.category}</span>
                </div>
                <div className="summary-row">
                  <span>Cancellation</span>
                  <span className="text-teal">Free before 7 days</span>
                </div>
              </div>

              <button className="btn btn-primary btn-block" onClick={handleBookNow}>
                Book This Trip
              </button>
              <p className="text-center small text-muted">No payment charged yet</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default DestinationDetails;
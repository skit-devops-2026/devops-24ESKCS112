import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import destinationsData from '../data/destinations.json';
import { FaLock, FaCircleCheck } from 'react-icons/fa6';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  const [destination, setDestination] = useState(null);
  const [step, setStep] = useState(1); // 1 = Info, 2 = Payment, 3 = Success
  const [travelers, setTravelers] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    card: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    // Find destination based on URL ID, fallback to first if not found
    const foundDest = destinationsData.find(d => d.id === id) || destinationsData[0];
    setDestination(foundDest);
  }, [id]);

  if (!destination) return <div className="container section"><h2>Loading...</h2></div>;

  const total = destination.price * travelers;

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1 to Step 2 Transition
  const handleContinue = () => {
    if (!formData.name || !formData.email || !formData.date) {
      alert("Please fill in your name, email, and travel date to continue.");
      return;
    }
    setStep(2);
  };

  // Payment Submit
  const handlePayment = (e) => {
    e.preventDefault();
    if (!formData.card || !formData.expiry || !formData.cvv) {
      alert("Please complete the demo payment fields.");
      return;
    }

    setIsProcessing(true);
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Show Success
    }, 1200);
  };

  return (
    <main>
      <section id="booking" className="page active">
        <div className="container section booking-layout">
          
          <div>
            <h1>Complete Your Booking</h1>
            <p className="text-muted">Fill in your traveler details, then confirm payment to lock in your trip.</p>

            {/* Step Indicator */}
            <div className="step-indicator">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span className="step-num">1</span> Traveler Info
              </div>
              <div className="step-line"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span className="step-num">2</span> Payment
              </div>
            </div>

            <form className="card booking-form" onSubmit={handlePayment}>
              
              {/* Step 1: Traveler Info */}
              {step === 1 && (
                <div className="form-step active">
                  <label className="field">
                    <span>Full Name</span>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </label>
                  <label className="field">
                    <span>Email Address</span>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="you@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </label>
                  <div className="grid grid-2">
                    <label className="field">
                      <span>Travel Date</span>
                      <input 
                        type="date" 
                        name="date" 
                        value={formData.date}
                        onChange={handleChange}
                        required 
                      />
                    </label>
                    <label className="field">
                      <span>Travelers</span>
                      <input 
                        type="number" 
                        name="travelers" 
                        min="1" 
                        max="10" 
                        value={travelers}
                        onChange={(e) => setTravelers(Math.max(1, Number(e.target.value)))}
                        required 
                      />
                    </label>
                  </div>
                  <button type="button" className="btn btn-primary btn-block" onClick={handleContinue}>
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="form-step active">
                  <div className="info-note">
                    <FaLock /> This is a demo payment form &mdash; no real charges are made.
                  </div>
                  <label className="field">
                    <span>Card Number</span>
                    <input 
                      type="text" 
                      name="card" 
                      placeholder="4242 4242 4242 4242" 
                      value={formData.card}
                      onChange={handleChange}
                      required 
                    />
                  </label>
                  <div className="grid grid-2">
                    <label className="field">
                      <span>Expiry</span>
                      <input 
                        type="text" 
                        name="expiry" 
                        placeholder="MM/YY" 
                        value={formData.expiry}
                        onChange={handleChange}
                        required 
                      />
                    </label>
                    <label className="field">
                      <span>CVV</span>
                      <input 
                        type="text" 
                        name="cvv" 
                        placeholder="123" 
                        value={formData.cvv}
                        onChange={handleChange}
                        required 
                      />
                    </label>
                  </div>
                  <div className="grid grid-2">
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button type="submit" className="btn btn-accent" disabled={isProcessing}>
                      {isProcessing ? 'Processing...' : 'Pay'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="form-step booking-success active">
                  <FaCircleCheck />
                  <h2>Booking Confirmed!</h2>
                  <p className="text-muted">
                    Your trip is booked. A confirmation with your itinerary has been sent to {formData.email}.
                  </p>
                  <button type="button" className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                    View My Bookings
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Summary Sidebar */}
          <aside>
            <div className="card summary-card">
              <img src={destination.image} alt={destination.name} />
              <div className="summary-card-body">
                <h3>{destination.name}</h3>
                <p className="small text-muted">{destination.duration}</p>
                <div className="dashed-divider"></div>
                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Price per person</span>
                    <span>₹{destination.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="summary-row">
                    <span>Travelers</span>
                    <span>x {travelers}</span>
                  </div>
                  <div className="summary-row">
                    <span>Service fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="summary-row summary-total">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
        </div>
      </section>
    </main>
  );
};

export default Booking;
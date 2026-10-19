import { useState } from 'react';
import { FaEnvelope, FaPhone, FaLocationDot, FaClock, FaCircleCheck } from 'react-icons/fa6';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main>
      <section id="contact" className="page active">
        <div className="container section">
          
          <div className="section-heading">
            <span className="eyebrow">We'd love to hear from you</span>
            <h2>Get in Touch</h2>
            <p>Questions about a booking, a package, or a partnership? Reach out anytime.</p>
          </div>

          <div className="contact-layout">
            <div className="card">
              {!isSubmitted ? (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <label className="field">
                    <span>Full Name:</span>
                    <input type="text" placeholder="Your name" required />
                  </label>
                  <label className="field">
                    <span>Email Address:</span>
                    <input 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </label>
                  <label className="field">
                    <span>Message:</span>
                    <textarea rows="5" placeholder="How can we help?" required></textarea>
                  </label>
                  <button type="submit" className="btn btn-primary btn-block">Send Message</button>
                </form>
              ) : (
                <div className="contact-success active">
                  <FaCircleCheck />
                  <h3>Message sent!</h3>
                  <p className="text-muted">
                    Our support team will reply to {email} within 24 hours.
                  </p>
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={() => { setIsSubmitted(false); setEmail(''); }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            <div className="contact-side">
              <div className="map-embed">
                <iframe 
                  title="TravelX Office Location" 
                  loading="lazy" 
                  src="https://www.google.com/maps?q=Jaipur,Rajasthan,India&output=embed"
                ></iframe>
              </div>
              
              <div className="grid grid-2">
                <div className="contact-info-card">
                  <FaEnvelope />
                  <div><p className="small text-muted">Email us</p><p>support@travelx.com</p></div>
                </div>
                <div className="contact-info-card">
                  <FaPhone />
                  <div><p className="small text-muted">Call us</p><p>+91 98765 43210</p></div>
                </div>
                <div className="contact-info-card">
                  <FaLocationDot />
                  <div><p className="small text-muted">Visit us</p><p>Jaipur, Rajasthan, India</p></div>
                </div>
                <div className="contact-info-card">
                  <FaClock />
                  <div><p className="small text-muted">Support hours</p><p>24/7, every day</p></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Contact;
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo footer-logo">Travel<span className="logo-accent">X</span></Link>
          <p className="text-muted">Making unforgettable travel effortless for everyone, one trip at a time.</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Youtube"><FaYoutube /></a>
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="#">Careers</Link>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/explore">Destinations</Link>
          <Link to="/explore">Packages</Link>
          <Link to="#">Travel Guides</Link>
        </div>
        <div>
          <h4>Support</h4>
          <Link to="/contact">Help Center</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Privacy Policy</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 TravelX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
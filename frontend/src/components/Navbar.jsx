import { Link, NavLink } from 'react-router-dom';
import { FaPlane, FaMoon, FaSun, FaBars } from 'react-icons/fa';
// Agar tumne ThemeContext banaya hai toh isko uncomment karo:
// import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  // const { theme, toggleTheme } = useTheme(); // Context use kar rahe ho toh yeh chalu karo

  return (
    <header className="navbar" id="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-icon"><FaPlane /></span>
          Travel<span className="logo-accent">X</span>
        </Link>

        <nav className="nav-links" id="navLinks">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/explore" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Explore</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
        </nav>

        <div className="navbar-actions">
          <button className="icon-btn" aria-label="Toggle dark mode">
            <FaMoon /> {/* Baad me isko theme toggle se connect karenge */}
          </button>
          <Link to="/login" className="btn btn-ghost">Log in</Link>
          <Link to="/signup" className="btn btn-primary">Sign up</Link>
          <button className="icon-btn mobile-only" aria-label="Toggle menu">
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
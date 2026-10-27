import { Link, NavLink } from "react-router-dom";
import { FaPlane, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); 

  return (
    <header className="navbar" id="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <FaPlane />
          </span>
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
          <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle dark mode">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* 👇 CONDITION YAHAN LAGI HAI 👇 */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                Hi, {user.name.split(' ')[0]}
              </span>
              <button onClick={logout} className="btn btn-ghost">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Log in</Link>
              <Link to="/signup" className="btn btn-primary">Sign up</Link>
            </>
          )}

          <button className="icon-btn mobile-only" aria-label="Toggle menu">
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
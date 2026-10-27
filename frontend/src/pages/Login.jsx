import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlane, FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (val) => /^\S+@\S+\.\S+$/.test(val);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!isValidEmail(email)) newErrors.email = "Enter a valid email address";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Database (localStorage) se users nikalo
    const existingUsers = JSON.parse(localStorage.getItem('travelx_users') || '[]');
    
    // Email aur Password dono match karo
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);

    setTimeout(() => {
      setIsLoading(false);
      
      if (foundUser) {
        // Sahi details mili toh login karo
        login(foundUser.email, foundUser.name); 
        navigate('/dashboard'); 
      } else {
        // Galat password ya email
        setErrors({ password: "Invalid email or password" });
      }
    }, 1000);
  };

  return (
    <main>
      <section id="login" className="page active">
        <div className="auth-wrapper">
          <div className="card auth-card">
            <div className="auth-header">
              <span className="auth-icon"><FaPlane /></span>
              <h1>Welcome back</h1>
              <p className="text-muted">Log in to manage your bookings</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <label className="field">
                <span>Email Address</span>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <small className="field-error">{errors.email}</small>
              </label>

              <label className="field">
                <span>Password</span>
                <div className="password-field">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <small className="field-error">{errors.password}</small>
              </label>

              <div className="field-row">
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="link-text">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
            <p className="auth-footer-text">
              Don't have an account? <Link to="/signup" className="link-text">Sign up</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
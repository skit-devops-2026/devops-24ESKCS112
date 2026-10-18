import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlane, FaEye, FaEyeSlash } from 'react-icons/fa6';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (val) => /^\S+@\S+\.\S+$/.test(val);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (formData.name.trim().length < 2) newErrors.name = "Enter your full name";
    if (!isValidEmail(formData.email)) newErrors.email = "Enter a valid email address";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.confirm !== formData.password) newErrors.confirm = "Passwords do not match";
    if (!formData.terms) newErrors.terms = "Please accept the Terms and Conditions";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard'); // Redirect to dashboard
      }, 1000);
    }
  };

  return (
    <main>
      <section id="signup" className="page active">
        <div className="auth-wrapper">
          <div className="card auth-card">
            <div className="auth-header">
              <span className="auth-icon"><FaPlane /></span>
              <h1>Create your account</h1>
              <p className="text-muted">Start planning your next trip today</p>
            </div>
            
            <form onSubmit={handleSubmit}>
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
                <small className="field-error">{errors.name}</small>
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
                <small className="field-error">{errors.email}</small>
              </label>

              <label className="field">
                <span>Password</span>
                <div className="password-field">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <small className="field-error">{errors.password}</small>
              </label>

              <label className="field">
                <span>Confirm Password</span>
                <div className="password-field">
                  <input 
                    type={showConfirm ? "text" : "password"} 
                    name="confirm"
                    placeholder="••••••••" 
                    value={formData.confirm}
                    onChange={handleChange}
                    required 
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <small className="field-error">{errors.confirm}</small>
              </label>

              <div className="field">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  /> I agree to the <a href="#" className="link-text">Terms and Conditions</a>
                </label>
                <small className="field-error">{errors.terms}</small>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            <p className="auth-footer-text">
              Already have an account? <Link to="/login" className="link-text">Log in</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
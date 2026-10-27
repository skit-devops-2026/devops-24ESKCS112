import { useState, useEffect } from 'react';
import { useWishlist } from '../hooks/useWishlist';
import { useDestinations } from '../hooks/useDestinations';
import { useAuth } from '../context/AuthContext';
import { FaCalendarDays, FaHeart, FaUserGear, FaTrash, FaLocationDot } from 'react-icons/fa6';

const bookingsHistory = [
  { id: "TX10234", destination: "North Goa, Goa", date: "12 Mar 2026", status: "Completed", price: 12999 },
  { id: "TX10598", destination: "Udaipur, Rajasthan", date: "02 Sep 2026", status: "Upcoming", price: 17999 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  
  const { wishlist, toggleWishlist } = useWishlist();
  const { destinations } = useDestinations();
  const { user, updateProfile } = useAuth(); 

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // User load hone par form me details bharna
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const wishlistDestinations = wishlist
    .map(id => destinations.find(d => d.id === id))
    .filter(Boolean);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    // 1. Current Session Update (Navbar ke liye)
    updateProfile({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone
    });

    // 2. Main Database Update (Logout/Login ke liye)
    const existingUsers = JSON.parse(localStorage.getItem('travelx_users') || '[]');
    const updatedUsers = existingUsers.map(u => {
      if (u.email === user.email) { // Purani email se match karke update
        return { ...u, name: profileData.name, email: profileData.email };
      }
      return u;
    });
    localStorage.setItem('travelx_users', JSON.stringify(updatedUsers));

    alert("Profile changes saved successfully!");
  };

  return (
    <main>
      <section id="dashboard" className="page active">
        <div className="container section">
          <h1>Welcome, {user?.name || 'User'}</h1> 
          <p className="text-muted">Manage your bookings, wishlist, and account details.</p>

          <div className="dashboard-layout">
            <aside className="dashboard-tabs card">
              <button className={`dash-tab ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
                <FaCalendarDays /> My Bookings
              </button>
              <button className={`dash-tab ${activeTab === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveTab('wishlist')}>
                <FaHeart /> Wishlist
              </button>
              <button className={`dash-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                <FaUserGear /> Profile Settings
              </button>
            </aside>

            <div className="dashboard-content">
              
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="dash-panel active">
                  {bookingsHistory.map((b) => (
                    <div key={b.id} className="booking-history-item">
                      <div>
                        <h4>{b.destination}</h4>
                        <p className="small">Booking ID: {b.id} - {b.date}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span className={`booking-status ${b.status === 'Completed' ? 'status-completed' : 'status-upcoming'}`}>{b.status}</span>
                        <strong>₹{b.price.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="dash-panel active">
                  {wishlistDestinations.length === 0 ? (
                    <div className="empty-state">
                      <FaHeart /><h3>Your wishlist is empty</h3>
                      <p>Save destinations you love while exploring.</p>
                    </div>
                  ) : (
                    <div className="grid grid-2">
                      {wishlistDestinations.map((d) => (
                        <div key={d.id} className="card wishlist-card">
                          <img src={d.image} alt={d.name} />
                          <div className="wishlist-card-body">
                            <div>
                              <h5>{d.name}</h5>
                              <p><FaLocationDot /> {d.category}</p>
                            </div>
                            <button className="wishlist-remove" onClick={() => toggleWishlist(d.id)}>
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="dash-panel active">
                  <div className="card profile-card">
                    <div className="profile-avatar-row">
                      {/* Dynamic Gender-Neutral Avatar */}
                      <img 
                        src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0ea5e9&color=fff&rounded=true&bold=true&size=128`} 
                        alt="Profile" 
                      />
                      <button type="button" className="btn btn-outline btn-sm">Change Photo</button>
                    </div>
                    
                    <form onSubmit={handleProfileSubmit}>
                      <label className="field">
                        <span>Full Name</span>
                        <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} required />
                      </label>
                      
                      <label className="field">
                        <span>Email Address</span>
                        <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} required />
                      </label>
                      
                      <label className="field">
                        <span>Phone Number</span>
                        <input type="tel" name="phone" value={profileData.phone} onChange={handleProfileChange} placeholder="+91 98765 43210" />
                      </label>
                      
                      <button type="submit" className="btn btn-primary btn-block">Save Changes</button>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
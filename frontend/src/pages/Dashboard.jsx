import { useState } from 'react';
import destinationsData from '../data/destinations.json';
import { useWishlist } from '../hooks/useWishlist';
import { FaCalendarDays, FaHeart, FaUserGear, FaTrash, FaLocationDot } from 'react-icons/fa6';

const bookingsHistory = [
  { id: "TX10234", destination: "North Goa, Goa", date: "12 Mar 2026", status: "Completed", price: 12999 },
  { id: "TX10598", destination: "Udaipur, Rajasthan", date: "02 Sep 2026", status: "Upcoming", price: 17999 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Asli Wishlist hook use karo
  const { wishlist, toggleWishlist } = useWishlist();

  // Map IDs to data
  const wishlistDestinations = wishlist
    .map(id => destinationsData.find(d => d.id === id))
    .filter(Boolean);

  return (
    <main>
      <section id="dashboard" className="page active">
        <div className="container section">
          <h1>My Dashboard</h1>
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
                            {/* Yahan toggleWishlist use karo */}
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

              {activeTab === 'profile' && (
                <div className="dash-panel active">
                  <div className="card profile-card">
                    <div className="profile-avatar-row">
                      <img src="https://i.pravatar.cc/100?img=5" alt="Profile" />
                      <button type="button" className="btn btn-outline btn-sm">Change Photo</button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); alert("Profile changes saved."); }}>
                      <label className="field"><span>Full Name</span><input type="text" defaultValue="Dinesh Sharma" /></label>
                      <label className="field"><span>Email Address</span><input type="email" defaultValue="dinesh@example.com" /></label>
                      <label className="field"><span>Phone Number</span><input type="tel" placeholder="+91 98765 43210" /></label>
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
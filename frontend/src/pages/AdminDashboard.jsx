import { useState } from 'react';
import { useDestinations } from '../hooks/useDestinations';
import { FaTrash, FaPen, FaPlus } from 'react-icons/fa6';

const AdminDashboard = () => {
  const { destinations, addDestination, updateDestination, deleteDestination } = useDestinations();
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: 'Heritage', price: '', image: '' });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateDestination(currentId, { ...formData, price: Number(formData.price) });
      setIsEditing(false);
      setCurrentId(null);
    } else {
      addDestination({ ...formData, price: Number(formData.price), rating: 4.5, duration: '3 Days / 2 Nights', gallery: [formData.image] });
    }
    setFormData({ name: '', category: 'Heritage', price: '', image: '' });
  };

  const handleEditClick = (dest) => {
    setIsEditing(true);
    setCurrentId(dest.id);
    setFormData({ name: dest.name, category: dest.category, price: dest.price, image: dest.image });
  };

  return (
    <main className="container section" style={{ minHeight: '70vh' }}>
      <h1>Admin Panel: Manage Destinations</h1>
      
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', marginTop: '1rem' }}>
        <h3>{isEditing ? 'Update Destination' : 'Add New Destination'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required style={{ flex: '1 1 200px', padding: '0.5rem' }} />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required style={{ flex: '1 1 150px', padding: '0.5rem' }} />
          <input type="url" name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} required style={{ flex: '1 1 200px', padding: '0.5rem' }} />
          <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'}</button>
        </form>
      </div>

      <div className="grid grid-2">
        {destinations.map(dest => (
          <div key={dest.id} className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4>{dest.name}</h4>
              <p className="small text-muted">₹{dest.price}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-outline btn-sm" onClick={() => handleEditClick(dest)}><FaPen /></button>
              <button className="btn btn-accent btn-sm" onClick={() => deleteDestination(dest.id)}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdminDashboard;
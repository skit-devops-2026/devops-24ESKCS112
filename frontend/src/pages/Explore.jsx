import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import destinationsData from '../data/destinations.json';
import DestinationCard from '../components/DestinationCard';
import { 
  FaSliders, 
  FaSort, 
  FaTableCellsLarge, 
  FaMapLocationDot, 
  FaMagnifyingGlass, 
  FaCircleInfo 
} from 'react-icons/fa6';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState('any');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // --- Filter & Sort Logic ---
  const filteredDestinations = useMemo(() => {
    let result = [...destinationsData];

    // 1. Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        d => d.name.toLowerCase().includes(q) || 
             d.category.toLowerCase().includes(q) ||
             d.region.toLowerCase().includes(q)
      );
    }

    // 2. Categories
    if (selectedCategories.length > 0) {
      result = result.filter(d => selectedCategories.includes(d.category));
    }

    // 3. Price Range
    if (priceRange !== 'any') {
      if (priceRange === 'under10') result = result.filter(d => d.price < 10000);
      else if (priceRange === '10-15') result = result.filter(d => d.price >= 10000 && d.price <= 15000);
      else if (priceRange === '15-20') result = result.filter(d => d.price > 15000 && d.price <= 20000);
      else if (priceRange === 'above20') result = result.filter(d => d.price > 20000);
    }

    // 4. Rating
    if (minRating > 0) {
      result = result.filter(d => d.rating >= minRating);
    }

    // 5. Sort
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchQuery, selectedCategories, priceRange, minRating, sortBy]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, priceRange, minRating, sortBy]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(indexOfFirstItem, indexOfLastItem);

  // --- Handlers ---
  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange('any');
    setMinRating(0);
    setSortBy('recommended');
    setCurrentPage(1);
  };

  return (
    <main>
      <section id="explore" className="page active">
        <div className="container section">
          
          {/* Header */}
          <div className="section-heading section-heading-left">
            <span className="eyebrow">Explore the world</span>
            <h2>All Destinations</h2>
            <p>Filter, sort, and find the trip that matches exactly what you're looking for.</p>
          </div>

          {/* Toolbar */}
          <div className="explore-toolbar">
            <div className="search-with-suggestions">
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search destinations, categories, or states..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="sort-wrapper">
              <FaSort />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="view-toggle">
              <button 
                type="button" 
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FaTableCellsLarge /> Grid
              </button>
              <button 
                type="button" 
                className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => setViewMode('map')}
              >
                <FaMapLocationDot /> Map
              </button>
            </div>
          </div>

          {/* Main Layout */}
          <div className="explore-layout">
            
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <h3><FaSliders /> Filters</h3>

              <p className="filter-label">Category</p>
              <div className="filter-group">
                {['Beach', 'Mountain', 'Heritage', 'Nature', 'Spiritual', 'Wildlife', 'Adventure', 'Desert', 'Romantic', 'City'].map(cat => (
                  <label key={cat}>
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                    /> 
                    {cat}
                  </label>
                ))}
              </div>

              <p className="filter-label">Price range</p>
              <div className="filter-group">
                {[
                  { label: 'Any Price', value: 'any' },
                  { label: 'Under ₹10,000', value: 'under10' },
                  { label: '₹10,000 - ₹15,000', value: '10-15' },
                  { label: '₹15,000 - ₹20,000', value: '15-20' },
                  { label: 'Above ₹20,000', value: 'above20' }
                ].map(price => (
                  <label key={price.value}>
                    <input 
                      type="radio" 
                      name="priceBucket" 
                      value={price.value}
                      checked={priceRange === price.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                    /> 
                    {price.label}
                  </label>
                ))}
              </div>

              <p className="filter-label">Minimum rating</p>
              <div className="rating-chip-group">
                {[0, 4, 4.5, 4.8].map(rating => (
                  <button 
                    key={rating}
                    type="button"
                    className={`chip ${minRating === rating ? 'active-chip' : ''}`}
                    onClick={() => setMinRating(rating)}
                  >
                    {rating === 0 ? 'Any' : `${rating}+`}
                  </button>
                ))}
              </div>

              <button type="button" className="btn btn-outline btn-block" onClick={resetFilters} style={{ marginTop: '1.5rem' }}>
                Reset filters
              </button>
            </aside>

            {/* Results Area */}
            <div className="explore-results">
              <p className="results-count">{filteredDestinations.length} results found</p>

              {viewMode === 'grid' ? (
                <div id="gridView">
                  {filteredDestinations.length > 0 ? (
                    <div className="grid grid-3">
                      {currentDestinations.map(dest => (
                        <DestinationCard key={dest.id} data={dest} />
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <FaMagnifyingGlass />
                      <h3>No destinations match your filters</h3>
                      <p>Try widening your price range, clearing a category, or searching a different term.</p>
                      <button type="button" className="btn btn-outline" onClick={resetFilters}>Reset filters</button>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button 
                          key={page} 
                          className={`page-btn ${currentPage === page ? 'active-page' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div id="mapView">
                  <div className="map-legend">
                    <FaCircleInfo />
                    Showing {filteredDestinations.length} destinations that match your current filters.
                  </div>
                  <div className="destinations-map" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
                    <p>Map integration coming soon.</p>
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

export default Explore;
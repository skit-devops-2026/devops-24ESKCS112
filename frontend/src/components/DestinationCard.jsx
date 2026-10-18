import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaHeart } from 'react-icons/fa';

const DestinationCard = ({ data }) => {
  return (
    <div className="card dest-card">
      <div className="dest-card-img">
        <img src={data.image} alt={data.name} />
        <span className="dest-tag">{data.category}</span>
        <button type="button" className="wishlist-toggle">
          <FaHeart />
        </button>
      </div>
      <div className="dest-card-body">
        <div className="dest-card-top">
          <h3>{data.name}</h3>
          <span className="dest-rating"><FaStar className="star-filled" /> {data.rating.toFixed(1)}</span>
        </div>
        <p className="dest-meta"><FaClock /> {data.duration}</p>
        <div className="dest-card-footer">
          <p className="dest-price">₹{data.price.toLocaleString("en-IN")}<span>/person</span></p>
          <Link to={`/details?id=${data.id}`} className="dest-link-btn">View details</Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
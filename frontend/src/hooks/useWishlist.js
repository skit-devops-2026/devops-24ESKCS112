import { useState, useEffect } from 'react';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('travelx_wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const isExist = prev.includes(id);
      const newWishlist = isExist ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('travelx_wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  return { wishlist, toggleWishlist };
};
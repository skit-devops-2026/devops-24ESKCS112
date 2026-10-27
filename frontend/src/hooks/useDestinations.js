import { useState, useEffect } from 'react';
import defaultDestinations from '../data/destinations.json';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  // Load data on first render
  useEffect(() => {
    const saved = localStorage.getItem('travelx_destinations');
    if (saved) {
      setDestinations(JSON.parse(saved));
    } else {
      // Agar localstorage khali hai, toh default JSON load karo
      setDestinations(defaultDestinations);
      localStorage.setItem('travelx_destinations', JSON.stringify(defaultDestinations));
    }
  }, []);

  // CREATE
  const addDestination = (newDest) => {
    const updated = [...destinations, { ...newDest, id: Date.now().toString() }];
    setDestinations(updated);
    localStorage.setItem('travelx_destinations', JSON.stringify(updated));
  };

  // UPDATE
  const updateDestination = (id, updatedData) => {
    const updated = destinations.map(d => d.id === id ? { ...d, ...updatedData } : d);
    setDestinations(updated);
    localStorage.setItem('travelx_destinations', JSON.stringify(updated));
  };

  // DELETE
  const deleteDestination = (id) => {
    const updated = destinations.filter(d => d.id !== id);
    setDestinations(updated);
    localStorage.setItem('travelx_destinations', JSON.stringify(updated));
  };

  return { destinations, addDestination, updateDestination, deleteDestination };
};
import React, { useState, useEffect } from 'react';
import { getDistance } from 'geolib'; // For distance calculation
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Star icons for ratings
import './MapPage.css'; // You can style the page in a separate CSS file
import team1 from '../assets/team-1.jpg';
import team2 from '../assets/team-2.jpg';
import team3 from '../assets/team-3.jpg';
import team4 from '../assets/team-4.jpg';
import team5 from '../assets/team-5.jpg';
import team6 from '../assets/team-6.jpg';

// Example artisans data
const artisansData = [
  { id: 1, name: 'amal', lat: 51.515, lng: -0.09, rating: 4.5, photo: team1, profession: 'Electrician' },
  { id: 2, name: 'leila', lat: 51.507, lng: -0.08, rating: 5.0, photo: team3, profession: 'Electrician' },
  { id: 3, name: 'rachid', lat: 51.515, lng: -0.09, rating: 4.5, photo: team4, profession: 'Electrician' },
  { id: 4, name: 'salma', lat: 51.505, lng: -0.1, rating: 4.0, photo: team5, profession: 'Electrician' },
  { id: 5, name: 'mohamed', lat: 51.507, lng: -0.08, rating: 5.0, photo: team6, profession: 'Electrician' },
  { id: 6, name: 'yassin', lat: 51.507, lng: -0.08, rating: 5.0, photo: team2, profession: 'Electrician' }
];

const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [filteredArtisans, setFilteredArtisans] = useState([]);
  const [sortBy, setSortBy] = useState('proximity'); // Default to proximity filter
  const [isLocationSet, setIsLocationSet] = useState(false);

  // Set a default location (e.g., London)
  useEffect(() => {
    const defaultLocation = { lat: 51.5074, lng: -0.1278 }; // Example: London coordinates
    setUserLocation(defaultLocation);
    setIsLocationSet(true);
  }, []);

  // Filter artisans based on location and sorting
  useEffect(() => {
    if (userLocation) {
      let sortedArtisans = artisansData.map((artisan) => ({
        ...artisan,
        distance: getDistance(
          { latitude: userLocation.lat, longitude: userLocation.lng },
          { latitude: artisan.lat, longitude: artisan.lng }
        ),
      }));

      // Remove duplicates if there are any artisans with the same ID
      sortedArtisans = sortedArtisans.filter(
        (value, index, self) => index === self.findIndex((t) => t.id === value.id)
      );

      // Sort by the selected filter (proximity or rating)
      if (sortBy === 'proximity') {
        sortedArtisans.sort((a, b) => a.distance - b.distance);
      } else if (sortBy === 'rating') {
        sortedArtisans.sort((a, b) => b.rating - a.rating);
      }

      setFilteredArtisans(sortedArtisans);
    }
  }, [userLocation, sortBy]);

  // Function to display full, half, and empty stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star if the rating is 0.5 or more
    const emptyStars = 5 - fullStars - halfStar; // Empty stars to complete the 5-star system

    return (
      <>
        {Array(fullStars).fill().map((_, index) => (
          <FaStar key={`full-${index}`} color="#FF9800" size={20} />
        ))}
        {halfStar === 1 && <FaStarHalfAlt color="#FF9800" size={20} />}
        {Array(emptyStars).fill().map((_, index) => (
          <FaStar key={`empty-${index}`} color="#E0E0E0" size={20} />
        ))}
      </>
    );
  };

  return (
    <div className="map-container">
      {isLocationSet && (
        <div>
          {/* Filter buttons */}
          <div className="filter-buttons">
            <button
              className={`filter-button ${sortBy === 'proximity' ? 'active' : ''}`}
              onClick={() => setSortBy('proximity')}
            >
              Nearest
            </button>
            <button
              className={`filter-button ${sortBy === 'rating' ? 'active' : ''}`}
              onClick={() => setSortBy('rating')}
            >
              Most Qualified
            </button>
          </div>

          {/* Artisan Cards */}
          <div className="artisan-cards-container">
            {filteredArtisans.map((artisan) => (
              <div className="artisan-card" key={artisan.id}>
                <img src={artisan.photo} alt={artisan.name} className="artisan-photo" />
                <h3>{artisan.name}</h3>
                <p>Profession: {artisan.profession}</p>

                {/* Rating with Full, Half, and Empty Stars */}
                <div className="artisan-rating">
                  {renderStars(artisan.rating)}
                </div>

                <p>Distance: {Math.round(artisan.distance / 1000)} km</p>
                <button className="view-profile-button">View Profile</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;

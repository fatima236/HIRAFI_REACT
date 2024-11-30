import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css'; // Import du CSS de Leaflet

// Composant pour intégrer le contrôle de recherche
const SearchControl = () => {
  const map = useMap(); // Accès à l'instance de la carte via React-Leaflet

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: true,
      showPopup: true,
      marker: {
        draggable: false,
      },
      popupFormat: ({ query, result }) => `Recherche : ${query}<br>Résultat : ${result.label}`,
    });

    map.addControl(searchControl); // Ajout du contrôle à la carte

    return () => {
      map.removeControl(searchControl); // Nettoyage lors du démontage
    };
  }, [map]);

  return null; // Ce composant n'a pas besoin de retourner du JSX
};

// Composant principal
const MapPage = () => {
  return (
    <div id="map">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            Un marker d'exemple
          </Popup>
        </Marker>
        <SearchControl /> {/* Ajout du contrôle de recherche */}
      </MapContainer>
    </div>
  );
};

export default MapPage;

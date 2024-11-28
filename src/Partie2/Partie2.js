import React from 'react';
import './Partie2.css'; // Ajoutez ce fichier CSS pour le style

const Partie2 = () => {
  return (
    <div className="hero-section">
      <div className="text-container">
        <p className="subheading">Artisan Technique Au maroc</p>
        <h1>Artisan avec solution efficace et plus proche de vous</h1>
        <p className="description">
          Nous vous offrons une large communauté d'artisans marocains pour vous donner une solution rapide et efficace de trés bonne qualité et aussi nous tenons compte aux opportinutés d'emplois aux jeunes artisans diplomés pour nous rejoindre
        </p>
        <div className="dropdowns-container">
        <label>Type d'artisan:</label>
          <select className="dropdown">
            <option value="">Sélectionnez un type</option>
            <option value="mechanic">Mécanicien</option>
            <option value="plumber">Plombier</option>
            <option value="painter">Peintre</option>
            <option value="carpenter">Menuisier</option>
          </select>
          <label>Choisissez votre ville:</label>
          <select className="dropdown">
          
            <option value="">Sélectionnez une ville</option>
            <option value="oujda">Oujda</option>
            <option value="rabat">Rabat</option>
            <option value="casablanca">Casablanca</option>
            <option value="marrakech">Marrakech</option>
            <option value="fes">Fès</option>
          </select>
          <button className="search-button">
            <span className="search-icon">🔍</span> Rechercher
          </button>
        </div>
      </div>
      <div className="image-container">
        <img
          src="/techn.png"
          alt="Worker"
          className="hero-image"
        />
      </div>
    </div>
  );
};

export default Partie2;

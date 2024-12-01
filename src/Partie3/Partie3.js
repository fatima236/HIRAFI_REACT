import React, { useState } from 'react';
import './Partie3.css';
import { FaMicrophone, FaFileAlt, FaTimes, FaPlus } from 'react-icons/fa';

// Importation des images
import maconImage from '../assets/macon.jpg';
import menuisierImage from '../assets/menuisier.jpg';
import plombierImage from '../assets/plombe1.jpg';
import peintreImage from '../assets/paintre.jpg';

// Liste des services avec leurs titres, descriptions et images
const services = [
  {
    title: "Masonry",
    description: "Building walls, foundations, concrete work, and facade renovation.",
    imagePath: maconImage
  },
  {
    title: "Carpentry",
    description: "Window installation, furniture creation, stairs, and storage solutions.",
    imagePath: menuisierImage
  },
  {
    title: "Plumbing",
    description: "Plumbing systems, leak repairs, water heaters, and bathrooms.",
    imagePath: plombierImage
  },
  {
    title: "Painting",
    description: "Interior and exterior painting, wallpaper installation, and decorative coatings.",
    imagePath: peintreImage
  }
];

const Partie3 = () => {
  const [activeService, setActiveService] = useState(null); // Stocke le service actif
  const [audio, setAudio] = useState(false); // Contrôle l'affichage audio
  const [text, setText] = useState(false); // Contrôle l'affichage texte
  const [showIcons, setShowIcons] = useState(false); // Contrôle l'affichage des icônes de texte/audio/fermer

  const handleServiceClick = (index) => {
    setActiveService(index);
    setShowIcons(false); // Réinitialise les icônes au clic
    setAudio(false);
    setText(false);
  };

  const handleAddClick = (index) => {
    setActiveService(index);
    setShowIcons(!showIcons); // Affiche ou masque les icônes pour ce service
  };

  const handleAudioClick = () => {
    setAudio(true);
    setText(false); // Affiche uniquement audio
  };

  const handleTextClick = () => {
    setText(true);
    setAudio(false); // Affiche uniquement texte
  };

  const handleCloseClick = () => {
    setShowIcons(false); // Ferme les icônes
  };

  return (
    <div className="services-section">
      <div className="services-header">
        <h1>Our Services</h1>
        <h2>Click on a service to learn more</h2>
      </div>

      {/* Carousel des services */}
      <div className="services-carousel">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-card" 
            onClick={() => handleServiceClick(index)}
          >
            <img src={service.imagePath} alt={service.title} className="service-image" />
            <h3>{service.title}</h3>
            {/* Bouton + positionné sur chaque image */}
            <div onClick={() => handleAddClick(index)} className="add-icon">
              <FaPlus />
            </div>

            {showIcons && activeService === index && (
              <div className="icons">
                {/* Icône pour audio */}
                <div onClick={handleAudioClick} className="icon">
                  <FaMicrophone size={30} />
                  <p>Audio</p>
                </div>
                {/* Icône pour texte */}
                <div onClick={handleTextClick} className="icon">
                  <FaFileAlt size={30} />
                  <p>Text</p>
                </div>
                {/* Icône pour fermer */}
                <div onClick={handleCloseClick} className="icon">
                  <FaTimes size={30} />
                  <p>Close</p>
                </div>
              </div>
            )}

            {/* Détails du service */}
            {activeService === index && (
              <div className="service-content">
                {audio && <p>Audio description for {service.title}...</p>}
                {text && <p>{service.description}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Partie3;  /* Section des services */







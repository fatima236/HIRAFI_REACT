import React, { useState } from 'react';
import { FaUserCheck, FaTag, FaCog, FaLock, FaGlobe } from 'react-icons/fa';
import './Partie5.css';

const Partie5 = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const optionsTop = [
    { id: 'presence', label: 'Présence', icon: <FaUserCheck />, description: 'Artisans disponibles dans tout le territoire, Large réseau d’artisans qualifiés, Présents dans toutes les régions du Maroc, Services disponibles dans les grandes villes et zones rurales, Artisans certifiés couvrant tout le Maroc' },
    { id: 'transparency', label: 'Transparence', icon: <FaTag />, description: 'Tarifs avantageux, Facturation mensuelle sans engagement, Devis rapides et gratuits, Pas de frais cachés' },
    { id: 'service', label: 'Service', icon: <FaCog />, description: "Disponibilité 24/7 pour vos besoins en artisanat, Artisans bilingues pour mieux vous servir, Flexibilité et adaptabilité selon vos horaires, Prise de rendez-vous rapide et simplifiée, Services d’artisans disponibles dans toute la région, Accompagnement de A à Z pour votre projet" },
  ];

  const optionsBottom = [
    { id: 'security', label: 'Sécurité', icon: <FaLock />, description: "Intervention rapide et sécurisée, Suivi en temps réel de l'artisan, Localisation de l'artisan pour une meilleure communication, Partage de la position de l'artisan avec le client, Compétence et professionnalisme garantis, Équipe d’artisans de confiance spécialisés pour chaque besoin" },
    { id: 'national', label: 'National', icon: <FaGlobe />, description: "Partenaires d’artisanat de renommée mondiale, Artisans qualifiés pour des projets au Maroc, Savoir-faire artisanal exporté dans le monde entier" },
  ];

  return (
    <div className="partie5-container">
      <h1 className="title">Pourquoi Nous Choisir ?</h1>
      <div className="card-container">
        {optionsTop.map((option) => (
          <div
            key={option.id}
            className={`card ${selectedOption === option.id ? 'active' : ''}`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="icon">{option.icon}</div>
            <div className="label">{option.label}</div>
            {selectedOption === option.id && option.description && (
              <div className="details">
                {option.description.split(', ').map((item, index) => (
                  <div key={index} className="detail-item">✔ {item}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="card-container bottom">
        {optionsBottom.map((option) => (
          <div
            key={option.id}
            className={`card ${selectedOption === option.id ? 'active' : ''}`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="icon">{option.icon}</div>
            <div className="label">{option.label}</div>
            {selectedOption === option.id && option.description && (
              <div className="details">
                {option.description.split(', ').map((item, index) => (
                  <div key={index} className="detail-item">✔ {item}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partie5;

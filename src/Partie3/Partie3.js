import React, { useState } from 'react';
import './Partie3.css';
import { FaHammer, FaTractor, FaToolbox, FaPaintRoller, FaBolt, FaLeaf, FaDoorOpen, FaTree, FaFire, FaLock, FaBroom, FaTruckMoving } from 'react-icons/fa';

const services = [
  { title: "Maçonnerie", description: "Construction de murs, fondations, travaux de béton, rénovation de façades.", icon: <FaHammer /> },
  { title: "Menuiserie", description: "Pose de fenêtres, création de meubles, escaliers, aménagement de rangements.", icon: <FaToolbox /> },
  { title: "Charpenterie", description: "Charpentes de toiture, ossatures bois, restauration de charpentes.", icon: <FaTractor /> },
  { title: "Électricité", description: "Installation électrique, remise aux normes, éclairage, domotique.", icon: <FaBolt /> },
  { title: "Plomberie", description: "Installation de systèmes de plomberie, réparation de fuites, chauffe-eau, salles de bains.", icon: <FaToolbox /> },
  { title: "Peinture et Décoration", description: "Peinture intérieure et extérieure, pose de papier peint, enduits décoratifs.", icon: <FaPaintRoller /> },
  { title: "Revêtement de Sol", description: "Pose de carrelage, parquet, moquette et vinyle, béton ciré.", icon: <FaLeaf /> },
  { title: "Isolation", description: "Isolation thermique et acoustique, étanchéité à l'air et à l'eau.", icon: <FaDoorOpen /> },
  { title: "Ferronnerie et Soudure", description: "Création de portails et garde-corps, escaliers métalliques, soudure.", icon: <FaHammer /> },
  { title: "Paysagisme et Aménagement Extérieur", description: "Création de jardins, pose de clôtures, aménagement de terrasses.", icon: <FaTree /> },
  { title: "Chauffage et Climatisation", description: "Installation de systèmes de chauffage, climatisation, énergies renouvelables.", icon: <FaFire /> },
  { title: "Serrurerie et Sécurité", description: "Installation de serrures, blindage de portes, systèmes de sécurité.", icon: <FaLock /> },
  { title: "Entretien Général et Nettoyage", description: "Nettoyage haute pression, démoussage de toitures, nettoyage de fin de chantier.", icon: <FaBroom /> },
  { title: "Déménagement et Transport", description: "Emballage et transport de meubles, montage et démontage de meubles.", icon: <FaTruckMoving /> }
];

const Partie3 = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + itemsPerPage) % services.length);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      (prevIndex - itemsPerPage + services.length) % services.length
    );
  };

  return (
    <div className="services-section">
      <div className="services-header">
        <h1>NOS SERVICES</h1>
        <h2>Nous fournissons un service exclusif  <span>pour vous</span></h2>
        
      </div>
      <div className="services-carousel">
        {services.slice(startIndex, startIndex + itemsPerPage).map((service, index) => (
          <div className="service-card" key={index}>
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      <div className="carousel-buttons">
        <button onClick={handlePrev} className="carousel-button">«</button>
        <button onClick={handleNext} className="carousel-button">»</button>
      </div>
    </div>
  );
};

export default Partie3 ;

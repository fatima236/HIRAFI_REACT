import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import maconImage from '../assets/macon.jpg';
import menuisierImage from '../assets/menuisier.jpg';
import plombierImage from '../assets/plombe1.jpg';
import peintreImage from '../assets/paintre.jpg';
import nettoiImage from '../assets/nettoi.png';
import chaufImage from '../assets/chauff.png';
import elecImage from '../assets/elec.png';
import tranImage from '../assets/trans.png';
import './Partie3.css';

const Partie3 = () => {
  // Données des membres de l'équipe
  const teamMembers = [
    { name: "Maçonnerie", role: "Construction de murs, fondations, travaux de béton, rénovation de façades.", image: maconImage },
    { name: "Menuiserie", role: "Pose de fenêtres, création de meubles, escaliers, aménagement de rangements.", image: menuisierImage },
    { name: "Plomberie", role: "Installation de systèmes de plomberie, réparation de fuites, chauffe-eau, salles de bains.", image: plombierImage },
    { name: "Peinture", role: "Peinture intérieure et extérieure, pose de papier peint, enduits décoratifs.", image: peintreImage },
    { name: "Entretien Général et Nettoyage", role: "Nettoyage haute pression, démoussage de toitures, nettoyage de fin de chantier.", image: nettoiImage },
    { name: "Chauffage et Climatisation", role: "Installation de systèmes de chauffage, climatisation, énergies renouvelables.", image: chaufImage },
    { name: "Électricité", role: "Installation électrique, remise aux normes, éclairage, domotique.", image: elecImage },
    { name: "Déménagement et Transport", role: "Emballage et transport de meubles, montage et démontage de meubles.", image: tranImage },
  ];

  // État pour gérer la carte sélectionnée
  const [selectedCard, setSelectedCard] = useState(null);

  // Fonction pour gérer le clic sur une carte
  const handleCardClick = (index) => {
    // Si la carte est déjà sélectionnée, la désélectionner, sinon la sélectionner
    setSelectedCard(selectedCard === index ? null : index);
  };

  // Configuration du carousel
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    customPaging: (i) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#333", // Couleur des points
          border: "2px solid #fff", // Bordure blanche
          margin: "0 5px",
          cursor: "pointer",
          transition: "background-color 0.3s, transform 0.3s",
        }}
      ></div>
    ),
    appendDots: (dots) => (
      <div
        style={{
          bottom: "-40px",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ display: "flex", padding: "0", margin: "0" }}>{dots.slice(0, 2)}</ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Styles inline pour les cartes
  const styles = {
    section: {
      padding: "2rem",
      textAlign: "center",
      backgroundColor: "#f9f9f9",
      position: "relative",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "2rem",
      color:"#333"
    },
    cardWrapper: {
      padding: "0 15px",
      boxSizing: "border-box",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "transform 0.3s, box-shadow 0.3s",
      margin: "0 15px",
      cursor: "pointer",
    },
    cardSelected: {
      backgroundColor: "#f39c12",
      border: "2px solid #f39c12",
    },
    image: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
    },
    content: {
      padding: "1rem",
      textAlign: "center",
    },
    name: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    role: {
      color: "#f39c12",
      fontSize: "1rem",
    },
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.title} class="two">
        NOS <span >SERVICES</span>
      </h2>
      <h3 class="one">Nous fournissons un service exclusif  <span style={{ color: "#f39c12" }}>pour vous</span></h3>
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <div key={index} style={styles.cardWrapper}>
            <div
              className="team-card"
              style={{
                ...styles.card,
                ...(selectedCard === index ? styles.cardSelected : {}),
              }}
              onClick={() => handleCardClick(index)} // Gérer le clic sur la carte
            >
              <img src={member.image} alt={member.name} style={styles.image} />
              <div style={styles.content}>
                <h3 style={styles.name}>{member.name}</h3>
                <p style={styles.role}>{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Partie3;

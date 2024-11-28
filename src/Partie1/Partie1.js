import React from "react";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

const Partie1 = () => {
  const iconStyle = {
    color: "#FFB400", // Jaune foncé/orangé
    fontSize: "20px",
    margin: "0 10px", // Margin uniquement entre les icônes
    transition: "color 0.3s ease",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        backgroundColor: "#000000", // Noir
        color: "white",
        padding: "13px 0", // Aucune marge latérale
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        width: "100%", // Largeur de 100% de la fenêtre
        boxSizing: "border-box", // Assure que le padding est inclus dans la largeur
      }}
    >
      {/* Section d'information */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaMapMarkerAlt style={iconStyle} />
          <span style={{ fontSize: "14px" }}>Morocco</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaEnvelope style={iconStyle} />
          <span style={{ fontSize: "14px" }}>Hirafi.com</span>
        </div>
      </div>

      {/* Section des icônes sociales */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "14px" }}></span>
        <FaFacebook
          style={iconStyle}
          onMouseEnter={(e) => (e.target.style.color = "#4267B2")} // Couleur Facebook au survol
          onMouseLeave={(e) => (e.target.style.color = "#FFB400")}
        />
        <FaTwitter
          style={iconStyle}
          onMouseEnter={(e) => (e.target.style.color = "#1DA1F2")} // Couleur Twitter au survol
          onMouseLeave={(e) => (e.target.style.color = "#FFB400")}
        />
        <FaLinkedin
          style={iconStyle}
          onMouseEnter={(e) => (e.target.style.color = "#0077B5")} // Couleur LinkedIn au survol
          onMouseLeave={(e) => (e.target.style.color = "#FFB400")}
        />
        <FaInstagram
          style={iconStyle}
          onMouseEnter={(e) => (e.target.style.color = "#E1306C")} // Couleur Instagram au survol
          onMouseLeave={(e) => (e.target.style.color = "#FFB400")}
        />
        <FaYoutube
          style={iconStyle}
          onMouseEnter={(e) => (e.target.style.color = "#FF0000")} // Couleur YouTube au survol
          onMouseLeave={(e) => (e.target.style.color = "#FFB400")}
        />
      </div>
    </div>
  );
};

export default Partie1;

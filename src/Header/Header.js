import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const menuStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333333",
    textDecoration: "none",
    margin: "0 15px",
    cursor: "pointer",
    transition: "color 0.3s ease",
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF", // Fond blanc
        padding: "15px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Ajoute une ombre subtile
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#FFB400", // Couleur principale pour le logo
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "24px" }}>HIRAFI</span>
        </div>
      </div>

      {/* Menu */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <a href="#Accueil" style={menuStyle}>
          Accueil
        </a>
        <a href="#Services" style={menuStyle}>
          Services
        </a>
        <a href="#A Propos" style={menuStyle}>
          à propos de nous
        </a>
        <a href="#Artisans" style={menuStyle}>
          Artisans
        </a>
        <a href="#Contact" style={menuStyle}>
          Contact
        </a>
      </div>

      {/* Search, Cart, and Login */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* Search Icon */}
        <div
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: "#F5F5F5", // Cercle de recherche
            cursor: "pointer",
          }}
        >
          <FaSearch style={{ fontSize: "18px", color: "#FFB400" }} />
        </div>

        {/* Cart Icon */}
        <div
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: "#F5F5F5",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <FaShoppingCart style={{ fontSize: "18px", color: "#FFB400" }} />
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "#FF6B6B",
              color: "#FFFFFF",
              borderRadius: "50%",
              fontSize: "12px",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            5
          </span>
        </div>

        {/* Login Button */}
        <button
          style={{
            backgroundColor: "#FFB400"  , // Couleur principale
            color: "#333",
            padding: "10px 20px",
            border: "none",
            borderRadius: "29px",
            fontSize: "14px",
            fontWeight: "650",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#FFB400")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#FFB400")}
        >
          se connecter
        </button>
      </div>
    </div>
  );
};

export default Header;

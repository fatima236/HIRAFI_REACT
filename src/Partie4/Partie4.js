import React from "react";
import "./Partie4.css";

const Partie4 = () => {
  return (
    <div className="it-solution-container">
      <div className="it-solution-content">
        <p className="subheading">à Propos de nous</p>
        <h1>
        Solutions pour tous  <br />
          <span className="highlight">les problèmes de réparation</span>
        </h1>
        <p>
          Répondre facilement à vos besins à travers notre communauté d'expertise des artisans
        </p>
        <ul className="it-solution-features">
          <li>✅ Solutions simples et efficaces </li>
          <li>✅ Équipe d'experts Membres</li>
          <li>✅ Assistance 24/7</li>
        </ul>
        <button className="discover-btn">En savoir plus →</button>
      </div>
      <div className="it-solution-images">
        <div className="image-main">
          <div className="image-inner image-1"></div>
          <div className="image-inner image-2"></div>
        </div>
        <div className="image-side image-3"></div>
      </div>
    </div>
  );
};

export default Partie4;

import React from "react";
import "./Partie4.css";

const Partie4 = () => {
  return (
    <section className="it-solution-section">
      <div className="it-solution-content">
        <p className="subheading">À propos de nous</p>
        <h1>
          Solutions pour tous <br />
          <span className="highlight">les problèmes de réparation</span>
        </h1>
        <p>
          Répondre facilement à vos besoins à travers notre communauté d'expertise des artisans.
        </p>
        <ul className="it-solution-features">
          <li>✅ Solutions simples et efficaces</li>
          <li>✅ Équipe d'experts membres</li>
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
    </section>
  );
};

export default Partie4;

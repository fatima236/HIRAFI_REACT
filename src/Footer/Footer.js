// Footer.js
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Company Section */}
        <div className="footer-section ">
          
          <h3>HIRAFI</h3>
          <p>
          Avec HIRAFI, l’artisanat est mis en lumière et le client bénéficie d’un service sur mesure, de confiance et de qualité.HIRAFI permet aux artisans de se faire connaître et de mettre en avant leurs compétences, tandis que les clients peuvent facilement trouver des professionnels compétents pour répondre à leurs besoins spécifiques. 
          </p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-whatsapp"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h3>Navigation</h3>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">à propos de nous</a></li>
            <li><a href="#">Artisan</a></li>
            <li><a href="#">Contact</a></li>
            
          </ul>
        </div>

        {/* IT Services Section */}
        <div className="footer-section services">
          <h3> SERVICES</h3>
          <ul>
            <li><a href="#">Mécanicien</a></li>
            <li><a href="#">Plombier</a></li>
            <li><a href="#">Technicien de différent Domaine</a></li>
            <li><a href="#">Artisan Zelig Marocain</a></li>
            
          </ul>
        </div>

        {/* Recent Posts Section */}
        <div className="footer-section posts">
          <h3>RECENT POSTS</h3>
          <div className="post">
            <img src="/2028.png" alt="Post 1" />
            <div>
              <p>Réparation et Entretien du voiture.</p>
              <span>21 Octobre 2024</span>
            </div>
          </div>
          <div className="post">
            <img src="/2020.png" alt="Post 2" />
            <div>
              <p>Cablage et Electricité.</p>
              <span>22 Octobre 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>Copyright © 2024 HIRAFI. All Rights Reserved.</p>
        <p>
          <a href="#">Terms & Condition</a> | <a href="#">Careers</a> | <a href="#">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

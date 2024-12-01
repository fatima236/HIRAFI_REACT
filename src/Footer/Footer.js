import React from "react";
import "./Footer.css";
import image from '../assets/2028.png';
import images from '../assets/2020.png';


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
            <a href="#https://github.com/jojojaeger/whisper-streamlit"><i className="fab fa-facebook-f"></i></a>
            <a href="#https://github.com/MoroccoAI/2023-GenAI-Hackathon"><i className="fab fa-twitter"></i></a>
            <a href="#https://techbenextjs.vercel.app/?storefront=envato-elements"><i className="fab fa-linkedin-in"></i></a>
            <a href="#https://vm.tiktok.com/ZMh7DRWmM/"><i className="fab fa-whatsapp"></i></a>
            <a href="#https://youtu.be/f9fdH5k5uwI?si=7SLc3klSfj9DZ8DG"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h3>Navigation</h3>
          <ul>
            <li><a href="#https://davis-html.netlify.app/index1">Accueil</a></li>
            <li><a href="#https://html.themeholy.com/webteck/demo/index.html">Services</a></li>
            <li><a href="#https://edirprestige.ma/?fbclid=PAZXh0bgNhZW0CMTEAAaaUjpulAHOPpSFQZVi2QKO6_OVhR0LJPlAUMD9BRVnVTulqZZlxmE-R1cU_aem_lPeeHfJDKIIvFOVNTQmlpg">à propos de nous</a></li>
            <li><a href="#https://www.instagram.com/reel/DBdfcvYo8oo/?igsh=MWh6emRkcndrZnZnNw==">Artisan</a></li>
            <li><a href="#https://youtu.be/D0mk_tx_qtM?si=3ZJY7r1rTWl9JAU0">Contact</a></li>
            
          </ul>
        </div>

        {/* IT Services Section */}
        <div className="footer-section services">
          <h3> SERVICES</h3>
          <ul>
            <li><a href="#https://youtu.be/D0mk_tx_qtM?si=3ZJY7r1rTWl9JAU0">Mécanicien</a></li>
            <li><a href="#https://www.instagram.com/reel/DBdfcvYo8oo/?igsh=MWh6emRkcndrZnZnNw==">Plombier</a></li>
            <li><a href="#https://edirprestige.ma/?fbclid=PAZXh0bgNhZW0CMTEAAaaUjpulAHOPpSFQZVi2QKO6_OVhR0LJPlAUMD9BRVnVTulqZZlxmE-R1cU_aem_lPeeHfJDKIIvFOVNTQmlpg">Technicien de différent Domaine</a></li>
            <li><a href="#https://davis-html.netlify.app/index1">Artisan Zelig Marocain</a></li>
            
          </ul>
        </div>

        {/* Recent Posts Section */}
        <div className="footer-section posts">
          <h3>RECENT POSTS</h3>
          <div className="post">
            <img src={image} alt="Post 1" />
            <div>
              <p>Réparation et Entretien du voiture.</p>
              <span>21 Octobre 2024</span>
            </div>
          </div>
          <div className="post">
            <img src={images} alt="Post 2" />
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
          <a href="#https://youtu.be/f9fdH5k5uwI?si=7SLc3klSfj9DZ8DG">Terms & Condition</a> | <a href="#https://www.oriano.dev/jsa/0b3rdyfg63y/cours">Careers</a> | <a href="#https://youtu.be/f9fdH5k5uwI?si=7SLc3klSfj9DZ8DG">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;






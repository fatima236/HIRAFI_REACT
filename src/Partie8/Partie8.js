import React from "react";
import "./Partie8.css";
import { FaUser, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa"; 
import { MdOutlineSubject } from "react-icons/md";

const Partie8 = () => {
  return (
    <div className="contact-form-container">
      <div className="contact-header">
        <h5>📩 Contactez Nous</h5>
        <h1>Have Any Questions?</h1>
        <p>
          Enthusiastically disintermediate one-to-one leadership via business e-commerce. 
          Dramatically reintermediate compelling process improvements rather than empowered relationships.
        </p>
      </div>
      <form className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <FaUser className="icon" />
            <input type="text" placeholder=" Nom Complet" />
          </div>
          <div className="form-group">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="adresse Email " />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <MdOutlineSubject className="icon" />
            <select>
              <option>ville</option>
              <option> Oujda </option>
              <option>Fes</option>
              <option>Rabat</option>
              <option>Casablanca</option>
              <option>Tanger</option>
              <option>Nador</option>

            </select>
          </div>
          <div className="form-group">
            <FaPhone className="icon" />
            <input type="text" placeholder=" Numéro de téléphone" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group message-group">
            <FaCommentDots className="icon" />
            <textarea placeholder="votre Message"></textarea>
          </div>
        </div>
        <div className="form-row">
          <button type="submit" className="submit-btn">
            Envoyez  →
          </button>
        </div>
      </form>
    </div>
  );
};

export default Partie8;

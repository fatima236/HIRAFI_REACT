import React from "react";
import "./Contact.css";

const ContactForm = () => {
  return (
    <div id="Contact" className="form-wrapper">
      <div className="form-header">
        <h5>📩 Contactez Nous</h5>
        <h1>Besoin d'aide ?</h1>
        <p>
          Remplissez ce formulaire pour nous contacter. Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
      <form className="contact-form">
        <div className="form-row">
          <input type="text" placeholder="Nom Complet" />
          <input type="email" placeholder="Adresse Email" />
        </div>
        <div className="form-row">
          <select>
            <option>Ville</option>
            <option>Oujda</option>
            <option>Fes</option>
            <option>Rabat</option>
            <option>Casablanca</option>
            <option>Tanger</option>
            <option>Nador</option>
          </select>
          <input type="tel" placeholder="Numéro de téléphone" />
        </div>
        <div className="form-row">
          <textarea placeholder="Votre message"></textarea>
        </div>
        <button type="submit">Envoyer →</button>
      </form>
    </div>
  );
};

export default ContactForm;

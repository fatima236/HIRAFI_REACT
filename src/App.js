import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssistantUI from "./AssistantUI";
import Recherche from './Recherche/Recherche';
import Header from './Header/Header';
import Accueil from './Acceuil/Acceuil';
import Services from './Services/Services';
import Partie4 from './A propos/A Propos';
import Partie5 from './Pourquoi nous choisir/Pourquoi nous choisir';
import Partie6 from './Partie6/Partie6';
import Partie7 from './Partie7/Partie7';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import MapPage from './MapPage/MapPage';
import Chatbot from './Chatbot'; // Import the Chatbot

const App = () => {
  const [question, setQuestion] = useState("Bienvenue sur Hirafi ! Voulez-vous vous inscrire ?");

  return (
    <Router>
      <div>
        {/* Common site sections */}
        <Recherche />
        <Header />

        {/* Main Routes */}
        <Routes>
          <Route path="/" element={
            <>
              <Accueil />
              <Services />
              <Partie4 />
              <Partie5 />
              <Partie6 />
              <Partie7 />
              <Contact />
              <Footer />
            </>
          } />

          <Route path="/map" element={<MapPage />} />

          {/* Route for the Form page */}
          <Route path="/formulaire" element={<AssistantUI question={question} setQuestion={setQuestion} />} />
        </Routes>

        {/* Global Chatbot */}
        <Chatbot /> {/* This will be available on all pages */}
      </div>
    </Router>
  );
};

export default App;

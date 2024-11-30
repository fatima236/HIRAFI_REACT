import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssistantUI from "./AssistantUI";
import FormPage from "./FormPage";
import Partie1 from './Partie1/Partie1';
import Header from './Header/Header';
import Partie2 from './Partie2/Partie2';
import Partie3 from './Partie3/Partie3';
import Partie4 from './Partie4/Partie4';
import Partie5 from './Partie5/Partie5';
import Partie6 from './Partie6/Partie6';
import Partie7 from './Partie7/Partie7';
import Partie8 from './Partie8/Partie8';
import Footer from './Footer/Footer';
import MapPage from './MapPage/MapPage';

const App = () => {
  const [question, setQuestion] = useState("Bienvenue sur Hirafi ! Voulez-vous vous inscrire ?");

  return (
    <Router>
      <div>
        <Partie1 />
        <Header />
        <Routes>
          
          <Route path="/" element={<Partie2 />} />

          {/* Route pour MapPage */}
          <Route path="/map" element={<MapPage />} />
        </Routes>

        <Partie3 />
        <Partie4 />
        <Partie5 />
        <Routes>
           <Route path="/" element={<Partie6 />} />


          <Route path="/formulaire" element={<AssistantUI />} />
        </Routes>
        <Partie7 />
        <Partie8 />
        <Footer />

        {/* Routes */}
        <Routes>
          {/* Page principale avec l'assistant */}
          <Route path="/" element={<AssistantUI question={question} setQuestion={setQuestion} />} />

          {/* Deuxième page avec le formulaire */}
          <Route path="/formulaire" element={<FormPage />} />
          
          {/* Route pour Partie2 (changer le chemin) */}
          <Route path="/" element={<Partie2 />} />

          {/* Route pour MapPage */}
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

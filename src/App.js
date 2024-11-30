import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssistantUI from "./AssistantUI";
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
import Chatbot from './Chatbot'; // Import the Chatbot

const App = () => {
  const [question, setQuestion] = useState("Bienvenue sur Hirafi ! Voulez-vous vous inscrire ?");

  return (
    <Router>
      <div>
        {/* Common site sections */}
        <Partie1 />
        <Header />

        {/* Main Routes */}
        <Routes>
          <Route path="/" element={
            <>
              <Partie2 />
              <Partie3 />
              <Partie4 />
              <Partie5 />
              <Partie6 />
              <Partie7 />
              <Partie8 />
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

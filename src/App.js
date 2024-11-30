import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssistantUI from "./AssistantUI";
import FormPage from "./FormPage";

const App = () => {
  const [question, setQuestion] = useState("Bienvenue sur Hirafi ! Voulez-vous vous inscrire ?");

  return (
    <Router>
      <Routes>
        {/* Page principale avec l'assistant */}
        <Route path="/" element={<AssistantUI question={question} setQuestion={setQuestion} />} />
        
        {/* Deuxième page avec le formulaire */}
        <Route path="/formulaire" element={<FormPage />} />
      </Routes>
    </Router>
  );
};

export default App;



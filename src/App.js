import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssistantUI from "./AssistantUI";

const ConfirmationPage = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>Merci pour votre inscription !</h1>
    <p>Votre formulaire est terminé.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AssistantUI />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
} from "@mui/material";

const FormPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = () => {
    // Validation simple
    if (!name || !email) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    // Réinitialisation et succès
    setSuccessMessage("Formulaire envoyé avec succès !");
    setError("");
    setName("");
    setEmail("");

    // Simulation de l'envoi du formulaire (remplace par un appel API si nécessaire)
    console.log("Données du formulaire :", { name, email });
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "30px",
        marginTop: "50px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold", color: "#333" }}
      >
        Formulaire d'inscription
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <TextField
          label="Nom"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Envoyer
        </Button>
      </Box>

      {/* Notification pour les erreurs */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
        message={error}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />

      {/* Notification pour les succès */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Container>
  );
};

export default FormPage;

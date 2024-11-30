import React, { useState, useRef } from "react";
import {
  Button,
  IconButton,
  CircularProgress,
  Typography,
  Box,
  LinearProgress,
  TextField,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { IoSend } from "react-icons/io5";
import { yellow, green, red } from "@mui/material/colors";

const AssistantUI = ({ question, setQuestion }) => {
  const [response, setResponse] = useState(""); // Réponse de l'utilisateur
  const [isRecording, setIsRecording] = useState(false); // Statut de l'enregistrement
  const [audioBlob, setAudioBlob] = useState(null); // Audio blob
  const [audioStatus, setAudioStatus] = useState(""); // Statut de l'audio
  const [error, setError] = useState(""); // Erreur
  const [message, setMessage] = useState(""); // Message texte
  const [isSending, setIsSending] = useState(false); // Indicateur d'envoi
  const [step, setStep] = useState(0); // Suivi de l'étape (formulaire)
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Liste des questions et les champs correspondants
  const questions = [
    { question: "Souhaitez-vous vous inscrire ?", field: "inscription" },
    { question: "Quel est votre nom ?", field: "nom" },
    { question: "Quel est votre prénom ?", field: "prenom" },
    { question: "Dans quelle ville résidez-vous ?", field: "ville" },
    { question: "Quel est votre numéro de téléphone ?", field: "telephone" },
    { question: "Quel est votre métier ?", field: "metier" },
    { question: "Quelle est votre adresse email ?", field: "email" },
  ];

  const [formData, setFormData] = useState({
    inscription: "",
    nom: "",
    prenom: "",
    ville: "",
    telephone: "",
    metier: "",
    email: "",
  });

  // Fonction pour gérer l'enregistrement audio
  const handleAudioResponse = async () => {
    if (!isRecording) {
      // Démarrer l'enregistrement
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = []; // Réinitialiser les morceaux d'audio
        recorder.start();
        setIsRecording(true);
        setAudioStatus("Enregistrement en cours...");

        recorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
          setAudioBlob(audioBlob);
          setIsRecording(false); // Arrêter l'enregistrement
          setAudioStatus("Enregistrement terminé, envoi en cours...");

          // Envoyer l'audio au serveur pour transcription
          const formData = new FormData();
          formData.append("audio", audioBlob, "audio.wav");

          setIsSending(true); // Indiquer que l'envoi est en cours
          try {
            const res = await fetch("http://localhost:5000/transcribe", {
              method: "POST",
              body: formData,
            });
            const data = await res.json();
            if (data.transcription) {
              const filteredResponse = filterResponse(data.transcription);
              setResponse(filteredResponse);
              setAudioStatus("Audio envoyé et transcrit avec succès !");
            } else {
              setError("La transcription a échoué.");
              setAudioStatus("Erreur lors de l'envoi de l'audio.");
            }
          } catch (err) {
            setError("Erreur lors de l'envoi de l'audio.");
            setAudioStatus("Erreur lors de l'envoi de l'audio.");
          } finally {
            setIsSending(false); // Terminer l'envoi
          }
        };
      } catch (err) {
        setError("Erreur lors de l'accès au microphone.");
        setAudioStatus("Erreur d'enregistrement.");
      }
    } else {
      // Arrêter l'enregistrement si déjà en cours
      mediaRecorderRef.current.stop();
    }
  };

  // Fonction pour filtrer la réponse et ne garder que le mot clé
  const filterResponse = (response) => {
    // Utiliser des expressions régulières pour extraire des mots clés (ici, on suppose que les réponses sont les derniers mots mentionnés)
    const words = response.split(" ");
    const lastWord = words[words.length - 1];
    return lastWord; // Retourner seulement le dernier mot comme réponse
  };

  // Fonction pour passer à l'étape suivante
  const nextStep = () => {
    if (step < questions.length - 1) {
      // Valider la réponse avant de passer à l'étape suivante
      if (response.trim() === "" && message.trim() === "") {
        setError("La réponse ne peut pas être vide.");
        return;
      }

      // Mise à jour de formData avec la réponse
      const currentField = questions[step].field;
      const currentResponse = response.trim() || message.trim();
      setFormData({ ...formData, [currentField]: currentResponse });

      setStep(step + 1);
      setResponse(""); // Réinitialiser la réponse pour la nouvelle question
      setMessage(""); // Réinitialiser le message texte
      setError(""); // Réinitialiser l'erreur
    }
  };

  // Fonction pour envoyer le message texte
  const handleTextMessage = async () => {
    if (message.trim() === "" && response.trim() === "") {
      setError("Le message ne peut pas être vide.");
      return;
    }

    setIsSending(true);
    setAudioStatus("Envoi du message texte...");
    // Simuler l'envoi du message texte au serveur ou autre logique
    setTimeout(() => {
      setResponse(message || response); // Prendre la réponse audio ou texte
      setIsSending(false);
      setAudioStatus("Message envoyé avec succès !");
      setMessage(""); // Réinitialiser le champ de texte
      nextStep(); // Passer à l'étape suivante
    }, 2000);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #ffae00, #fff)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "30px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: "bold", color: "#333" }}>
          Assistant Hirafi
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {questions[step].question} {/* Afficher la question actuelle */}
        </Typography>

        {/* Input pour le message texte ou audio */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <TextField
            label="Réponse"
            variant="outlined"
            fullWidth
            value={message || response}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSending || isRecording}
            style={{ marginRight: "10px" }}
          />

          {/* Icone du Microphone */}
          <IconButton
            onClick={handleAudioResponse}
            color={isRecording ? "secondary" : "primary"}
            size="large"
            style={{ backgroundColor: yellow[700], borderRadius: "50%" }}
          >
            {isRecording ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              <MicIcon style={{ fontSize: 40 }} />
            )}
          </IconButton>
        </Box>

        {/* Bouton pour envoyer le message texte */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTextMessage}
            disabled={isSending || isRecording}
            startIcon={<IoSend />}
          >
            Envoyer
          </Button>
        </Box>

        {/* Afficher le statut de l'envoi */}
        {isSending && (
          <Box mb={3}>
            <LinearProgress color="primary" />
            <Typography variant="body2" align="center" color="textSecondary">
              Envoi en cours...
            </Typography>
          </Box>
        )}

        {/* Affichage du statut audio */}
        <Box>
          <Typography variant="h6" align="center" style={{ marginBottom: "15px" }}>
            {audioStatus}
          </Typography>

          <Typography
            variant="body1"
            align="center"
            style={{
              marginTop: "20px",
              color: error ? red[500] : green[500],
              fontWeight: "bold",
            }}
          >
            {error && error}
          </Typography>

          <Typography
            variant="body1"
            align="center"
            style={{
              marginTop: "20px",
              color: green[500],
              fontWeight: "bold",
            }}
          >
           {response && `Réponse : ${response}`}

          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default AssistantUI;
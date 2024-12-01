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
  const [response, setResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioStatus, setAudioStatus] = useState(""); // Déclaration de l'état audioStatus
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Message texte
  const [isSending, setIsSending] = useState(false); // Indicateur d'envoi
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
            const res = await fetch("http://localhost:5000/transcibe", {
              method: "POST",
              body: formData,
            });
            const data = await res.json();
            if (data.transcription) {
              setResponse(data.transcription);
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

  // Fonction pour envoyer le message texte
  const handleTextMessage = async () => {
    if (message.trim() === "") {
      setError("Le message ne peut pas être vide.");
      return;
    }
    setIsSending(true);
    setAudioStatus("Envoi du message texte...");
    // Simuler l'envoi du message texte au serveur ou autre logique
    setTimeout(() => {
      setResponse(message);
      setIsSending(false);
      setAudioStatus("Message envoyé avec succès !");
      setMessage(""); // Réinitialiser le champ de texte
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
          {question}
        </Typography>

        {/* Input pour le message texte ou audio */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            value={message}
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
            startIcon={<IoSend />}
            fullWidth
            disabled={isSending || isRecording || !message}
          >
            Envoyer le message
          </Button>
        </Box>

        {/* Affichage de l'état d'envoi */}
        {isSending && (
          <Box mb={3}>
            <LinearProgress color="primary" />
            <Typography variant="body2" align="center" color="textSecondary">
              Envoi en cours...
            </Typography>
          </Box>
        )}

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

          {/* Affichage du lecteur audio si l'audioBlob est disponible */}
          {audioBlob && (
            <Box mt={3} display="flex" justifyContent="center">
              <audio controls>
                <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default AssistantUI;

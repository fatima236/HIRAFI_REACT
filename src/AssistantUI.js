import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { FaRobot } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { yellow, grey } from "@mui/material/colors";
import './styles.css';

const AssistantUI = () => {
  const [question, setQuestion] = useState("Bienvenue sur Hirafi ! Voulez-vous vous inscrire ?");
  const [response, setResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [robotAnimationKey, setRobotAnimationKey] = useState(0);

  const handleResponse = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      });
      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else if (data.question) {
        setQuestion(data.question);
        setResponse("");
      } else if (data.message) {
        alert(data.message);
        setQuestion("Le formulaire est terminé. Merci !");
      }
    } catch (err) {
      console.error("Erreur :", err);
      alert("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const readQuestion = () => {
    setIsSpeaking(true);
    setRobotAnimationKey((prevKey) => prevKey + 1);
    setIsLoading(true);
    fetch("http://localhost:5000/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })
      .then(() => {
        setIsSpeaking(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la lecture de la question :", err);
        alert("Erreur de lecture.");
        setIsSpeaking(false);
        setIsLoading(false);
      });
  };

  const handleAudioResponse = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("La reconnaissance vocale n'est pas prise en charge sur ce navigateur.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.start();
    setIsRecording(true);

    recognition.onresult = (event) => {
      setResponse(event.results[0][0].transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      alert("Erreur lors de la reconnaissance vocale.");
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
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
      <Container
        maxWidth="sm"
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "30px",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ fontWeight: "bold", color: "#333" }}
        >
          Assistant Hirafi
        </Typography>
        <Box
          my={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h6"
            style={{ marginRight: "15px", flex: 1, color: grey[800] }}
          >
            {question}
          </Typography>
          <IconButton
            onClick={readQuestion}
            color="primary"
            disabled={isSpeaking || isLoading}
          >
            {isLoading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              <FaRobot
                key={robotAnimationKey}
                size={40}
                color={yellow[700]}
                className={isSpeaking ? "speaking-animation" : ""}
              />
            )}
          </IconButton>
        </Box>
        <TextField
          label="Votre réponse"
          variant="outlined"
          fullWidth
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          style={{
            marginBottom: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleAudioResponse}
                  color={isRecording ? "secondary" : "default"}
                  disabled={isRecording || isSpeaking}
                >
                  <MicIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleResponse}
          style={{
            marginTop: "20px",
            backgroundColor: "#333",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            padding: "12px",
          }}
          disabled={isLoading}
          endIcon={<IoSend />}
        >
          {isLoading ? "En cours..." : "Suivant"}
        </Button>
      </Container>
    </div>
  );
};

export default AssistantUI;

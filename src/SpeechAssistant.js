import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechAssistant = () => {
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState([]);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && !listening) {
      handleResponse(transcript);  // Lorsque la réponse est détectée, l'envoyer au serveur
    }
  }, [transcript, listening]);

  // Fonction pour démarrer la conversation
  const startConversation = async () => {
    const response = await fetch('http://localhost:5000/start'); // Assurez-vous que le port est correct
    const data = await response.json();
    setQuestion(data.question);

    // Lancer la lecture vocale du texte de la question
    speakText(data.question);
  };

  // Fonction pour gérer la réponse de l'utilisateur
  const handleResponse = async (userResponse) => {
    const response = await fetch('http://localhost:5000/respond', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response: userResponse }),
    });
    const data = await response.json();
  
    if (data.question) {
      setQuestion(data.question);
      speakText(data.question);  // Read the next question aloud
    } else if (data.message) {
      alert(data.message);
      setQuestion('');
    }
  
    // Example of validation and spelling prompt
    const expectedAnswer = 'example'; // Replace with your expected answer logic
    if (userResponse.toLowerCase() !== expectedAnswer.toLowerCase()) {
      speakText("Désolé, je n'ai pas bien compris. Pouvez-vous épeler cela lettre par lettre?");
      askToSpell(expectedAnswer); // Ask the user to spell out the expected answer
    }
  };
  
  // Fonction pour lire un texte à haute voix
  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'fr-FR';  // Langue française
    window.speechSynthesis.speak(speech);
  };
  const askToSpell = (word) => {
    const letters = word.split('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < letters.length) {
        speakText(`Dites la lettre ${letters[i].toUpperCase()}`);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };
  
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'fr-FR' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Assistant Hirafi</h1>
      {question && <p>{question}</p>}
      <div>
        <button onClick={startConversation}>Commencer</button>
        <button onClick={startListening} disabled={listening}>
          {listening ? 'Écoute en cours...' : 'Démarrer la reconnaissance vocale'}
        </button>
        <button onClick={stopListening}>Arrêter</button>
      </div>
      <div>
        <h2>Réponse:</h2>
        <p>{transcript}</p> {/* Afficher la réponse textuelle */}
      </div>
      <ul>
        {responses.map((response, index) => (
          <li key={index}>{response}</li>
        ))}
      </ul>
    </div>
  );
};

export default SpeechAssistant;

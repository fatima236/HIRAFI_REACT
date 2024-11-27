const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'fr-FR';  // Set to French or your desired language
    window.speechSynthesis.speak(speech);
  };
  
  const validateResponse = (userResponse, expectedResponse) => {
    if (userResponse.toLowerCase() === expectedResponse.toLowerCase()) {
      speakText("Correct! Passons à la question suivante.");
      // Move to next question
    } else {
      speakText("Désolé, je n'ai pas bien compris. Pouvez-vous épeler cela lettre par lettre?");
      // Ask user to spell the word
    }
  };
  
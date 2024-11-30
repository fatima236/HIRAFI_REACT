import React, { useState } from 'react';
import axios from 'axios';

const AudioUploader = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Gérer la sélection du fichier
  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  // Gérer l'envoi du fichier au backend
  const handleSubmit = async () => {
    if (!audioFile) {
      alert('Veuillez sélectionner un fichier audio.');
      return;
    }

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      // Envoi de la requête POST au backend Flask
      const response = await axios.post('http://localhost:5000/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTranscription(response.data.transcription);
    } catch (err) {
      setError('Erreur lors de l\'envoi du fichier');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Transcription Audio</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Envoyer'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {transcription && (
        <div>
          <h3>Transcription :</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default AudioUploader;


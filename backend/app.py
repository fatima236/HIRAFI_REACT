import os
import logging
import csv
from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
from pydub import AudioSegment
from fuzzywuzzy import fuzz, process
from unidecode import unidecode
import re

# Initialiser Flask et CORS
app = Flask(__name__)
CORS(app)

# Configurer le logging
logging.basicConfig(level=logging.INFO)

# Charger le modèle Whisper
model = whisper.load_model("small")  # Utilise un modèle plus performant

# Charger les données du fichier CSV
def load_csv_data():
    try:
        artisans = []
        with open("moroccan_names.csv", mode="r", encoding="utf-8") as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                artisans.append(row)
        logging.info(f"CSV chargé avec succès : {len(artisans)} lignes chargées.")
        return artisans
    except Exception as e:
        logging.error(f"Erreur lors du chargement du CSV : {e}")
        return []

# Charger les artisans depuis le CSV
artisans = load_csv_data()

# Créer un lexique avec les noms, prénoms, villes, métiers
lexique_marocain = set()
for artisan in artisans:
    lexique_marocain.add(unidecode(artisan['Prénom'].lower()))
    lexique_marocain.add(unidecode(artisan['Nom'].lower()))
    lexique_marocain.add(unidecode(artisan['Ville'].lower()))
    lexique_marocain.add(unidecode(artisan['Métier'].lower()))

# Fonction pour convertir MP3 en WAV
def convert_mp3_to_wav(mp3_path, wav_path):
    try:
        audio = AudioSegment.from_mp3(mp3_path)
        audio.export(wav_path, format="wav")
        logging.info(f"Audio converti en WAV: {wav_path}")
    except Exception as e:
        logging.error(f"Erreur de conversion MP3 en WAV: {e}")

# Corrige les erreurs dans la transcription en utilisant le lexique
def correct_transcription(transcription):
    words = transcription.split()
    corrected_words = []

    for word in words:
        # Trouve la meilleure correspondance dans le lexique
        match, score = process.extractOne(unidecode(word.lower()), lexique_marocain, scorer=fuzz.ratio)
        if score > 80:  # Seuil de correspondance
            corrected_words.append(match)
        else:
            corrected_words.append(word)

    return " ".join(corrected_words)

# Fonction pour effectuer une recherche étendue dans le dataset
def find_best_match_in_dataset(transcription, artisans):
    best_match = None
    highest_score = 0

    # Comparaison avec prénom, nom, ville, métier
    for artisan in artisans:
        full_name = f"{artisan['Prénom']} {artisan['Nom']}".lower()
        city = artisan['Ville'].lower()
        profession = artisan['Métier'].lower()
        
        # Comparer la transcription avec le nom complet, la ville et le métier
        name_score = fuzz.partial_ratio(transcription.lower(), full_name)
        city_score = fuzz.partial_ratio(transcription.lower(), city)
        profession_score = fuzz.partial_ratio(transcription.lower(), profession)

        highest_score_local = max(name_score, city_score, profession_score)

        if highest_score_local > highest_score:
            highest_score = highest_score_local
            best_match = artisan

    # Retourner la meilleure correspondance si le score est supérieur à un seuil
    if highest_score > 80:
        return best_match, highest_score
    else:
        return None, highest_score

# Fonction pour forcer la transcription en français
def force_french_transcription(transcription):
    return unidecode(transcription)  # Convertir toute la transcription en caractères latins

# Nettoyer la transcription pour enlever les caractères non latins
def clean_transcription(transcription):
    # Supprimer tous les caractères non-latins (exclure les lettres arabes)
    transcription = re.sub(r'[^\x00-\x7F]+', '', transcription)  # Retirer les caractères non-ASCII
    return transcription

# Endpoint pour la transcription audio
@app.route("/transcribe", methods=["POST"])
def transcribe_audio():
    try:
        # Vérifie si un fichier audio est envoyé
        if "audio" not in request.files:
            return jsonify({"error": "Aucun fichier audio fourni"}), 400

        audio_file = request.files["audio"]
        file_ext = audio_file.filename.split('.')[-1].lower()

        # Vérifie les formats de fichier autorisés
        if file_ext not in ["mp3", "wav"]:
            return jsonify({"error": "Format de fichier non pris en charge"}), 400

        # Créer un répertoire temporaire pour enregistrer l'audio
        temp_dir = "temp_audio"
        os.makedirs(temp_dir, exist_ok=True)
        audio_path = os.path.join(temp_dir, audio_file.filename)
        audio_file.save(audio_path)

        # Si le fichier est MP3, on le convertit en WAV
        if file_ext == "mp3":
            wav_path = os.path.join(temp_dir, "audio.wav")
            convert_mp3_to_wav(audio_path, wav_path)
            audio_path = wav_path

        # Effectuer la transcription avec Whisper (forcer la transcription en français)
        result = model.transcribe(audio_path, language="fr")
        os.remove(audio_path)  # Supprimer le fichier après transcription
        transcription = result.get("text", "").strip()

        if not transcription:
            return jsonify({"error": "Aucune transcription trouvée"}), 500

        # Corriger les mots dans la transcription
        corrected_transcription = correct_transcription(transcription)
        logging.info(f"Transcription corrigée : {corrected_transcription}")

        # Nettoyer et forcer l'écriture latine
        cleaned_transcription = clean_transcription(corrected_transcription)
        final_transcription = force_french_transcription(cleaned_transcription)

        # Vérification des noms dans le dataset étendu
        best_match, score = find_best_match_in_dataset(final_transcription, artisans)

        if best_match:
            return jsonify({
                "transcription": transcription,
                "corrected_transcription": corrected_transcription,
                "final_transcription": final_transcription,
                "match": best_match,
                "score": score
            })
        else:
            return jsonify({
                "transcription": transcription,
                "corrected_transcription": corrected_transcription,
                "final_transcription": final_transcription,
                "message": "Aucune correspondance trouvée dans le dataset."
            })

    except Exception as e:
        logging.error(f"Erreur lors de la transcription: {e}")
        return jsonify({"error": "Erreur serveur interne"}), 500

# Endpoint d'accueil
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Bienvenue à l'API de transcription et validation des artisans !"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="5000")


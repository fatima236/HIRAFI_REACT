from flask import Flask, jsonify, request
from flask_cors import CORS
import pyttsx3
import threading

app = Flask(__name__)
CORS(app)

# Questions à poser à l'utilisateur
questions = [
    "Bienvenue sur Hirafi ! Voulez-vous vous inscrire ? Dites Oui ou Non.",
    "Quel est votre nom ?",
    "Quel est votre email ?",
    "Quel est votre numéro de téléphone ?"
]

# Initialisation du moteur de synthèse vocale
engine = pyttsx3.init()
engine.setProperty('rate', 150)  # vitesse de la voix

# Variable pour suivre l'index de la question actuelle
current_question = 0

# Fonction de synthèse vocale
def speak(text):
    engine.say(text)
    engine.runAndWait()

@app.route('/start', methods=['GET'])
def start_conversation():
    global current_question
    current_question = 0
    text = questions[current_question]
    # Démarre la voix dans un thread séparé
    threading.Thread(target=speak, args=(text,)).start()
    return jsonify({"question": text})

@app.route('/respond', methods=['POST'])
def respond():
    global current_question
    data = request.json
    response = data.get('response', '')

    if current_question == 0:
        if response.lower() == "oui":
            current_question += 1
            text = questions[current_question]
            threading.Thread(target=speak, args=(text,)).start()
            return jsonify({"question": text})
        else:
            threading.Thread(target=speak, args=("Merci, à bientôt !",)).start()
            return jsonify({"message": "Fin de l'inscription"})

    # Logique pour les autres questions
    if current_question < len(questions):
        current_question += 1
        text = questions[current_question]
        threading.Thread(target=speak, args=(text,)).start()
        return jsonify({"question": text})

    threading.Thread(target=speak, args=("Félicitations, vous êtes inscrit !",)).start()
    return jsonify({"message": "Inscription terminée."})

if __name__ == '__main__':
    app.run(debug=True)



import pandas as pd
from gtts import gTTS
import os
import time

# Charger le dataset complet
csv_path = "Artisans_Marocains_Dataset_avec_Emails.csv"
data = pd.read_csv(csv_path)

# Créer un dossier pour stocker les fichiers audio
output_folder = "audios"
os.makedirs(output_folder, exist_ok=True)

# Charger la progression sauvegardée
progress_log_path = "progress_log.txt"
if not os.path.exists(progress_log_path):
    with open(progress_log_path, "w") as f:
        f.write("360\n")  # Si vous avez déjà 360 fichiers, commencez après cela

with open(progress_log_path, "r") as f:
    start_index = int(f.read().strip())

# Définir le batch size pour limiter les requêtes
batch_size = 50  # Générer 50 fichiers puis faire une pause prolongée
batch_pause = 300  # Pause de 5 minutes après chaque batch

# Générer les fichiers audio
for index, row in data.iterrows():
    if index < start_index:
        continue  # Passer les lignes déjà traitées

    filename = f"audio_{index + 1}.mp3"
    filepath = os.path.join(output_folder, filename)

    try:
        # Construire le texte pour le fichier audio
        text = (
            f"Nom : {row['Prénom']} {row['Nom']}, "
            f"Ville : {row['Ville']}, "
            f"Métier : {row['Métier']}, "
            f"Email : {row['Adresse e-mail']}, "
            f"Numéro de téléphone : {row['Numéro de téléphone']}."
        )

        # Générer et sauvegarder l'audio
        tts = gTTS(text=text, lang='fr')
        tts.save(filepath)
        print(f"Audio généré pour la ligne {index + 1}: {filepath}")

        # Mettre à jour le fichier de progression
        with open(progress_log_path, "w") as f:
            f.write(str(index + 1))

        # Pause courte pour chaque ligne
        time.sleep(2)

        # Pause prolongée après chaque batch
        if (index - start_index + 1) % batch_size == 0:
            print("Pause prolongée pour éviter les limitations...")
            time.sleep(batch_pause)

    except Exception as e:
        print(f"Erreur pour la ligne {index + 1}: {e}")
        if "429" in str(e):
            print("Trop de requêtes. Pause prolongée pour réduire la charge.")
            time.sleep(300)  # Pause de 5 minutes
        else:
            print("Erreur inattendue. Passage à la ligne suivante.")
        continue

print("Tous les fichiers audio ont été générés.")

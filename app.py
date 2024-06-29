import random
from flask import Flask, render_template, request, jsonify
import numpy as np
from keras.models import load_model
import json
import pickle
import nltk
from nltk.stem import WordNetLemmatizer
import spacy

app = Flask(__name__)

# Load intents and other necessary data
with open('intents.json', 'r') as file:
    intents = json.load(file)

# Load saved model and other preprocessing artifacts
model = load_model('chatbot_model.h5')

with open('words.pkl', 'rb') as f:
    words = pickle.load(f)

with open('classes.pkl', 'rb') as f:
    classes = pickle.load(f)

lemmatizer = WordNetLemmatizer()
nlp = spacy.load('en_core_web_sm')

# Function to clean up input sentence
def clean_up_sentence(sentence):
    doc = nlp(sentence)
    tokens = [token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct]
    return tokens

# Function to convert sentence into bag of words array
def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0]*len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print(f"Found in bag: {w}")
    return np.array(bag)

# Function to predict intent from user input
def predict_class(sentence, model):
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
    return return_list

# Route for main page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle chatbot interactions
@app.route('/chat', methods=['POST'])
def chat():
    try:
        msg = request.json['msg']
        print(f"Received message: {msg}")

        # Predict intent and get response
        ints = predict_class(msg, model)
        print(f"Intent prediction: {ints}")

        res = get_response(ints, intents)
        print(f"Generated response: {res}")

        return jsonify({'response': res})

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'response': 'Error: Please try again later'})

# Function to fetch appropriate response based on predicted intent
def get_response(ints, intents_json):
    tag = ints[0]['intent']
    for i in intents_json['intents']:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    else:
        result = "I'm sorry, I don't understand. Could you please rephrase?"
    return result

if __name__ == '__main__':
    app.run(debug=True)

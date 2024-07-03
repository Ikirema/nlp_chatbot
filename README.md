# Medical Assistant Chatbot -From Scratch - README

## Overview

The Medical Assistant Chatbot is an NLP (Natural Language Processing) powered chatbot designed to assist users with medical inquiries. It can provide information on symptoms, medications, and general health advice, leveraging advanced NLP techniques to understand and respond to user inputs in natural language.

## Features

- **Symptom Checker**: Users can input symptoms they are experiencing, and the chatbot will provide possible conditions related to those symptoms.
- **Medication Information**: The chatbot can offer details on medications, including usage, dosage, and side effects.
- **Health Tips**: General health advice and tips on maintaining a healthy lifestyle.
- **Appointment Scheduling Assistance**: Guidance on how to schedule appointments with healthcare providers.
- **Emergency Response**: Direct users to emergency services if they indicate a serious health issue.

## Technology Stack

- **Backend**: Python, Flask
- **NLP Framework**: spaCy, NLTK
- **Database**: SQLite (for storing user interactions and medical data)
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Flask

## Installation

### Prerequisites

- Python 3.7+
- pip (Python package installer)
- Docker (optional, for containerized deployment)

### Steps

1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/medical-assistant-chatbot.git
    cd medical-assistant-chatbot
    ```

2. **Create a Virtual Environment**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4. **Set Up Environment Variables**
    Create a `.env` file in the root directory with the following variables:
    ```env
    OPENAI_API_KEY=your_openai_api_key
    FLASK_ENV=development
    ```

5. **Run the Application**
    ```bash
    flask run
    ```

6. **Access the Chatbot**
    Open your web browser and go to `http://127.0.0.1:5000`.

### Docker Deployment

1. **Build the Docker Image**
    ```bash
    docker build -t medical-assistant-chatbot .
    ```

2. **Run the Docker Container**
    ```bash
    docker run -d -p 5000:5000 --env-file .env medical-assistant-chatbot
    ```

## Usage

Once the application is running, users can interact with the chatbot via the web interface. They can type questions or symptoms, and the chatbot will respond with relevant medical information or advice.

## Project Structure

```
medical-assistant-chatbot/
├── app/
│   ├── static/
│   ├── templates/
│   ├── __init__.py
│   ├── main.py
│   └── nlp_engine.py
├── data/
│   └── medical_data.db
├── tests/
│   └── test_chatbot.py
├── .env
├── .gitignore
├── Dockerfile
├── README.md
└── requirements.txt
```

- `app/`: Contains the main application code.
    - `static/`: Static files (CSS, JavaScript).
    - `templates/`: HTML templates.
    - `__init__.py`: Initializes the Flask application.
    - `main.py`: Main application routes and logic.
    - `nlp_engine.py`: NLP processing and response generation.
- `data/`: Database files.
- `tests/`: Unit tests for the application.
- `.env`: Environment variables.
- `.gitignore`: Git ignore file.
- `Dockerfile`: Docker configuration.
- `README.md`: Project documentation.
- `requirements.txt`: Python dependencies.

## Testing

Run the unit tests using:
```bash
pytest tests/
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please contact [iankirema@gmail.com](mailto:yourname@example.com).

---

Thank you for using the Medical Assistant Chatbot! We hope it makes managing your health easier and more informed.

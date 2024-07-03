// Show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'block';
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'none';
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    showTypingIndicator();

    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        hideTypingIndicator();

        const messages = document.getElementById('messages');

        // Add user's message
        const userMessage = document.createElement('div');
        userMessage.classList.add('user-message', 'animate__animated', 'animate__fadeInRight');
        userMessage.textContent = userInput;
        messages.appendChild(userMessage);

        // Add bot's message
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message', 'animate__animated', 'animate__fadeInLeft');
        botMessage.textContent = data.message;
        messages.appendChild(botMessage);

        document.getElementById('user-input').value = '';
        messages.scrollTop = messages.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
        hideTypingIndicator();
    });
}

// Voice-to-text functionality
document.getElementById('voice-button').addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('user-input').value = transcript;
    };

    recognition.onerror = function(event) {
        console.error('Error:', event.error);
    };

    recognition.start();
});

// Delete messages functionality
document.getElementById('delete-button').addEventListener('click', () => {
    const messages = document.getElementById('messages');
    messages.innerHTML = ''; // Clear messages
});

// Automatically focus on the input field when the page loads
document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById('user-input');
    inputField.focus();
});
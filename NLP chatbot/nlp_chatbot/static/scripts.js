// Show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'block'; // Show the typing indicator
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'none'; // Hide the typing indicator
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return; // Prevent sending empty messages

    showTypingIndicator(); // Show typing indicator

    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        hideTypingIndicator(); // Hide typing indicator once the response is received

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

        document.getElementById('user-input').value = ''; // Clear input field
        messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
    })
    .catch(error => {
        console.error('Error:', error);
        hideTypingIndicator(); // Hide typing indicator in case of an error
    });
}

// Automatically focus on the input field when the page loads
document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById('user-input');
    inputField.focus();
});
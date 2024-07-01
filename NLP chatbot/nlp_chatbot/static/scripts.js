function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const messages = document.getElementById('messages');
        const userMessage = document.createElement('div');
        userMessage.classList.add('user-message');
        userMessage.textContent = userInput;
        messages.appendChild(userMessage);

        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.textContent = data.message;
        messages.appendChild(botMessage);

        // Clear the input field
        document.getElementById('user-input').value = '';
        // Scroll to the bottom of the messages
        messages.scrollTop = messages.scrollHeight;
    })
    .catch(error => console.error('Error:', error));
}

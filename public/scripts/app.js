'use strict';

// console.log('Hello, welcome to zulu chat. Stay connect with your lovely !');
const socket = io.connect('http://localhost:9000');

let btn = document.getElementById('send-btn');
let message = document.getElementById('message');
let chat_messages = document.getElementById('chat-messages');

let nom_utilisateur = window.prompt("Entrez votre nom", "Anonyme");

//Emission de l'événement welcome-user
socket.emit('welcome-user', nom_utilisateur);

btn.addEventListener('click', (e) => {
    const messageValue = message.value;
    console.log(messageValue);
    socket.emit('chat message', messageValue);
    message.value = '';
});

//Ecoute de l'événement chat-message-serveur
socket.on('chat-message-serveur', (msg) => {
    chat_messages.innerHTML += `<p>${msg}</p>`;
});


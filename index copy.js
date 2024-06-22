const express = require('express');
const http = require('http');
const path = require('path');
const app = express(); //initialisation de express
const server = http.Server(app); // création d'un serveur http à partir de l'application express
const io = require('socket.io')(server); //Créer une instance de socket.io en lui passant le serveur http
const mongoose = require('mongoose'); // importation du module mongoose

//Connexion à la base de données
mongoose.connect('mongodb://localhost:27017/zulu-chat', { useNewUrlParser: true, useUnifiedTopology: true })

const indexRouter = require('./routes/index-routes'); // importation du module index-routes

/**
 * ========================================
 * ========== Paramètres de la vue ========
 */


/**
 * ========================================
 * ========== Middleware ===================
 */


/**
 * ========================================
 * ========== Routes =======================
 */
app.use('/', indexRouter); // utilisation du module index-routes pour charger toutes les routes du fichier




app.use(express.static(path.join(__dirname, 'public'))); // middleware pour servir des fichiers statiques (html, css, js, images, etc.

app.set('views', path.join(__dirname, 'views')); // répertoire des vues
app.set('view engine', 'pug'); // moteur de template


//Ecoute de l'événement connection
io.on('connection', (socket) => {
    console.log('l\'utilisateur ayant l\'id ' + socket.id + ' est connecté');

    //Ecoute de l'événement disconnect
    socket.on('disconnect', () => {
        console.log('l\'utilisateur ayant l\'id ' + socket.id + ' est déconnecté');
    })

    //Ecoute de l'événement welcome-user
    socket.on('welcome-user', (nom_utilisateur) => {
        socket.broadcast.emit('chat-message-serveur', `<h2>${nom_utilisateur}</h2> a rejoint le chat`);
    });
    //Ecoute de l'événement chat message
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        //Emission de l'événement chat-message-serveur
        socket.broadcast.emit('chat-message-serveur', msg);
    });

    
})
// const socket = io.connect('http://localhost:9000');
server.listen(9000, () => {
    console.log('Server started on port 9000 ✅');
})


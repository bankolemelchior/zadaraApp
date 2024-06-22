const express = require('express');
const app = express(); //initialisation de express
const http = require('http');
const server = http.Server(app); // création d'un serveur http à partir de l'application express
const io = require('socket.io')(server); //Créer une instance de socket.io en lui passant le serveur http
const path = require('path');

const port = 9000;


const mongoose = require('mongoose'); // importation du module mongoose

//Connexion à la base de données
// mongoose.connect('mongodb://localhost:27017/zulu-chat')

const indexRouter = require('./routes/index-routes'); // importation du module index-routes
const authRouter = require('./routes/auth-routes'); // importation du module auth-routes
/**
 * ========================================
 * ========== Paramètres de la vue ========
 */
app.use(express.static(path.join(__dirname, 'public'))); // middleware pour servir des fichiers statiques (html, css, js, images, etc.

app.set('views', path.join(__dirname, 'views')); // répertoire des vues
app.set('view engine', 'pug'); // moteur de template


/**
 * ========================================
 * ========== Middleware ===================
 */


/**
 * ========================================
 * ========== Routes =======================
 */
// app.use('/', indexRouter); // utilisation du module index-routes pour charger toutes les routes du fichier
// app.use('/auth', authRouter); // utilisation du module auth-routes pour charger toutes les routes du fichier

app.get('/', (req, res) => {

    res.render('index')
    // res.sendFile(path.join(__dirname + '/index.pug'));
    // res.end('les routes de l\'index')

}); // route pour la page d'accueil



// const server = http.createServer(app); // création d'un serveur http à partir de l'application express

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



server.listen(port, () => {
    console.log('Server started on port 9000 ✅');
})


module.exports = app; // exportation de l'application express


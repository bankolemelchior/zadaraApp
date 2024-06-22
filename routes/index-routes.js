const express = require('express');
const router = express.Router();


//Routes
router.get('/', (req, res) => {

    res.render('index')
    // res.sendFile(path.join(__dirname + '/index.pug'));
    // res.end('les routes de l\'index')

}); // route pour la page d'accueil

module.exports = router;
const express = require('express');
const router = express.Router();


//Routes
router.get("/auth", (req, res) => {

    // res.render('index')
    res.end('authentification')

});

module.exports = router;
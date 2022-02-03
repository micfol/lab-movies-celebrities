const CelebrityModel = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here


//add a new celebrity
router.get('/celebrities/new-celebrity', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/new-celebrity', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase})
    .then((newCeleb) => {
        console.log(newCeleb);
        res.redirect('/celebrities/celebrities');
    })
    .catch((error) => {
        console.log(`Error making new celebrity" -> ${error}`);
        res.redirect('/celebrity/new-celebrity');
        next(error);
    });
});

//list all celebrities
router.get('/celebrities/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((allCelebs) => {
        res.render('celebrities/celebrities', {celebs: allCelebs})
    })
    .catch((error) => {
    console.log(`Somthing went wrong while listing celebrities -> ${error}`);
    next(error)
    });
});

module.exports = router;
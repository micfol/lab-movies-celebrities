// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/movie.model");
const Celebrity = require('../models/Celebrity.model');
const res = require("express/lib/response");
const CelebrityModel = require("../models/Celebrity.model");

//list movies
router.get('/', (req, res, next) => {
    Movie.find()
    .populate('cast')
    .then((allMovies) => {
        res.render('movies/movies', {movies: allMovies});
    })
    .catch((error) => {
    console.log(`Somthing went wrong while listing movies -> ${error}`);
    next(error);
    });
});

//create movie
router.get('/create', (req, res, next) => {
    Celebrity.find()
    .then(celebs => {
        res.render('movies/new-movie', {celebs})
    })
    .catch(err => console.log(`Error loading movies with cast lists - > ${err}`));
});

router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
        console.log(newMovie)
        res.redirect('/movies')
    })
    .catch((error) => {
        console.log(`Error making new movie" -> ${error}`);
    });
});


//movie details
router.get('/:id', (req, res, next) => {
    const { id } = req.params

    Movie.findById(id)
    .populate('cast')
    .then(movie => {
        console.log(movie);
        res.render('movies/movie-details', {movie})
    })
    .catch(err => console.log(`There is an error getting movie details -> ${err}`));
});

module.exports = router;
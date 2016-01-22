// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Movie = require('./models/movie');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/movies');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
    res.json({ message: 'Default end point!' });
});

// Create a new route with the prefix /beers
var moviesRoute = router.route('/movies');

// Create endpoint /api/beers for POSTS
moviesRoute.post(function(req, res) {
    // Create a new instance of the Beer model
    var movie = new Movie();

    // Set the beer properties that came from the POST data
    movie.name = req.body.name;
    console.log(req.body);
    // Save the beer and check for errors
    movie.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Beer added to the locker!', data: movie });
    });
});

// Create endpoint /api/beers for GET
moviesRoute.get(function(req, res) {
    // Use the Beer model to find all beer
    Movie.find(function(err, movies) {
        if (err)
            res.send(err);

        res.json(movies);
    });
});

// Create a new route with the /beers/:beer_id prefix
var movieRoute = router.route('/movies/:movie_id');

// Create endpoint /api/beers/:beer_id for GET
movieRoute.get(function(req, res) {
    // Use the Beer model to find a specific beer
    Movie.findById(req.params.movie_id, function(err, movie) {
        if (err)
            res.send(err);

        res.json(movie);
    });
});

// Create endpoint /api/beers/:beer_id for PUT
movieRoute.put(function(req, res) {
    // Use the Beer model to find a specific beer
    Movie.findById(req.params.movie_id, function(err, movie) {
        if (err)
            res.send(err);

        // Update the existing beer quantity
        movie.name = req.body.name;

        // Save the beer and check for errors
        movie.save(function(err) {
            if (err)
                res.send(err);

            res.json(movie);
        });
    });
});

// Create endpoint /api/beers/:beer_id for DELETE
movieRoute.delete(function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    movieRoute.findByIdAndRemove(req.params.movie_id, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Movie removed!' });
    });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert movie on port ' + port);
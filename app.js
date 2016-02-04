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

// Create a new route with the prefix /movies
var moviesRoute = router.route('/movies');

// Create endpoint /api/movies for POSTS
moviesRoute.post(function(req, res) {
    // Create a new instance of the Movie model
    var movie = new Movie();

    // Set the movie properties that came from the POST data
    movie.name = req.body.name;
    movie.year = req.body.year;
    movie.gender = req.body.gender;
    console.log(req.body);
    // Save the beer and check for errors
    movie.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Added new movie!', data: movie });
    });
});

moviesRoute.get(function(req, res) {
    var filters = {};
    if( typeof req.query.name !== 'undefined' ){
        filters['name'] = {'$regex': req.query.name };
    }
    if( typeof  req.query.year !== 'undefined'){
        filters['year'] = {'$regex': req.query.year };
    }
    if( typeof req.query.gender !== 'undefined' ){
        filters['gender'] = {'$regex': req.query.gender };
    }
    Movie.find(filters,function(err, movies) {
        if (err)
            res.send(err);

        res.json(movies);
    });
});

var movieRoute = router.route('/movies/:movie_id');

movieRoute.get(function(req, res) {
    // Use the Beer model to find a specific beer
    Movie.findById(req.params.movie_id, function(err, movie) {
        if (err)
            res.send(err);

        res.json(movie);
    });
});

movieRoute.put(function(req, res) {
    Movie.findById(req.params.movie_id, function(err, movie) {
        if (err)
            res.send(err);
        console.log("Movie Id: " + movie._id);
        movie.name = req.body.name;
        movie.year = req.body.year;
        movie.gender = req.body.gender;
        movie.save(function(err) {
            if (err)
                res.send(err);

            res.json(movie);
        });
    });
});

movieRoute.delete(function(req, res) {
    Movie.remove({"_id" : req.params.movie_id }, function(err){
        if (err)
            res.send(err);
        res.json({ message: 'Movie removed!' });
    });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);

console.log('Insert movie on port  :::   ' + port);
/**
 * Created by Pablo on 2/4/2016.
 */
var mongoose = require('mongoose');
var Movie = require('./models/movie');
// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/movies');

var movieArray = [
    {
        name: "Pulp Fiction",
        year: "1994",
        gender: "action"
    },
    {
        name: "The Godfather",
        year: "1972",
        gender: "action"
    },
    {
        name: "Fight Club",
        year: "1999",
        gender: "action"
    },
    {
        name: "Star Wars: Episode V - The Empire Strikes Back",
        year: "1980",
        gender: "Sci-Fi"
    }
];

Movie.remove({}, function(err,removed) {
    for( var i = 0; i < movieArray.length; i++ ){
        var currentMovie = new Movie();
        currentMovie.name = movieArray[i].name;
        currentMovie.year = movieArray[i].year;
        currentMovie.gender = movieArray[i].gender;
        currentMovie.save(function(err, movie){
            console.log("Added movie: " + movie.name);
        });
    }
});


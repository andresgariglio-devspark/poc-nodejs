/**
 * Created by Pablo on 2/4/2016.
 */
var mongoose = require('mongoose');
var Movie = require('./models/movie');
// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/movies');

var movieArray = [
    {
        name: "Movie1",
        year: "2010",
        gender: "action"
    },
    {
        name: "Movie1",
        year: "2010",
        gender: "action"
    },
    {
        name: "Movie1",
        year: "2010",
        gender: "action"
    },
    {
        name: "Movie1",
        year: "2010",
        gender: "action"
    }
];

Movie.remove({}, function(err,removed) {
    for( var i = 0; i < movieArray.length; i++ ){
        var currentMovie = new Movie();
        currentMovie.name = movieArray[i].name;
        currentMovie.year = movieArray[i].year;
        currentMovie.gender = movieArray[i].gender;
        currentMovie.save(function(){
            console.log("Added movie!!!");
        });
    }
});


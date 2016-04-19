// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Person = require('./models/person');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/poc');

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

// Create a new route with the prefix /persons
var personsRoute = router.route('/persons');

// Create endpoint /api/persons for POSTS
personsRoute.post(function(req, res) {
    // Create a new instance of the Person model
    var person = new Person();

    // Set the person properties that came from the POST data
    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;
    console.log(req.body);

    // Save the beer and check for errors
    person.save(function(err) {
        if (err) {
            return res.status(400).send(err);
        }

        res.json({ message: 'Added new person!', data: person });
    });
});

personsRoute.get(function(req, res) {
    var filters = {};
    if( typeof req.query.firstName !== 'undefined' ){
        filters['firstName'] = {'$regex': req.query.firstName };
    }
    if( typeof  req.query.lastName !== 'undefined'){
        filters['lastName'] = {'$regex': req.query.lastName };
    }
    Person.find(filters,function(err, persons) {
        if (err)
            res.send(err);

        res.json(persons);
    });
});

var personRoute = router.route('/persons/:person_id');

personRoute.get(function(req, res) {
    // Use the Beer model to find a specific beer
    Person.findById(req.params.person_id, function(err, person) {
        if (err)
            res.send(err);

        if (!person) {
          return res.status(404).send({ error: 'Not found' });
        }

        res.json(person);
    });
});

personRoute.put(function(req, res) {
    Person.findById(req.params.person_id, function(err, person) {
        if (err)
            res.send(err);

        if (!person) {
          return res.status(404).send({ error: 'Not found' });
        }

        console.log("Person Id: " + person._id);
        person.firstName = req.body.firstName;
        person.lastName = req.body.lastName;

        person.save(function(err) {
          if (err) {
              return res.status(400).send(err);
          }

          res.json(person);
        });
    });
});

personRoute.delete(function(req, res) {

    Person.findById(req.params.person_id, function(err, person) {
        if (err)
            res.send(err);

        if (!person) {
            return res.status(404).send({ error: 'Not found' });
        }

        person.remove(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Person removed!' });
        });
    });
});

// Register all our routes with /api
app.use('/', router);

// Start the server
app.listen(port);

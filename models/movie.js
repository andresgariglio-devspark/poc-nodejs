// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var MovieSchema   = new mongoose.Schema({
    name: String
});

// Export the Mongoose model
module.exports = mongoose.model('Movie', MovieSchema);
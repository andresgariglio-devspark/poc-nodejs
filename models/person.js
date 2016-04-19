// Load required packages
var mongoose = require('mongoose');

// Define our schema
var PersonSchema   = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
},
{collection: 'person'}
);


// Export the Mongoose model
module.exports = mongoose.model('person', PersonSchema);

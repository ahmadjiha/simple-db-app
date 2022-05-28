const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('conntecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

const visitorSchema = new mongoose.Schema({
  name: String,
  dateVisited: Date
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
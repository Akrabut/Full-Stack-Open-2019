require('dotenv').config();
const mongoose = require('mongoose');

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGO_URI;

console.log(`Connecting to ${url}`);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => console.log('Connected to MongoDB'))
  .catch(error => console.log(`${error} - connection failed`));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.date;
  },
});

module.exports = mongoose.model('Person', personSchema);

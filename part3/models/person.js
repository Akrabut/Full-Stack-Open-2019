/* eslint-disable object-curly-newline */
require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGO_URI;

console.log(`Connecting to ${url}`);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(res => console.log('Connected to MongoDB'))
  .catch(error => console.log(`${error} - connection failed`));

const personSchema = mongoose.Schema({
  name: { type: String, index: true, required: true, unique: true, minlength: 2 },
  number: { type: String, required: true, minlength: 8 },
  date: { type: Date, required: true },
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.date;
  },
});

module.exports = mongoose.model('Person', personSchema);

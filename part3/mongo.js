/* eslint-disable arrow-parens */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@full-stack-open-pises.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model('Person', personSchema);

async function get() {
  console.log('phonebook:');
  (await Person.find({})).forEach(person => console.log(`${person.name} - ${person.number}`));
  mongoose.connection.close();
  process.exit(1);
}

if (process.argv.length === 3) {
  // DOES NOT WORK
  Person.find({})
    .then(persons => {
      console.log('phonebook:');
      persons.forEach(person => console.log(`${person.name} - ${person.number}`));
      mongoose.connection.close();
    })
    .catch(error => console.log(error));  
  // WORKS
  get();
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    date: new Date(),
  });

  person.save().then(() => {
    console.log(`${person.name} saved with number ${person.number}`);
    mongoose.connection.close();
  });
}

/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-parens */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));

morgan.token('body', (req) => JSON.stringify(req.body) || '|');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const mongoose = require('mongoose');
const Person = require('./models/person');

async function getAll() {
  const persons = await Person.find({});
  return persons;
}

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(person => person.toJSON()));
    });
});

app.get('/api/info', async (req, res) => {
  const date = new Date();
  const persons = await getAll();
  res.send(
    `<div>
      Phonebook has info for ${persons.length} people
      <br></br>
      ${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
    </div>`,
  );
});

// function isValidId(req, res) {
//   const id = Number(req.params.id);
//   // eslint-disable-next-line no-restricted-globals
//   return (isNaN(id) ? res.status(400).end() : id);
// }

app.get('/api/persons/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) res.status(400).end();
  Person.findById(req.params.id)
    .then(person => {
      person
        ? res.json(person.toJSON())
        : res.status(404).end();
    })
    .catch(error => console.log(error));
});

app.delete('/api/persons/:id', (req, res) => {
  const id = isValidId(req, res);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

function nameExists(name) {
  return persons.find((person) => person.name === name);
}

app.post('/api/persons', async (req, res) => {
  if (!req.body || !req.body.name || !req.body.number) {
    res.status(400).json({ error: 'person must have name and number' });
  }
  // RESPONSE CODE 418 AKA I'M A TEAPOT
  // if (nameExists(req.body.name)) res.status(418).send(`${req.body.name} is already in the phonebook`);
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  });
  await person.save();
  res.json(person);
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

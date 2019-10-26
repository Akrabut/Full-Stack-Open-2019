/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-parens */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json());

morgan.token('body', (req) => JSON.stringify(req.body) || '|');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
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
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).send({ error: 'malformatted id' });
//     return false;
//   }
//   return true;
// }

app.get('/api/persons/:id', (req, res, next) => {
  // if (!isValidId(req, res)) return;
  Person.findById(req.params.id)
    .then(person => {
      person
        ? res.json(person.toJSON())
        : res.status(404).end();
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      result
        ? res.status(204).send('Deleted successfully')
        : res.status(404).end();
    })
    .catch(error => next(error));
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
    date: new Date(),
  });
  await person.save();
  res.json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(418).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  next(error);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

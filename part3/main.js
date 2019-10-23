const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'Lel Mistios',
    number: '82-51-0379931',
    id: 5,
  },
];

const app = express();
app.use(bodyParser.json());

function getBody(req) {
  return JSON.stringify(req.body) || '|';
}

morgan.token('body', getBody);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/info', (req, res) => {
  const date = new Date();
  res.send(
    `<div>
      Phonebook has info for ${persons.length} people
      <br></br>
      ${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
    </div>`,
  );
});

function isValidId(req, res) {
  const id = Number(req.params.id);
  // eslint-disable-next-line no-restricted-globals
  return (isNaN(id) ? res.status(400).end() : id);
}

app.get('/api/persons/:id', (req, res) => {
  const id = isValidId(req, res);
  const personToRet = persons.find((person) => person.id === id);
  if (!personToRet) res.status(404).end();
  res.json(personToRet);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = isValidId(req, res);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

function nameExists(name) {
  return persons.find((person) => person.name === name);
}

app.post('/api/persons', (req, res) => {
  if (!req.body || !req.body.name || !req.body.number) {
    res.status(400).json({ error: 'person must have name and number' });
  }
  // RESPONSE CODE 418 AKA I'M A TEAPOT
  if (nameExists(req.body.name)) res.status(418).send(`${req.body.name} is already in the phonebook`);
  const person = {
    name: req.body.name,
    number: req.body.number,
    id: Math.floor((Math.random() + 1) * 1000000),
  };
  persons.push(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

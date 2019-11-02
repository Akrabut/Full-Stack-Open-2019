const bodyParser = require('body-parser').json();
let morgan = require('morgan');

morgan.token('body', req => JSON.stringify(req.body));
morgan = morgan(':method :url :status - :res[content-length] :response-time ms \n:body');

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method);
//   console.log('Path:  ', request.path);
//   console.log('Body:  ', request.body);
//   console.log('---');
//   next();
// };

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } if (error.name === 'AuthenticationError' || error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  bodyParser,
  morgan,
  // requestLogger,
  unknownEndpoint,
  errorHandler,
};

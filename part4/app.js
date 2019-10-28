const express = require('express');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utilities/middleware');

const app = express();

app.use(cors());
app.use(middleware.bodyParser);
app.use(express.static('build'));

app.use(middleware.morgan);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;

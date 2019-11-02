const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const errorHelper = require('../utilities/error_helper');

function checkPassword(password, user) {
  return (!user || !password
    ? false
    : bcrypt.compare(password, user.password));
}

function tokenizeUser(user) {
  const userToken = {
    username: user.username,
    id: user._id,
  };
  return jwt.sign(userToken, process.env.SECRET);
}

loginRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!(await checkPassword(req.body.password, user))) {
      throw errorHelper('AuthenticationError', 'Invalid username or password');
    }
    res.status(200).send({ token: tokenizeUser(user), username: user.username, name: user.name });
  } catch(error) { next(error); }
});

module.exports = loginRouter;

const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const errorHelper = require('../utilities/error_helper');

usersRouter.get('/', async (req, res, next) => {
  try {
    const result = await User.find({}).populate('blogs', { author: 1, title: 1, url: 1, likes: 1 });
    res.json(result.map(user => user.toJSON()));
  } catch(error) { next(error); }
});

usersRouter.post('/', async (req, res, next) => {
  try {
    if (req.body.password.length < 6) {
      throw errorHelper('ValidationError', 'Password must be at least 5 character long');
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: passwordHash,
      blogs: [],
    });
    const savedUser = await user.save();
    res.json(savedUser.toJSON());
  } catch(error) { next(error); }
});

module.exports = usersRouter;
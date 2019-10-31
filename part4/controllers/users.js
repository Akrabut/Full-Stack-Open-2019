const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res, next) => {
  try {
    const result = await User.find({});
    res.json(result.map(user => user.toJSON()));
  } catch(error) { next(error); }
});

usersRouter.post('/', async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: passwordHash,
      created: new Date(),
    });
    const savedUser = await user.save();
    res.json(savedUser.toJSON());
  } catch(error) { next(error); }
});

module.exports = usersRouter;
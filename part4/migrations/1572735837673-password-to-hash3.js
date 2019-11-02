'use strict';
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.up = async function (next) {
  const users = await User.find({});
  const results = users.map(async user => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    return User.findByIdAndUpdate(user._id, { password: passwordHash });
  });
  await Promise.all(results);
  console.log(results);
  next();
};

module.exports.down = function (next) {
  next();
};

'use strict';
const bcrypt = require('bcrypt');

module.exports.up = async function (next) {
  console.log(await bcrypt.hash('1111111', 10));
  console.log(await bcrypt.hash('2222222', 10));
  console.log(await bcrypt.hash('3333333', 10));
  next();
};

module.exports.down = function (next) {
  next();
};

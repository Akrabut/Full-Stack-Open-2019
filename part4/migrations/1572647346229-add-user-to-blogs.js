'use strict';
const app = require('../index');
const User = require('../models/blog');
const Blog = require('../models/user');

module.exports.up = async function (next) {
  const users = await User.find({});
  const blogs = await Blog.find({});
  const results = blogs.map(blog => {
    blog['user'] = users[0]._id;
    return blog.save();
  });
  await Promise.all(results);
  next();
};

module.exports.down = function (next) {
  next();
};

'use strict';
const app = require('../index');
const User = require('../models/user');
const Blog = require('../models/blog');

module.exports.up = async function (next) {
  const users = await User.find({});
  const blogs = await Blog.find({});
  console.log(users);
  console.log(blogs);
  const results = blogs.map(blog => {
    blog['user'] = users[0]._id;
    return blog.save();
  });
  await Promise.all(results);
  console.log(results);
  next();
};

module.exports.down = function (next) {
  next();
};

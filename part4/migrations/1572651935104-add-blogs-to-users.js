'use strict';
const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');

async function saveMap(blogs) {
  const updatedUsers = [];
  blogs.forEach((v, k) => {
    const values = v.map(blogId => mongoose.Types.ObjectId(blogId));
    updatedUsers.push(User.findByIdAndUpdate(mongoose.Types.ObjectId(k), { blogs: values }));
  });
  await Promise.all(updatedUsers);
}

module.exports.up = async function (next) {
  const blogs =
    (await Blog.find({}))
      .reduce((acc, blog) => {
        const userId = blog.user.toString();
        acc.get(userId)
          ? acc.set(userId, acc.get(userId).concat(blog._id.toString()))
          : acc.set(userId, [blog._id.toString()]);
        return acc;
      }, new Map());
  console.log(blogs); 
  await saveMap(blogs);
  next();
};

module.exports.down = function (next) {
  next();
};

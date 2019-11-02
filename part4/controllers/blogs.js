const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 });
    console.log(blogs);
    response.json(blogs.map(blog => blog.toJSON()));
  } catch(error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const user = await User.findById(request.body.userId);
    const blog = new Blog(request.body);
    blog.user = user._id;
    if (!blog.likes) blog['likes'] = 0;
    const result = [blog.save()];
    user.blogs.push(blog._id);
    result.push(user.save());
    await Promise.all(result);
    response.status(201).json(result[0]);
  } catch(error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id);
    result
      ? res.status(204).send('Deleted successfully')
      : res.status(404).send('No such ID');
  } catch(error) { next(error); }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, req.body);
    result
      ? res.status(202).send('Updated successfully')
      : res.status(404).send('No such ID');
  } catch(error) { next(error); }
});

module.exports = blogsRouter;

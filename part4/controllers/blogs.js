const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs.map(blog => blog.toJSON()));
  } catch(error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    if (!blog.likes) blog['likes'] = 0;
    const result = await blog.save();
    response.status(201).json(result);
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

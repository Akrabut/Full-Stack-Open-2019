const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const errorHelper = require('../utilities/error_helper');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 });
    console.log(blogs);
    response.json(blogs.map(blog => blog.toJSON()));
  } catch(error) {
    next(error);
  }
});

function decodeToken(req) {
  const token = req.token;
  const decoded = jwt.verify(token, process.env.SECRET);
  if (!decoded || !decoded.id) throw errorHelper('AuthenticationError', 'Token missing or invalid');
  return decoded;
}

blogsRouter.post('/', async (request, response, next) => {
  try {
    const decoded = decodeToken(request);
    const user = await User.findById(decoded.id);
    const blog = new Blog(request.body);
    blog.user = user._id;
    if (!blog.likes) blog['likes'] = 0;
    const savedBlog = await blog.save();
    user.blogs.push(blog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch(error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const decoded = decodeToken(req);
    const user = await User.findById(decoded.id);
    const blog = await Blog.findById(req.params.id);
    if (user._id.toString() !== blog.user.toString()) throw errorHelper('AuthenticationError', 'THIS IS NOT YOUR BLOG BRUH');
    await Blog.findByIdAndDelete(blog._id);
    res.status(204).send('Deleted successfully');
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

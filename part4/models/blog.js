const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});
blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
  transform: (doc, blog) => {
    blog.id = blog._id.toString();
    delete blog._id;
    delete blog.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);

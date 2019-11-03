const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true, unique: true },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
}, { timestamps: true });

blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
  transform: (doc, blog) => {
    blog.id = blog._id.toString();
    delete blog._id;
    delete blog.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);

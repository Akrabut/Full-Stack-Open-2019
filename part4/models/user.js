const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, index: true, minglength: 3 },
  password: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: 'true' }],
}, { timestamps: true });

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (doc, user) => {
    user.id = user._id.toString();
    delete user.password;
    delete user._id;
    delete user.__v;
  },
});

module.exports = mongoose.model('User', userSchema);
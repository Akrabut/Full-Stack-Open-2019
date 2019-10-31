const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, index: true, minglength: 3 },
  password: { type: String, required: true, minlength: 5 },
  created: { type: Date }
});

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
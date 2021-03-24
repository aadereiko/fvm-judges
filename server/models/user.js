const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['judge', 'admin'],
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  marks: {},
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'fvmisthebest');
  return token;
};

const User = mongoose.model('users', userSchema);

module.exports = User;

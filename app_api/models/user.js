const mongoose = require('../../config/mongoose');

const userSchema = new mongoose.Schema({
  email:    {type: String, require: true, unique: true},
  name:     {type: String, require: true},

  answers:    [],
  score:      {type: Number, default: 0},
  totalTime:  {type: Number, default: 0},
});

userSchema.methods.publicUser = function() {
  const {
    _id,
    email,
    name,
    answers,
    score,
    totalTime
  } = this;
  return {
    id: _id,
    email,
    name,
    answers,
    score,
    totalTime
  };
};

module.exports = mongoose.model('User', userSchema);
const mongoose = require('../../config/mongoose');

const EXPIRES = 60 * 60; // 1h

const tokenSchema = new mongoose.Schema({
  userId:     {type: mongoose.Schema.Types.ObjectId, require: true},
  createdAt:  {type: Date, default: Date.now, expires: EXPIRES}
});

module.exports = mongoose.model('Token', tokenSchema);
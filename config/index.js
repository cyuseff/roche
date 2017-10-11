require('dotenv').config();
const path = require('path');
const mongoose = require('./mongoose');

module.exports = app => {
  app.set('view engine', 'ejs');
  app.set('views', path.resolve(__dirname, '../views'));
};
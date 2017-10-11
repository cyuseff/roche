const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Create app
const app = express();

// Config app
const conf = require('./config')(app);

// Middlewares
if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
app.use(express.static(__dirname + '/public', {index: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
require('./app_api/routes')(app);
app.get('*', (req, res) => res.render('./index'));

module.exports = app;

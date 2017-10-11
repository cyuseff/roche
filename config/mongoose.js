const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI;

/** Events **/
mongoose.connection
	.on('connected', () => console.log(`Mongoose connected to: ${MONGO_URI}`))
	.on('error', err => console.log(`Mongoose connected error: ${err}`))
	.on('disconected', () => console.log('Mongoose disconected'));

const gracefulShutdown = (msg, callback) =>
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through: ${msg}`);
    callback();
  });

/*Close mongodb connection*/
process
  .on('SIGINT', () =>
    gracefulShutdown('App termination', () => process.exit(0)))
	.on('SIGTERM', () =>
		gracefulShutdown('Heroku app shutdown', () => process.exit(0))
	);

mongoose.connect(MONGO_URI);

module.exports = mongoose;

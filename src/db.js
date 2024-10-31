const mongoose = require('mongoose');
const config = require('./config');

function initMongoSession() {
  mongoose.connect(config.dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error'));
  db.on('connected', console.log.bind(console, 'Connected to MongoDB'))
  db.on('disconnected', console.error.bind(console, 'Disconnected from MongoDB'))
  db.on('reconnect', console.warn.bind(console, 'Reconnected to MongoDB'))
  return db;
}
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection is disconnected due to application termination');
    process.exit(0);
  });
});

module.exports = { initMongoSession };
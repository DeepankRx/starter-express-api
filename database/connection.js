const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/anime_ecommerce',
  {
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log(`Connected to ${process.env.MONGODB_URI}`)
});

connection.on('error', (err) => {
  console.log(
    'MongoDB connection error. Please make sure MongoDB is running. ' + err
  );
  process.exit();
});

module.exports = connection;
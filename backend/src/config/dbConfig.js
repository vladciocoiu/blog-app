const mongoose = require('mongoose');

// load .env file
require('dotenv').config()

// connect to db
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// print errors
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

module.exports = db;
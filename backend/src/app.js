const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// load .env file
require('dotenv').config();

// get db connection
const db = require('./config/dbConfig');

const app = express();

app.use(cors({
    origin: [
        'http://127.0.0.1:3000',
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

// import and use routes
const apiRouter = require('./routes/index');
app.use('/api', apiRouter);

module.exports = app;

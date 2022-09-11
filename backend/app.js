const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

// load .env file
require('dotenv').config();

// get db connection
const db = require('./src/config/dbConfig');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

// import and use routes
const apiRouter = require('./src/routes/index');
app.use('/api', apiRouter);

module.exports = app;

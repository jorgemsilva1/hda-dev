// imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRouter = require('./services/auth/auth.router');

const app = express();
var port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route
app.use('/auth', authRouter);

module.exports = app;
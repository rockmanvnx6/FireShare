const express = require('express');
const Database = require("mongoose");
const log = require("morgan");
const environment = require('dotenv');
const cors = require('cors');
const bodyParser = require("body-parser");
const guestRoute = require('./api/AuthorizeRoute');
const authRoute = require('./api/AuthorizedRoute')
const app = express();

environment.config();

Database.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true });

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, auth-token"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(log("dev"));

app.use('/', guestRoute);
app.use('/user', authRoute);

module.exports = app;
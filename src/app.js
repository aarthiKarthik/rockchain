'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const log = require('npmlog-ts');

//const config = require('./config/api-config');
//config.setEnv(process.env.NODE_ENV);
//console.log("process.env.NODE_ENV = "+process.env.NODE_ENV);
//const configProperties = config.getProps();

const api = require('./apiGw');
const router = express.Router();

// <TODO> Move PORT config to api-config
const PORT = 3200; //configProperties.port;

app.use(bodyParser.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


app.use(function(req, res, next) {
    console.log('here >>>>')
    next();
});

api.init(router);
app.use("/", router);

//handle bad calls
app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

//handle unhandled promise rejects
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason)
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`api services running on port: ${PORT}`);
});

module.exports = app;

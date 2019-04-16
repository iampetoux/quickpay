var express = require('express'),
    hostname = 'localhost',
    port = 3000,
    app = express(),
    bodyParser = require("body-parser"),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken');
let mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var authURL = 'mongodb+srv://lusky75:iiluskyii75@cluster0-nxj2d.mongodb.net/test?retryWrites=true';
mongoose.connect(authURL, { useCreateIndex: true, useNewUrlParser: true });

var RouterAPI = require('./routes/RouterAPI').router;

app.use(RouterAPI);

app.listen(port, hostname, function(){
    console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});

/*
var express = require('express');
var bodyPaser = require('body-parser');
var apiRouter = require('./apiRouter').router;

var server = express();

server.use(bodyPaser.urlencoded({ extended: true }));
server.use(bodyPaser.json());

server.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur o mon serveur</h1>');
});

server.listen(8080, function(){
    console.log('Server');
})
*/
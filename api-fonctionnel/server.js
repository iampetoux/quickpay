const dotenv = require('dotenv');

dotenv.config();

var express = require('express'),
    hostname = process.env.HOST,
    port = process.env.PORT,
    app = express(),
    bodyParser = require("body-parser"),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let authURL = process.env.MONGO_URL
try {
    mongoose.connect(authURL, { useCreateIndex: true, useNewUrlParser: true });
} catch (err) {
    console.log(err)
}

var userAPI = require('./routes/RouterAPI').user;
app.use('/user', userAPI);
app.use('/uploads',express.static('uploads'));
app.listen(port, hostname, function(){
    console.log("Mon serveur fonctionne sur http://" + process.env.HOST + ":" + process.env.PORT);
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
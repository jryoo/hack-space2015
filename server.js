'use strict';

var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');
var router = require('./config/routes');
var server = null;

http.globalAgent.maxSockets = 100;

var app = express();
app.set('port', process.env.PORT || 8081);

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, '/public/views'));
    app.engine('html', require('ejs').renderFile);
    app.use(app.router);
    app.use(express.logger());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

router(app);

server = http.createServer(app).listen(app.get('port'), function () {
    console.log('health-demo');
    console.log('---------------------');
    console.log('           port: %d', app.get('port'));
});
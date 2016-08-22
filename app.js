var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");

var app = function() {
    var server;
    app = express();
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/v1/phings/:id', require('./routes/read'));
    app.post('/v1/phings/', require('./routes/create'));

    if(!module.parent) {
        server = app.listen(3000, function(){
            console.log('App is now listening v4');
        });
    }

    return {
        app: app,
        stopServer: function() {
            if (server ==null) {
                return;
            }
            server.close();
        }
    }
};

module.exports = app();
//try wrapping app and stopping and starting in tests to avoid gulp hang
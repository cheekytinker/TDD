var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/v1/phings/:key', require('./routes/read'));
app.post('/v1/phings/', require('./routes/create'));

if(!module.parent) {
    app.listen(3000, function(){
        console.log('App is now listening v4');
    });
}

module.exports = app;
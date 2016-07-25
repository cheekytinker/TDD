var express = require('express');
app = express();

app.get('/v1/phings/:key', require('./routes/read'));
app.post('/v1/phings/:key', require('./routes/create'));

if(!module.parent) {
    app.listen(3000, function(){
        console.log('App is now listening');
    });
}

module.exports = app;
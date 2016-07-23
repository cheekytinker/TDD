var express = require('express');
app = express();

app.get('/v1/phings/:key', require('./routes/read'));

if(!module.parent) {
    app.listen(3000, function(){
        console.log('App is now listening');
    });
}

module.exports = app;
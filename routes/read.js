
var mongodb = require("mongodb");

module.exports = function(req, res){
    readMongoDocs(req.params.id, function(error, results) {
        if (error != null) {
            res
                .status(500)
                .json({message:"Problem:" + error});
            return;
        }
        return res
            .status(200)
            .json(results);
    });


    function readMongoDocs(id, callback) {
        var uri = 'mongodb://mongo:27017/phingnet';
        mongodb.MongoClient.connect(uri, function(error, db){
            if (error) {
                console.log(error);
                callback(error, null);
                return;
            }

            db.collection("phing").find({_id:id}).toArray(function(error, results) {
                if (error) {
                    console.log(error);
                    callback(error, null);
                    return;
                }
                callback(error, results);
            });

        });
    }
};
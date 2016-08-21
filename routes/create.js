var phingValidator = require("../validators/phingValidator");
var mongodb = require("mongodb");

module.exports = function(req, res){

    if (!phingValidator.isValid(req.body)) {
        res
            .status(400)
            .json({
                "message":"name not valid"
            });
        return;
    }
    createMongoDoc(req.body, function(error, id) {
        if (error != null) {
            res
                .status(500)
                .json({
                    "message":"Problem:" + error
                });
            return;
        }
        var obj = { id:id };
        console.log(obj);
        res
            .status(201)
            .json(obj);
    });

    function createMongoDoc(doc, callback) {
        var uri = 'mongodb://mongo:27017/phingnet';
        mongodb.MongoClient.connect(uri, function(error, db){
            if (error) {
                console.log(error);
                callback(error, null);
                return;
            }

            db.collection("phing").insertOne(doc, function(error) {
                if (error) {
                    console.log(error);
                    callback(error, null);
                    return;
                }
                var id = doc._id;
                console.log("Inserted" + id);
                callback(error, id);
            });

        });
    }
};
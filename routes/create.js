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
        var obj = { id:id };
        console.log(obj);
        res
            .status(201)
            .json(obj);
        return;
    });

    function createMongoDoc(doc, callback) {
        var uri = 'mongodb://localhost:27017/phingnet';
        var mongoClient = mongodb.MongoClient.connect(uri, function(error, db){
            if (error) {
                console.log(error);
                callback(error, null);
                return;
            }

            db.collection("phing").insertOne(doc, function(error, result) {
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
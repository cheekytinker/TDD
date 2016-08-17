var phingValidator = require("../validators/phingValidator");
var mongodb = require("mongodb");

module.exports = function(req, res){
    function createMongoDoc(doc) {
        var uri = 'mongodb://localhost:27017';
        var mongoClient = mongodb.MongoClient.connect(uri, function(error, db){
            if (error) {
                console.log(error);
                return;
            }

            db.collection("phing").insertOne(doc, function(error, result) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log("Inserted" + result);
                db.collection("phing").find().toArray(function(error, docs) {
                    return docs;
                });
            });

        });
        //mongodb.MongoClient.connect(uri, function(error, db) {
    }



    if (!phingValidator.isValid(req.body)) {

        return res
            .status(400)
            .json({
                "message":"name not valid"
            });
    }
    var docs = createMongoDoc(req.body);
    return res
        .status(201)
        .json(docs);
};
var supertest = require("supertest");
var app = require("../../app");
var mongodb = require("mongodb");

describe('when reading a phing', function() {

    before(function(done) {
        console.log("Before");
        done();
    });

    after(function(done) {
        console.log("After");
        app.stopServer();
        done();
    });

    var createTestDoc = function (doc, callback) {
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
    };
    var testId;
    before(function(done) {
       createTestDoc({name:"My123"}, function(error, id) {
           testId = id;
           done();
       });
    });

    it('should return 200 if read successful', function(done){
       supertest(app.app)
           .get("/v1/phings/" + testId)
           .expect(200)
           .end(done);
    });

    it('should return phing with id if read successful', function(done){
        supertest(app.app)
            .get("/v1/phings/" + testId)
            .expect(200)
            .expect(function(res) {
                return res.id != null && res.id.length > 1;
            })
            .end(done);
    })
});


var supertest = require("supertest");
var app = require("../../app");

describe('when reading a phing', function() {
    it('should return 200 if read successful', function(done){
       supertest(app)
           .get("/v1/phings/123")
           .expect(200)
           .end(done);
    });

    it('should return phing with key if read successful', function(done){
        supertest(app)
            .get("/v1/phings/123")
            .expect(200, {
                key: "123"
            })
            .end(done);
    })
});


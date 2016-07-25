var supertest = require("supertest");
var app = require("../../app");

describe('when writing a phing', function() {
    it('should return 201 if write successful', function (done) {
        supertest(app)
            .post("/v1/phings/")
            .send({name: "myphing"})
            .expect(201)
            .end(done);
    });

    it("should return 400 if required name not passed", function (done){
        supertest(app)
            .post("/v1/phings/")
            .send({name:""})
            .expect(400)
            .end(done);
    });

    it("should return key", function (done){
        supertest(app)
            .post("/v1/phings/")
            .send({name:"myname"})
            .expect(201, {
                key:"123"
            })
            .end(done);
    });
});
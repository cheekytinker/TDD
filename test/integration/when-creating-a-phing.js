var supertest = require("supertest");
var app = require("../../app");

describe('when creating a phing', function() {

    before(function(done) {
        console.log("Before");
        done();
    });

    after(function(done) {
        console.log("After");
        app.stopServer();
        done();
    });


    it('should return 201 if write successful', function (done) {
        supertest(app.app)
            .post("/v1/phings/")
            .send({name: "myphing"})
            .expect(201)
            .end(done);


    });

    it("should return 400 if required name not passed", function (done){
        supertest(app.app)
            .post("/v1/phings/")
            .send({name:""})
            .expect(400)
            .end(done);
    });

    it("should return id", function (done){
        supertest(app.app)
            .post("/v1/phings/")
            .send({name:"myname"})
            .expect(201)
            .expect( function(res) {
                return res.id != null && res.id.length > 0;
            })
            .end(done);
    });
});
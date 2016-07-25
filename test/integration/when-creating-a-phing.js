var supertest = require("supertest");
var app = require("../../app");

describe('when writing a phing', function() {
    it('should return 201 if write successful', function (done) {
        supertest(app)
            .post("/v1/phings/123")
            .send({name: "myphing"})
            .expect(201)
            .end(done);
    });
});
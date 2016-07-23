var supertest = require("supertest");
var app = require("../../app");

describe('when calling api', function() {
       it('should_return_200_if_read_successful', function(done){
           supertest(app)
               .get("/v1/phings/123")
               .expect(200)
               .end(done);
       })
});


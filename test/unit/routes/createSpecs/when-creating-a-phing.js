var sinon = require("sinon");
var assert = require("assert");

var phingValidator = sinon.spy(require("../../../../validators/phingValidator"), "isValid");

var create = require("../../../../routes/create");

describe("routes/create specs", function() {
    describe("when creating a phing", function() {
        it("should ask phingValidator if phing valid", function(done) {
            var phing = {name:"MyPhing"};
            var req = {body:phing};
            var res = {
                status: function() {return this;},
                json: function() {return this;}
            };


            create(req, res);
            assert(phingValidator.withArgs(phing).calledOnce);
            done();
        }) ;

        it("should return 201 if phing valid", function(done) {
            var phing = {name:"MyPhing"};
            var req = {body:phing};
            var res = {
                status: function() {return this;},
                json: function() {return this;}
            };

            var status = sinon.spy(res, "status");
            sinon.stub(res, "json", function(error, result) {
                assert(status.withArgs(201).calledOnce);
                done();
            });
            create(req, res);
        });

        it("should return 400 if phing not valid", function(done) {
            var phing = {name:null};
            var req = {body:phing};
            var res = {
                status: function() {return this;},
                json: function() {return this;}
            };

            var status = sinon.spy(res, "status");
            create(req, res);
            assert(status.withArgs(400).calledOnce);
            done();
        });

        it("should return useful message if phing name valid", function(done) {
            var phing = {name:null};
            var req = {body:phing};
            var res = {
                status: function() {return this;},
                json: function() {return this;}
            };

            var json = sinon.spy(res, "json");
            create(req, res);
            assert(json.withArgs({message:"name not valid"}).calledOnce);
            done();
        });
    });
});

var phingValidator = require("../validators/phingValidator");

module.exports = function(req, res){
    if (!phingValidator.isValid(req.body)) {
        return res
            .status(400)
            .json({
                "message":"name not valid"
            });
    }
    return res
        .status(201)
        .json({
        key: "123"
    });
};
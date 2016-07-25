module.exports = function(req, res){
    return res
        .status(201)
        .json({
        key: req.params.key
    });
};
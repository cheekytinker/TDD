
module.exports = function(req, res){
    return res.json({
        key: req.params.key
    });
};
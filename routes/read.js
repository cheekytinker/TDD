
module.exports = function(req, res){
    return res.json({
        id: req.params.id
    });
};
module.exports = {
    isValid : function(phing) {
        if (phing == null) {
            return false;
        }
        if (phing.name == null) {
            return false;            
        }
        if (phing.name.length < 1) {
            return false;
        }
        return true;
    }
};
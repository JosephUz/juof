var exports = {};

exports.derived = function (type, base) {
    function control(type) {
        if (type.prototype.__proto__ == Object.prototype)
            return false;
        else if (type.prototype.__proto__ == base.prototype)
            return true;
        else
            return control(type.prototype.__proto__.constructor);
    }
    return control(type);
}

exports.clone = function (type) {
    function clone() {
        var result = type.apply(this, arguments);
        if (result) return result;
    }
    var fn = clone.toString().replace(/(clone)/g, type.name);
    var ju = new Function("type", "return " + fn + ";")(type);

    ju.prototype.__proto__ = type.prototype;

    return ju;
}

module.exports = exports;
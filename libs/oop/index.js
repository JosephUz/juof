var exports = {};

exports.abstract = function (type) {
    function abstract() {
        var scope = this;

        if (!(this instanceof abstract))
            scope = {};

        if (scope.constructor == type)
            throw Error(type.name + " instance can not be created!");

        var result = type.apply(scope, arguments);

        if (result) return result;
    }
    var fn = abstract.toString().replace(/(abstract)/g, type.name);
    var ju = new Function("type", "return " + fn + ";")(type);

    ju.prototype = type.prototype;

    return ju;
}

exports.inherit = function (type, base) {
    function inherit() {
        var result = null, scope = this;

        if (!(this instanceof inherit))
            scope = {};

        arguments.length++;
        arguments[arguments.length - 1] = inherit;
        result = base.apply(scope, arguments);

        arguments[arguments.length - 1] = base;
        // classes return their instance. also do not make a return
        // so if there is a return, do not call type constructor
        // but call only base constructor so that you can be managed from one place
        if (!result)
            result = type.apply(scope, arguments);

        if (result) return result;
    }
    var fn = inherit.toString().replace(/(inherit)/g, type.name);
    var ju = new Function("type", "base", "return " + fn + ";")(type, base);

    ju.prototype = type.prototype;
    ju.prototype.__proto__ = base.prototype;

    return ju;
}

module.exports = exports;
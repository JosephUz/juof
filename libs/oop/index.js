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
        var scope = this;

        Object.defineProperties(scope, {
            super: {
                get: function () {
                    return (function () {
                        base.apply(scope, arguments);
                    }).bind(scope)
                }
            }
        });

        type.apply(scope, arguments);
    }
    var fn = inherit.toString().replace(/(inherit)/g, type.name);
    var ju = new Function("type", "base", "return " + fn + ";")(type, base);

    ju.prototype = type.prototype;
    ju.prototype.__proto__ = base.prototype;

    return ju;
}

module.exports = exports;
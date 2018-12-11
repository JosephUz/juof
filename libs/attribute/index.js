var exports = {}, key = Symbol("juattributes"), pure = Symbol("jupure");

var juoop = require("../../libs/oop");
var jutype = require("../../libs/type");
var JuAttribute = require("../../libs/attribute/juattribute.js");

exports.inherit = function (attr) {
    if (typeof (attr) !== "function")
        throw new Error("attr parameter must be function.");

    return juoop.inherit(attr, JuAttribute);
}

exports.bind = function (func, attr) {
    if (typeof (func) !== "function")
        throw new Error("func parameter must be function.");

    if (typeof (attr) !== "function" || !jutype.derived(attr, JuAttribute))
        throw new Error("attr parameter must inherit from Ju Attribute.");

    var attributes = [attr];
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            if (typeof (arguments[i]) == "function" && jutype.derived(arguments[i], JuAttribute)) {
                attributes.push(arguments[i]);
            }
        }
    }

    if (func[pure]) {
        func[key].forEach(function (attr) {
            attributes.unshift(attr);
        });
        func = func[pure];
    }

    var fn = bind.toString().replace(/bind/g, func.name);
    var ju = new Function("func", "attributes", "key", "return " + fn + ";")(func, attributes, key);
    ju.prototype = func.prototype;
    ju[pure] = func;
    ju[key] = attributes;

    function bind() {
        var scope = this, args = arguments;
        var i = 0;
        var result = null;
        function next(attr) {
            if (attr) {
                scope[key] = [];
                var attrInstance = new attr(scope, args, function () {
                    next(attributes[++i]);
                });
                result = attrInstance.result || result;
                scope[key].unshift(attrInstance);
            } else {
                result = func.apply(scope, args);
            }
        }
        next(attributes[i]);
        if (result) return result;
    }

    return ju;
}

exports.getAppliedAttributes = function (scope, attr) {
    if (attr) {
        return (scope[key] || []).filter(function (item) {
            return item.constructor.name == attr.name;
        });
    } else {
        return scope[key];
    }
}

exports.getBoundAttributes = function (func, attr) {
    if (attr) {
        return (func[key] || []).filter(function (item) {
            return item == attr;
        });
    } else {
        return func[key] || [];
    }
}

exports.getAttributeResult = function (scope) {
    var result = null;
    exports.getAppliedAttributes(scope).forEach(function (attr) {
        result = attr.result || result;
    });
    if (result)
        return result;
    else
        return scope;
}

module.exports = exports;
var JuFunction = require("./jufunction.js");

var exports = {};

exports.create = function (query, fn) {
    return new JuFunction(query, fn);
}

exports.define = function (scope, query, fn) {
    var instance = new JuFunction(query, fn).bind(scope);
    scope[instance.name] = instance;
    return instance;
}

exports.each = function (scope, eachFn) {
    Object.keys(scope).forEach(function (key) {
        if (scope[key] instanceof JuFunction) {
            eachFn(scope[key]);
        }
    });
}

module.exports = exports;
var JuFunction = require("./jufunction.js");

var exports = {};

exports.create = function (query, fn) {
    return new JuFunction(query, fn);
}

exports.define = function (scope, query, fn) {
    var key = fn.name;
    scope[key] = new JuFunction(query, fn).bind(scope);
    return scope[key];
}

exports.each = function (scope, eachFn) {
    Object.keys(scope).forEach(function (key) {
        if (scope[key] instanceof JuFunction) {
            eachFn(scope[key]);
        }
    });
}

module.exports = exports;
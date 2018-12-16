var exports = {};

var jutype = require("./libs/type");
var juattr = require("./libs/attribute");
var juoop = require("./libs/oop");
var jufn = require("./libs/function");

exports.abstract = juoop.abstract;

exports.inherit = juoop.inherit;

exports.type = jutype;

exports.attribute = juattr;

exports.function = jufn;

module.exports = exports;
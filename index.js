var exports = {};

var jutype = require("./libs/type");
var juattr = require("./libs/attribute");
var juoop = require("./libs/oop");

exports.abstract = juoop.abstract;

exports.inherit = juoop.inherit;

exports.type = jutype;

exports.attribute = juattr;

module.exports = exports;
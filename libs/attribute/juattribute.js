var juoop = require('../../libs/oop');
var jutype = require('../../libs/type');

function JuAttribute(scope, scopeArgs, cb) {
    this.status = 'done function not called.';
    this.scope = scope;
    this.scopeArguments = scopeArgs;

    Object.defineProperties(this, {
        result: {
            get: function () {
                return this._result;
            },
            set: function (value) {
                this._result = value;
                this.done();
            }
        }
    });

    this.error = function (err) {
        this.status = err;
    }

    this.done = function (err) {
        if (err) {
            this.status = err;
        } else {
            this.status = "OK";
        }
        if (cb) cb();
    }

    try {
        if (!(this instanceof JuAttribute)) {
            var newAttr = jutype.clone(arguments[arguments.length - 1]);
            var args = arguments;
            newAttr.prototype.arguments = Array.prototype.filter.call(args, function (arg, i) { return i < args.length - 1; });
            return newAttr;
        }
    } catch (err) {
        if (err.message == "Cannot read property 'name' of undefined")
            throw new Error("JuAttribute is not called as a function.");
        else
            throw err;
    }
}

JuAttribute.prototype.arguments = [];

JuAttribute.prototype.check = function (status) {
    return this.status == status || (!status && this.status == "OK");
}

JuAttribute = juoop.abstract(JuAttribute);

module.exports = JuAttribute;
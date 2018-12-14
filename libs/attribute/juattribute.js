var juoop = require('../../libs/oop');
var jutype = require('../../libs/type');

function JuAttribute(scope, scopeArgs, next) {
    if (this instanceof JuAttribute) {
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
            if (next) next();
        }
    } else if (typeof (scope) == "function" && scopeArgs && scopeArgs.length) {
        var newAttr = jutype.clone(scope);
        newAttr.prototype.arguments = Array.prototype.map.call(scopeArgs, function (arg) { return arg; });
        return newAttr;
    } else {
        throw new Error("JuAttribute is not called as a function.");
    }
}

JuAttribute.prototype.arguments = [];

JuAttribute.prototype.check = function (status) {
    return this.status == status || (!status && this.status == "OK");
}

JuAttribute = juoop.abstract(JuAttribute);

module.exports = JuAttribute;
var juof = require('../../../');

// A new attribute is generated.
RunMethodAttribute = juof.attribute.inherit(RunMethodAttribute);

// Representative user operations class.
function Method(user) {
    this.user = user;
}

Method.prototype.main = function main() {
    console.log(this.user.name + " run main method.");
}

Method.prototype.report = function report() {
    console.log(this.user.name + " run report method.");
}

Method.prototype.user = function user() {
    console.log(this.user.name + " run user method.");
}

Method.prototype.permission = function permission() {
    console.log(this.user.name + " run permission method.");
}

Method.prototype.message = function message() {
    console.log(this.user.name + " run message method.");
}

Object.keys(Method.prototype).forEach(function (key) {
    // Attribute is bound to Method prototypes.
    Method.prototype[key] = juof.attribute.bind(Method.prototype[key], RunMethodAttribute(key));
});

// The attribute that method execution according to the user's presence.
function RunMethodAttribute(method) {
    var user = this.scope.user;
    if (user.instanceId) {
        console.log(user.name + " wanted to run the " + method + " method.");
        this.done();
    } else {
        console.log("there is no user so " + method + " method can not be run.");
    }
    console.log("----------------------------------------------------");
}

module.exports = Method;
var juof = require('../../../');
var User = require('./user.js');
var Method = require('./method.js');

// The authorities of the users are kept in this variable.
var userPermissions = {};

// A new attribute is generated.
JuUserAttribute = juof.attribute.inherit(JuUserAttribute);
// Attribute is bound to user object.
User = juof.attribute.bind(User, JuUserAttribute);

// A new attribute is generated.
MethodPermissionAttribute = juof.attribute.inherit(MethodPermissionAttribute);
Object.keys(Method.prototype).forEach(function (key) {
    // Attribute is bound to Method prototypes.
    Method.prototype[key] = juof.attribute.bind(Method.prototype[key], MethodPermissionAttribute(key));
});

// The attribute that sets the method field of the user class.
function JuUserAttribute() {
    this.done();

    var user = this.scope;
    user.method = {};

    var method = new Method(user);
    Object.keys(Method.prototype).forEach(function (key) {
        user.method[key] = {
            run: function () {
                method[key]();
            },
            allow: function () {
                var permissions = userPermissions[user.id] || [];

                if (permissions.indexOf(key) == -1)
                    permissions.push(key);

                userPermissions[user.id] = permissions;
            },
            block: function () {
                var permissions = userPermissions[user.id] || [];

                permissions.splice(permissions.indexOf(key), 1);
            }
        };
    });
}

// The attribute that controls method permissions.
function MethodPermissionAttribute(method) {
    var user = this.scope.user;
    if (!user.instanceId) {
        this.error("The user has been deleted.");
        console.log(this.status);
    } else if (!userPermissions[user.id] || userPermissions[user.id].indexOf(method) == -1) {
        this.error(user.name + " has no authority for " + method + ".");
        console.log(this.status);
    } else {
        this.done();
    }
}

module.exports = User;
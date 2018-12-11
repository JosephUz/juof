var juof = require('../../../');

// Representative database variable.
var users = [
    { id: 1, name: "Selçuk", gender: "male" },
    { id: 2, name: "Nurhan", gener: "female" },
    { id: 3, name: "Ebru", gener: "female" },
    { id: 4, name: "Yusuf", gender: "male" },
    { id: 5, name: "Muharrem", gender: "male" },
    { id: 6, name: "Ayda", gener: "female" }
];

// A new attribute is generated.
UserAttribute = juof.attribute.inherit(UserAttribute);
// Attribute is bound to user class.
User = juof.attribute.bind(User, UserAttribute);

// Representative of the logged-on user class.
function User(id) {
    this.id = id;
    this.name;
    this.instanceId;
    this.method;
}

// Representative of the logged-out process.
User.prototype.clear = function () {
    this.id = null;
    this.name = null;
    this.instanceId = null;
    return null;
}

// The attribute that sets the user's database object for id.
function UserAttribute() {
    var userId = this.scopeArguments[0];
    var user = users.filter(function (item) {
        return item.id == userId;
    })[0];

    if (user) {
        this.scope.name = user.name;
        this.scope.instanceId = new Date().getTime();
        this.done();
    } else {
        this.done("there is no user of this id.");
        this.scope.id = null;
        this.scope.instanceId = null;
    }
}

module.exports = User;
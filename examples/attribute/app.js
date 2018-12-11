var JuUser = require("./user");

// Create object for user with 4 id.
var yusuf = new JuUser(4);
// The object is not deleted, but the instanceId and other fields are deleted.
yusuf.clear();
// This will stop the execution of the methods.
yusuf.method.main.run();

// Create object for user with 4 id.
yusuf = new JuUser(4);
// Method is executed without authorization.
yusuf.method.main.run();

// Authorized for method.
yusuf.method.main.allow();
// Now method executable.
yusuf.method.main.run();
// But other non-authoritative methods can not be executed.
yusuf.method.message.run();

// The object is not deleted, but the instanceId and other fields are deleted.
yusuf.clear();
// This will stop the execution of the methods.
yusuf.method.message.run();

// Create object for user with 4 id.
yusuf = new JuUser(4);
// Method can be executed because it is already authorized.
yusuf.method.main.run();

// Method authority is removed.
yusuf.method.main.block();
// so it can not be run.
yusuf.method.main.run();

// Create object for user with 7 id.
var nouser = new JuUser(7);
// Method can not be executed because there is no user with this id
nouser.method.main.run();
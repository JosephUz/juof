var juof = require('../../');

// when we want to define a function within an object
// we can write as follows
var scope = {
    auth: false,
    log: function (text) {
        console.log(text);
    }
};

// usage of defined function.
scope.log("Hello, JosephUz");

// well we want to run scope log, when scope has auth field that is true
// we can write as follows
if (scope.auth)
    scope.log("Hello, JosephUz");
else
    console.log("scope log did not run.");

// or
scope.log = function (text) {
    if (scope.auth)
        console.log(text);
    else
        console.log("scope log did not run.");
}
scope.auth = true;
scope.log("Hello, JosephUz");

/**
 * We can write it like this in the old way. But when we write the 
 * code in this way, we have to add each rule into the log function 
 * or we have to do the controls wherever we use it.
 * 
 * Instead, we can use juof attributes.
 *  */

// Define scope in scope.js file.
scope = {
    auth: false,
    log: function (text) {
        console.log(text);
    }
};

// Define attribute for controller auth in another js file.
var Auth = juof.attribute.inherit(function Auth() {
    if (this.scope.auth)
        this.done();
    else
        console.log("scope log did not run.");
});
scope.log = juof.attribute.bind(scope.log, Auth);

// Write usage log function in another js file.
scope.log("Hello, JosephUz");

// Set auth true.
scope.auth = true;
scope.log("Hello, JosephUz");

/**
 * In this way, using the Juof-attributes, the scope.log can be run
 * before and after the control functions.
 * 
 * But writing bind processes will have a bit of a challenge in 
 * having a lot of functions like scope log and will make searching 
 * difficult for codes.
 * 
 * that is why it will be more organized and easier if the log 
 * function is defined while hosting its own tags and managing a
 * general place for these variables.
 *  */

// Define scope in scope.js file.
scope = {
    auth: false
};

juof.function.define(scope, "log", "auth:true", function (text) {
    console.log(text);
});

// Define attribute for controller auth in another js file.
var Auth = juof.attribute.inherit(function Auth() {
    if (this.scope.auth)
        this.done();
    else
        console.log("scope log did not run.");
});

// Bind all controller attributes with all functions like scope log in another js file.
juof.function.each(scope, function (key, instance) {
    if (instance.tags.auth)
        instance.value(juof.attribute.bind(instance.function, Auth));
});

// Write usage log function in another js file.
scope.log.run("Hello, JosephUz");

// Set auth true.
scope.auth = true;
scope.log.run("Hello, JosephUz");

// Set auth false.
scope.auth = false;
// Auth controller block run.
scope.log.run("Hello, JosephUz");
// but in this way, original function still run.
// because manipulated function field bound of attributes. Not pure function.
scope.log.pure("Hello, JosephUz");
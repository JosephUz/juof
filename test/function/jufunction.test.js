var JuFunction = require('../../libs/function/jufunction.js');

describe("function jufunction.js test", function () {
    it("requiring JuFunction", function (done) {
        try {
            if (JuFunction.name == "JuFunction")
                done();
            else
                done(new Error("require JuFunction is not working."));
        } catch (err) {
            done(err);
        }
    });

    it("catching usage as a function error", function (done) {
        try {
            JuFunction();
            done(new Error("catching usage as a function error is not working."));
        } catch (err) {
            if (err.message == "JuFunction is not a function.")
                done();
            else
                done(err);
        }
    });

    it("catching any arguments usage error", function (done) {
        try {
            var instance = new JuFunction();
            done(new Error("catching any arguments usage error is not working."));
        } catch (err) {
            if (err.message == "function not specified.")
                done();
            else
                done(err);
        }
    });

    it("creating new instance from JuFunction", function (done) {
        try {
            var fn = function () { };
            var instance = new JuFunction(fn);
            if (instance.query == "" && instance.original == fn && instance.function == fn && instance instanceof JuFunction) {
                done();
            } else {
                done(new Error("creating new instance from JuFunction is not working."));
            }
        } catch (err) {
            done(err);
        }
    });

    it("creating new instance with query from JuFunction", function (done) {
        try {
            var fn = function () { };
            var query = "";
            var instance = new JuFunction(query, fn);
            if (instance.query == query && instance.original == fn && instance.function == fn && instance instanceof JuFunction) {
                done();
            } else {
                done(new Error("creating new instance with query from JuFunction is not working."));
            }
        } catch (err) {
            done(err);
        }
    });

    it("number, boolean, string and array usage in query", function (done) {
        try {
            var instance = new JuFunction("number:0;boolean:true;string:text;array:one,two", function () { });
            if (instance.tags.number === 0 && instance.tags.boolean === true && instance.tags.string == "text" && instance.tags.array[1] == "two") {
                done();
            } else {
                done(new Error("number, boolean, string and array usage in query is not working."));
            }
        } catch (err) {
            done(err);
        }
    });

    it("binding scope and running function", function (done) {
        try {
            var scope = {};
            var fn = function () { return this; };
            var instance = new JuFunction(fn).bind(scope);
            if (instance.scope == scope && instance.original == fn && instance.run() == scope) {
                done();
            } else {
                done(new Error("binding scope is not working."));
            }
        } catch (err) {
            done(err);
        }
    });

    it("setting function", function (done) {
        try {
            var scope = {};
            var fn = function () { return this; };
            var instance = new JuFunction(fn);
            if (instance.function == fn && instance.run() !== scope && instance.value() == fn) {
                instance.value(fn.bind(scope));
                if (instance.scope != scope && instance.original == fn && instance.value() != fn && instance.run() == scope) {
                    done();
                } else {
                    done(new Error("setting function is not working."));
                }
            } else {
                done(new Error("setting function is not working."));
            }
        } catch (err) {
            done(err);
        }
    });

    it("applying scope and arguments", function (done) {
        try {
            var scope = {};
            var instance = new JuFunction(function (arg) {
                if (arg) return arg;
                else return this;
            }).bind(scope);
            if (instance.scope == scope && scope != instance.apply({ n: 1 }) && "arg" === instance.apply(scope, ["arg"])) {
                done();
            } else {
                done(new Error("applying scope is not working."));
            }
        } catch (err) {
            done(err);
        }
    });

    it("call with scope and arguments", function (done) {
        try {
            var scope = {};
            var instance = new JuFunction(function (arg) {
                if (arg) return arg;
                else return this;
            }).bind(scope);
            if (instance.scope == scope && scope != instance.call({ n: 1 }) && "arg" === instance.call(scope, "arg")) {
                done();
            } else {
                done(new Error("call with scope is not working."));
            }
        } catch (err) {
            done(err);
        }
    });

    it("running original", function (done) {
        try {
            var scope = {};
            var instance = new JuFunction(function (arg) {
                if (arg) return arg;
                else return this;
            }).bind(scope);
            if (instance.scope == scope && scope == instance.pure() && "arg" === instance.pure("arg")) {
                done();
            } else {
                done(new Error("running original is not working."));
            }
        } catch (err) {
            done(err);
        }
    });

    it("function name field", function (done) {
        try {
            var instance = new JuFunction(function test() { });
            if (instance.name == "test") {
                done();
            } else {
                done(new Error("function name field is not working."));
            }
        } catch (err) {
            done(err);
        }
    });
});
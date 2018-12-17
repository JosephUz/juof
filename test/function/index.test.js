var jufn = require('../../libs/function');

describe("function index.js test", function () {
    it("usage create function", function (done) {
        try {
            var fn = function () { };
            var query = "number:0;boolean:true;string:text;array:one,two";
            var instance = jufn.create(query, fn);
            if (instance.query == query && instance.original == fn && instance.function == fn && instance.tags.number === 0 && instance.tags.boolean === true && instance.tags.string == "text" && instance.tags.array[1] == "two")
                done();
            else
                done(new Error("usage create function is not working."));
        } catch (err) {
            done(err);
        }
    });

    it("usage define function", function (done) {
        try {
            var scope = {};
            var fn = function test() { };
            var query = "number:0;boolean:true;string:text;array:one,two";
            var instance = jufn.define(scope, query, fn);
            if (instance.query == query && instance.original == fn && instance.tags.number === 0 && instance.tags.boolean === true && instance.tags.string == "text" && instance.tags.array[1] == "two" && scope.test == instance)
                done();
            else
                done(new Error("usage define function is not working."));
        } catch (err) {
            done(err);
        }
    });

    it("usage each function", function (done) {
        try {
            var scope = {};
            var fn = function test() { };
            var query = "number:0;boolean:true;string:text;array:one,two";
            var instance = jufn.define(scope, query, fn);

            jufn.each(scope, function (inst) {
                if (inst.name == "test" && inst == instance) {
                    done();
                } else {
                    done(new Error("usage each function is not working."));
                }
            });
        } catch (err) {
            done(err);
        }
    });
    
    it("usage define function with only function", function (done) {
        try {
            var scope = {};
            var fn = function test() { };
            var instance = jufn.define(scope, fn);
            if (instance.original == fn && scope.test == instance && instance.name == "test")
                done();
            else
                done(new Error("usage define function is not working."));
        } catch (err) {
            done(err);
        }
    });
});
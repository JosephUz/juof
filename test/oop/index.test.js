var juoop = require('../../libs/oop');

describe("oop index.js test", function () {
    it("class abstraction", function (done) {
        function Base() {

        }

        try {
            Base = juoop.abstract(Base);
            var base = new Base();

            done(new Error("abstract function is not working."));
        } catch (err) {
            if (err.message == "Base instance can not be created!")
                done();
            else
                done(new Error("using abstract function throw an unkonwn error."));
        }
    });

    it("field inheritance from base class", function (done) {
        function Base() {
            this.id = 1;
        }

        function Type() {

        }

        try {
            Type = juoop.inherit(Type, Base);
            var type = new Type();

            if (type.id === 1)
                done();
            else
                done(new Error("inherit function is not working."));
        } catch (err) {
            done(new Error("using inherit function throw an unkonwn error."));
        }
    });

    it("prototype inheritance from base class", function (done) {
        function Base() {
            this.id = 1;
        }

        Base.prototype.getId = function () {
            return this.id;
        }

        function Type() {

        }

        try {
            Type = juoop.inherit(Type, Base);
            var type = new Type();


            if (type.getId() === 1)
                done();
            else
                done(new Error("inherit function is not working."));
        } catch (err) {
            done(new Error("using inherit function throw an unkonwn error."));
        }
    });

    it("prototype overriding", function (done) {
        function Base() {
            this.id = 1;
        }

        Base.prototype.getId = function () {
            return this.id;
        }

        function Type() {

        }

        Type.prototype.getId = function () {
            return this.id * 2;
        }

        try {
            Type = juoop.inherit(Type, Base);
            var type = new Type();


            if (type.getId() === 2)
                done();
            else
                done(new Error("inherit function is not working."));
        } catch (err) {
            done(new Error("using inherit function throw an unkonwn error."));
        }
    });

    it("prototype overriding but no changes of base", function (done) {
        function Base() {
            this.id = 1;
        }

        Base.prototype.getId = function () {
            return this.id;
        }

        function Type() {

        }

        Type.prototype.getId = function () {
            return this.id * 2;
        }

        try {
            Type = juoop.inherit(Type, Base);
            var base = new Base();

            var type = new Type();

            if (base.getId() === 1 && type.getId() === 2)
                done();
            else
                done(new Error("inherit function is not working."));
        } catch (err) {
            done(new Error("using inherit function throw an unkonwn error."));
        }
    });

    it("checking last arguments of base and type", function (done) {
        function Base() {
            this.base = "Last argument is " + arguments[arguments.length - 1].name;
        }

        function Type() {
            this.type = "Last argument is " + arguments[arguments.length - 1].name;
        }

        try {
            Type = juoop.inherit(Type, Base);

            var instance = new Type();

            if (instance.base == "Last argument is Type" && instance.type == "Last argument is Base")
                done();
            else
                done(new Error("checking last arguments is not working."));
        } catch (err) {
            done(new Error("there was an error at checking last arguments."));
        }
    });

    it("checking for used as a function", function (done) {
        function Base() {
            this.base = 1;
            return this;
        }

        function Type() {
            this.type = 2;
            return this;
        }

        try {
            Type = juoop.inherit(Type, Base);

            var result = Type();

            if (result.base == 1 && result.type == undefined)
                done();
            else
                done(new Error("checking for used as a function is not working."));
        } catch (err) {
            done(new Error("there was an error at checking for used as a function."));
        }
    });
});
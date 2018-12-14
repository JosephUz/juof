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
            this.super();
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
            this.super();
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
            this.super();
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
            this.super();
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
});
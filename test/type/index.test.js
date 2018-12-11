var juoop = require('../../libs/oop');
var jutype = require('../../libs/type');

describe("type index.js test", function () {
    it("checking derived class from base", function (done) {
        function Base() {

        }

        function FirstType() {

        }

        function SecondType() {

        }

        try {
            FirstType = juoop.inherit(FirstType, Base);
            SecondType = juoop.inherit(SecondType, FirstType);

            if (jutype.derived(SecondType, Base))
                done();
            else
                done(new Error("checking derived class is not working."));
        } catch (err) {
            done(new Error("there was an error at checking the derived class."));
        }
    });

    it("cloning a type", function (done) {
        function Base() {
            this.id = 1;
        }

        function Type() {

        }

        Type.prototype.getId = function () {
            return this.id;
        }

        try {
            Type = juoop.inherit(Type, Base);

            var cloneOfType = jutype.clone(Type);
            var instanceOfCloned = new cloneOfType();

            if (Type !== cloneOfType && instanceOfCloned.getId() == 1)
                done();
            else
                done(new Error("cloning a class is not working."));
        } catch (err) {
            done(new Error("there was an error at cloning a class."));
        }
    });
});
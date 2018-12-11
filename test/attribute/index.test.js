var jutype = require('../../libs/type');
var juattr = require('../../libs/attribute');
var JuAttribute = require('../../libs/attribute/juattribute.js');

describe("attribute index.js test", function () {
    it("deriving a new attribute from JuAttribute", function (done) {
        function TestAttribute() {

        }

        try {
            TestAttribute = juattr.inherit(TestAttribute);

            if (jutype.derived(TestAttribute, JuAttribute))
                done();
            else
                done(new Error("deriving a new attribute from JuAttribute is not working."));
        } catch (err) {
            done(new Error("there was an error at deriving a new attribute from JuAttribute."));
        }
    });

    it("checking juattr.inherit parameter as a function", function (done) {
        try {
            var inherit = juattr.inherit({});
            done(new Error("checking juattr.inherit parameter is not working."));
        } catch (err) {
            if (err.message == "attr parameter must be function.")
                done();
            else
                done(new Error("there was an error at checking juattr.inherit parameter."));
        }
    });

    it("binding an derived attribute to a type", function (done) {
        function TestAttribute() {
            this.scope.id = 1;
            this.done();
        }

        function TestType(text) {
            this.text = text;
        }

        try {
            TestAttribute = juattr.inherit(TestAttribute);
            TestType = juattr.bind(TestType, TestAttribute);

            var instance = new TestType("test");

            if (instance.id == 1 && instance.text == "test")
                done();
            else
                done(new Error("binding an derived attribute is not working."));
        } catch (err) {
            done(new Error("there was an error at binding an derived attribute."));
        }
    });

    it("checking juattr.bind func parameter as a function", function (done) {
        function TestAttribute() {
            this.done();
        }

        try {
            TestAttribute = juattr.inherit(TestAttribute);
            var TestType = juattr.bind({}, TestAttribute);
            done(new Error("checking juattr.bind func parameter is not working."));
        } catch (err) {
            if (err.message == "func parameter must be function.")
                done();
            else
                done(new Error("there was an error at checking juattr.bind parameter."));
        }
    });

    it("checking juattr.bind attr parameter as a function", function (done) {
        function TestType() {

        }

        try {
            TestType = juattr.bind(TestType, {});
            done(new Error("checking juattr.bind attr parameter is not working."));
        } catch (err) {
            if (err.message == "attr parameter must inherit from Ju Attribute.")
                done();
            else
                done(new Error("there was an error at checking juattr.bind parameter."));
        }
    });

    it("binding two derived attributes to a type", function (done) {
        function FirstAttribute() {
            this.scope.first = 1;
            this.done();
        }

        function SecondAttribute() {
            this.scope.second = 2;
            this.done();
        }

        function TestType(text) {
            this.text = text;
        }

        try {
            FirstAttribute = juattr.inherit(FirstAttribute);
            SecondAttribute = juattr.inherit(SecondAttribute);
            TestType = juattr.bind(TestType, FirstAttribute, SecondAttribute);

            var instance = new TestType("test");

            if (instance.first == 1 && instance.second == 2 && instance.text == "test")
                done();
            else
                done(new Error("binding two derived attributes is not working."));
        } catch (err) {
            done(new Error("there was an error at binding two derived attributes."));
        }
    });

    it("sequential execution of subsequently bound attributes", function (done) {
        function FirstAttribute() {
            this.scope.first = 1;
            this.done();
        }

        function SecondAttribute() {
            if (this.scope.first == 1)
                done();
            else
                done(new Error("sequential execution of subsequently bound attributes is not working."));
        }

        function TestType() {

        }

        try {
            FirstAttribute = juattr.inherit(FirstAttribute);
            SecondAttribute = juattr.inherit(SecondAttribute);
            TestType = juattr.bind(TestType, FirstAttribute);
            TestType = juattr.bind(TestType, SecondAttribute);

            var instance = new TestType();
        } catch (err) {
            done(new Error("there was an error at sequential execution of subsequently bound attributes."));
        }
    });

    it("checking juattr.bind a lot of attrs parameter as a function", function (done) {
        function FirstAttribute() {
            this.scope.first = 1;
            this.done();
        }

        function SecondAttribute() {
            this.scope.second = 2;
            this.done();
        }

        function TestType(text) {
            this.text = text;
        }

        try {
            FirstAttribute = juattr.inherit(FirstAttribute);
            TestType = juattr.bind(TestType, FirstAttribute, SecondAttribute);

            var instance = new TestType("test");

            if (instance.first == 1 && instance.second == undefined && instance.text == "test")
                done();
            else
                done(new Error("checking juattr.bind a lot of attrs parameter is not working."));
        } catch (err) {
            done(new Error("there was an error at checking juattr.bind a lot of attrs parameter."));
        }
    });

    it("usage of attribute as a function", function (done) {
        function TestAttribute() {
            this.scope.text = this.arguments[0];
            this.done();
        }

        function TestType() {

        }

        try {
            TestAttribute = juattr.inherit(TestAttribute);
            TestType = juattr.bind(TestType, TestAttribute("test"));

            var instance = new TestType();

            if (instance.text == "test")
                done();
            else
                done(new Error("usage of attribute as a functionr is not working."));
        } catch (err) {
            done(new Error("there was an error at usage of attribute as a function."));
        }
    });

    it("getting attributes of an instance", function (done) {
        function FirstAttribute() {
            this.done();
        }

        function SecondAttribute() {
            this.done();
        }

        function TestType() {

        }

        try {
            FirstAttribute = juattr.inherit(FirstAttribute);
            SecondAttribute = juattr.inherit(SecondAttribute);
            TestType = juattr.bind(TestType, FirstAttribute, SecondAttribute);

            var instance = new TestType();

            var attributesOfInstance = juattr.getAppliedAttributes(instance);
            if (attributesOfInstance[0] instanceof FirstAttribute && attributesOfInstance[1] instanceof SecondAttribute)
                done();
            else
                done(new Error("getting attributes of an instance is not working."));
        } catch (err) {
            done(new Error("there was an error at getting attributes of an instance."));
        }
    });

    it("getting attributes of a type", function (done) {
        function FirstAttribute() {
            this.done();
        }

        function SecondAttribute() {
            this.done();
        }

        function TestType() {

        }

        try {
            FirstAttribute = juattr.inherit(FirstAttribute);
            SecondAttribute = juattr.inherit(SecondAttribute);
            TestType = juattr.bind(TestType, FirstAttribute, SecondAttribute);

            var attributes = juattr.getBoundAttributes(TestType, SecondAttribute);
            if (attributes.length == 1 && attributes[0] == SecondAttribute)
                done();
            else
                done(new Error("getting attributes of a type is not working."));
        } catch (err) {
            done(new Error("there was an error at getting attributes of a type."));
        }
    });

    it("blocking type constructor method", function (done) {
        function TestAttribute() {

        }

        function TestType() {
            this.id = 1;
        }

        try {
            TestAttribute = juattr.inherit(TestAttribute);
            TestType = juattr.bind(TestType, TestAttribute);

            var instance = new TestType();

            if (instance.id == undefined)
                done();
            else
                done(new Error("blocking type constructor method is not working."));
        } catch (err) {
            done(new Error("there was an error at blocking type constructor method."));
        }
    });

    it("checking attribute status", function (done) {
        function TestAttribute() {
            this.done();
        }

        function TestType() {

        }

        try {
            TestAttribute = juattr.inherit(TestAttribute);
            TestType = juattr.bind(TestType, TestAttribute);

            var instance = new TestType();

            var attributesOfInstance = juattr.getAppliedAttributes(instance, TestAttribute)[0];

            if (attributesOfInstance.check())
                done();
            else
                done(new Error("checking attribute status is not working."));
        } catch (err) {
            done(new Error("there was an error at checking attribute status."));
        }
    });

    it("setting attribute status after type constructor", function (done) {
        function TestAttribute() {
            this.done();

            if (this.scope.id == 0)
                this.error("id must not be null.");
        }

        function TestType(id) {
            this.id = id || 0;
        }

        try {
            TestAttribute = juattr.inherit(TestAttribute);
            TestType = juattr.bind(TestType, TestAttribute);

            var instance = new TestType();

            var attributesOfInstance = juattr.getAppliedAttributes(instance, TestAttribute)[0];

            if (attributesOfInstance.check("id must not be null."))
                done();
            else
                done(new Error("setting attribute status after type constructor is not working."));
        } catch (err) {
            done(new Error("there was an error at setting attribute status after type constructor."));
        }
    });

    it("returning result from attribute", function (done) {
        function TestAttribute() {
            this.result = "test";
        }

        function TestType() {
            this.id = 1;
        }

        try {
            TestAttribute = juattr.inherit(TestAttribute);
            TestType = juattr.bind(TestType, TestAttribute);

            var instance = new TestType();

            if (instance.id == 1 && juattr.getAttributeResult(instance) == "test")
                done();
            else
                done(new Error("returning result from attribute is not working."));
        } catch (err) {
            done(new Error("there was an error at returning result from attribute."));
        }
    });

    it("returning result from attribute when type has been run as function", function (done) {
        function TestAttribute() {
            this.result = "attribute";
        }

        function TestType() {
            return "type";
        }

        try {
            TestAttribute = juattr.inherit(TestAttribute);
            TestType = juattr.bind(TestType, TestAttribute);

            var result = TestType();

            if (result == "attribute")
                done();
            else
                done(new Error("returning result from attribute is not working."));
        } catch (err) {
            done(new Error("there was an error at returning result from attribute."));
        }
    });
});
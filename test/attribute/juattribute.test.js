var JuAttribute = require('../../libs/attribute/juattribute.js');

describe("attribute juattribute.js test", function () {
    it("requiring JuAttribute", function (done) {
        try {
            if (JuAttribute.name == "JuAttribute")
                done();
            else
                done(new Error("require JuAttribute is not working."));
        } catch (err) {
            done(new Error("there was an error at requiring JuAttribute."));
        }
    });

    it("checking that JuAttribute is an abstract", function (done) {
        try {
            new JuAttribute();
            done(new Error("JuAttribute is not an abstract."));
        } catch (err) {
            if (err.message == "JuAttribute instance can not be created!")
                done();
            else
                done(new Error("there was an error at checking that JuAttribute is an abstract."));
        }
    });

    it("checking that JuAttribute is not called as a function", function (done) {
        try {
            JuAttribute();
            done(new Error("JuAttribute can be called as a function."));
        } catch (err) {
            if (err.message == "JuAttribute is not called as a function.")
                done();
            else
                done(new Error("there was an error at checking that JuAttribute is not called as a function."));
        }
    });
});
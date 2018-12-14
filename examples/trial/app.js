var juof = require('../..');
debugger;


function TestAttribute(text) {
    this.scope.text = text;
    this.done();
}

function TestType() {

}

try {
    TestAttribute = juof.attribute.inherit(TestAttribute);
    TestType = juof.attribute.bind(TestType, TestAttribute("test"));

    var instance = new TestType();

    if (instance.text == "test")
        done();
    else
        done(new Error("usage of attribute as a functionr is not working."));
} catch (err) {
    done(new Error("there was an error at usage of attribute as a function."));
}
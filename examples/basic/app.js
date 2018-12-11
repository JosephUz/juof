var juof = require('../../');

function Person(name) {
    this.name = name;
    console.log("Person has been called from " + arguments[arguments.length - 1].name);
    console.log("--------------------------------------");
}

function Male(name) {
    this.gender = "M";
}

// Change the person class to person abtraction.
Person = juof.abstract(Person);

// The male class inherits from the person class.
Male = juof.inherit(Male, Person);

// Add prototype to the person class.
Person.prototype.cv = function () {
    console.log("Person CV");
    console.log("Name: " + this.name);
    console.log("--------------------------------------");
}

// The male class shows the cv prototype of the person class.
new Male("Yusuf").cv();

// Override the cv prototype of the male class. 
Male.prototype.cv = function () {
    console.log("Male CV");
    console.log("Name: " + this.name + '\nGender: ' + this.gender);
    console.log("--------------------------------------");
}

// The male class shows own cv prototype.
new Male("Yusuf").cv();

try {
    // The person class does not show the own cv prototype anymore.
    new Person("Yusuf").cv();
} catch (err) {
    console.log(err.message);
    console.log("--------------------------------------");
}

// Checking derived class from base.
console.log(juof.type.derived(Male, Person) ? "Male class is derived from Person" : "Male class is not derived from Person");
console.log("--------------------------------------");

// Clone male class.
var CloneOfMale = juof.type.clone(Male);

console.log(Male == CloneOfMale ? "Cloning of Male is not working" : "The CloneOfMale is not the same of Male");
console.log("--------------------------------------");

// CloneOfMale has prototypes of Male.
new CloneOfMale("Yusuf").cv();
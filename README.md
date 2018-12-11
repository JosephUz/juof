juof
==================

For objects and functions manipulation in javascript. Use for inheritance, attribute etc.


## Installation

```shell
$ npm install juof
```


## Usage

```javascript
var juof = require('juof');

function Person(name) {
    this.name = name;
}

function Male (name) {
    this.gender = "M";
}

// Change the person class to person abtraction.
Person = juof.abstract(Person);

// The male class inherits from the person class.
Male = juof.inherit(Male, Person);

// Add prototype to the person class.
Person.prototype.cv = function () {
    console.log("Person.prototype.cv");
    console.log("Name: " + this.name);
}

// The male class shows the cv prototype of the person class.
new Male("JosephUz").cv();

// Override the cv prototype of the male class. 
Male.prototype.cv = function () {
    console.log("Male.prototype.cv");
    console.log("Name: " + this.name + '\nGender: ' + this.gender);
}

// The male class shows own cv prototype.
new Male("JosephUz").cv();

```


### Methods


#### `juof.abstract(type)`

**Parameters:**

* `type`: Type to be used.


#### `juof.inherit(type, base)`
`Anymore, when creating a new instance of type, the last parameter of constructor will be base and in the same way the last parameter of base constructor will be type. Also, type constructor can only be called with "new" keyword or when base constructor has no returns. However, base constructor is always called.`

**Parameters:**

* `type`: Type to be used.

* `base`: Inherited type.


#### `juof.type`
`The object from which the related methods are handled.`


#### `juof.type.derived(type, base)`
`Checking that the type is derived from the base.`

**Parameters:**

* `type`: Type to be used.

* `base`: Inherited type.


#### `juof.type.clone(type)`
`Cloning with all the features of a type.`

**Parameters:**

* `type`: Type to be used.


#### `juof.attribute`
`Used to manage operations before or after functions.`


#### `juof.attribute.inherit(attr)`
`Used to create a new attribute.`

**Parameters:**

* `attr`: Constructor function of the attribute to be derived.


#### `juof.attribute.bind(func, attr, ...attr)`
`Used to bind the attribute with the function.`

**Parameters:**

* `func`: Function to which the attribute will be bound.

* `attr`: Constructor function of the derived attribute. Multiple attributes can be written as parameters at the same bind process.


#### `juof.attribute.getAppliedAttributes(scope, attr)`
`Used to get the applied attributes of a variable.`

**Parameters:**

* `scope`: The variable that attributes are applied to.

* `attr`:  Optional attribute parameter that is used to get the value of the attribute.


#### `juof.attribute.getBoundAttributes(func, attr)`
`Used to get the applied attributes of a function.`

**Parameters:**

* `func`: The function that attributes are bound to.

* `attr`:  Optional attribute parameter that is used to get the value of the attribute.


#### `juof.attribute.getAttributeResult(scope)`
`Used to get the result of the applied attributes to variable.`

**Parameters:**

* `scope`: The variable that attributes are applied to.


## Examples

### [Basic Usage][]

This example shows the most basic way of usage.

[Basic Usage]: https://github.com/JosephUz/juof/tree/master/examples/basic

### [Attribute Usage][]

This example shows a way of the attribute usage.

[Attribute Usage]: https://github.com/JosephUz/juof/tree/master/examples/attribute


License
-------

This software is free to use under the JosephUz. See the [LICENSE file][] for license text and copyright information.


[LICENSE file]: https://github.com/JosephUz/juof/blob/master/LICENSE
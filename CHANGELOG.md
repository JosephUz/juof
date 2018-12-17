# Changelog
All notable changes to this project will be documented in this file.

## [1.0.4] - 2019-12-17
### Added
- Unit test "function name field" is added. [Test File](https://github.com/JosephUz/juof/blob/master/test/function/jufunction.test.js#L167)
- Add field of "name" into JuFunction. [README.md](https://github.com/JosephUz/juof/blob/master/README.md#instance-of-jufunction)

### Changed
- juof.function.define function changed. Removed "key" parameter and add required to "fn" parameter is that must be named. [README.md](https://github.com/JosephUz/juof/blob/master/README.md#juoffunctiondefinescope-key-query-fn)
- juof.function.each -> eachFn function changed. This function is required one parameter anymore. [README.md](https://github.com/JosephUz/juof/blob/master/README.md#juoffunctioneachscope-eachfn)


## [1.0.3] - 2019-12-17
### Fixed
- There was an error in calling the super function in multilevel inheritance. [Bug Fixed Example](https://github.com/JosephUz/juof/tree/master/examples/basic/multilevel.js)

### Added
- Unit test "calling super function for multi level inheritance" is added. [Test File](https://github.com/JosephUz/juof/blob/master/test/oop/index.test.js#L134)
- Multilevel inheritance example. [Multilevel Inheritance Example](https://github.com/JosephUz/juof/tree/master/examples/basic/multilevel.js)


## [1.0.2] - 2019-12-17
### Added
- JuFunction: Used to add tags to functions and to preserve the original form after manipulation. [Usage For Defining Field Into Scope](https://github.com/JosephUz/juof/blob/master/examples/function/app.js#L82)
- All function unit test added. [Unit Test For Function](https://github.com/JosephUz/juof/tree/master/test/function)
- Function example added. [Example Function](https://github.com/JosephUz/juof/blob/master/examples/function)

### Changed
- Readme updated for JuFunction. [README.md](https://github.com/JosephUz/juof/blob/master/README.md#juoffunction)
- Visual Studio launch.json for mocha debug of current test js file. [launch.json](https://github.com/JosephUz/juof/blob/master/.vscode/launch.json)


## [1.0.1] - 2019-12-14
### Added
- Super function that can be call in constructor of derived class for inheritance of oop. [Usage](https://github.com/JosephUz/juof/blob/master/examples/basic/app.js#L10)
- All attributes can use parameters anymore. [Example Attribute](https://github.com/JosephUz/juof/blob/master/examples/attribute/user/method.js#L37) [Usage](https://github.com/JosephUz/juof/blob/master/examples/attribute/user/method.js#L33)
- [CHANGELOG.md](https://github.com/JosephUz/juof/blob/master/CHANGELOG.md)
- Trial example that users want to try codes.

### Changed
- Inheritance functions of attribute and oop have been separated.
- Functions used in oop inheritance can no longer be used as a method. 
- Super must be called within the constructor function of derived classes. [Usage](https://github.com/JosephUz/juof/blob/master/examples/basic/app.js#L10)
- All oop unit test updated for base constructor super. [Unit Test For OOP](https://github.com/JosephUz/juof/tree/master/test/oop) [Unit Test For Type](https://github.com/JosephUz/juof/tree/master/test/oop)
- All attribute unit test updated for parameters. [Unit Test For Attribute](https://github.com/JosephUz/juof/tree/master/test/attribute)
- [README.md](https://github.com/JosephUz/juof/blob/master/README.md)

### Removed
- In oop inherit function, base was added into arguments of derived. And derived was added into arguments of base. However, this is no longer available.
- Unit test "checking last arguments of base and type" is removed.
- Unit test "checking for used as a function" is removed.
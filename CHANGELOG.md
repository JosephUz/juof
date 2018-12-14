# Changelog
All notable changes to this project will be documented in this file.

## [1.0.1] - 2019-12-14
### Added
- Super function that can be call in constructor of derived class for inheritance of oop.
- All attributes can use parameters anymore.
- [CHANGELOG.md](https://github.com/JosephUz/juof/blob/master/CHANGELOG.md)
- Trial example that users want to try codes.

### Changed
- Inheritance functions of attribute and oop have been separated.
- Functions used in oop inheritance can no longer be used as a method.
- Super must be called within the constructor function of derived classes.
- All oop unit test updated for base constructor super. [Unit Test For OOP](https://github.com/JosephUz/juof/tree/master/test/oop) [Unit Test For Type](https://github.com/JosephUz/juof/tree/master/test/oop)
- All attribute unit test updated for parameters. [Unit Test For Attribute](https://github.com/JosephUz/juof/tree/master/test/attribute)
- [README.md](https://github.com/JosephUz/juof/blob/master/README.md)

### Removed
- In oop inherit function, base was added into arguments of derived. And derived was added into arguments of base. However, this is no longer available.
- Unit test "checking last arguments of base and type" is removed.
- Unit test "checking for used as a function" is removed.
function JuFunction(query, fn) {
    var original = null, tags = {};

    if (!(this instanceof JuFunction)) {
        throw new Error("JuFunction is not a function.");
    } else if (typeof (query) == "string") {
        this.query = query;
        this.function = fn;
    } else if (typeof (query) == "function") {
        this.query = "";
        this.function = query;
    } else {
        throw new Error("function not specified.");
    }

    this.scope = {};
    original = this.function;

    Object.defineProperties(this, {
        original: {
            get: function () {
                return original;
            }
        },
        tags: {
            get: function () {
                return tags;
            }
        },
        name: {
            get: function () {
                return original.name;
            }
        },
    });

    var split = this.query.split(';');
    if (split.length > 0 && this.query.indexOf(':') > -1) {
        split.forEach(function (part) {
            if (part.indexOf(':') > -1) {
                var tag = part.substr(0, part.indexOf(':'));
                var value = part.substr(part.indexOf(':') + 1);

                try {
                    if (value.indexOf(',') > -1) {
                        tags[tag] = value.split(',');
                    } else {
                        tags[tag] = JSON.parse(value);
                    }
                } catch (e) {
                    tags[tag] = value;
                }
            }
        });
    }
}

JuFunction.prototype.bind = function (scope) {
    this.scope = scope;
    return this;
}

JuFunction.prototype.apply = function (scope, args) {
    return this.function.apply(scope, args);
}

JuFunction.prototype.call = function () {
    var scope = arguments[0];
    var args = Array.prototype.filter.call(arguments, function (e, i) { return i > 0; });
    return this.function.apply(scope, args);
}

JuFunction.prototype.run = function () {
    return this.function.apply(this.scope, arguments);
}

JuFunction.prototype.pure = function () {
    return this.original.apply(this.scope, arguments);
}

JuFunction.prototype.value = function (fn) {
    if (fn)
        this.function = fn;
    return this.function;
}

module.exports = JuFunction;
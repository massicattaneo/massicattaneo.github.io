/*
   Base.js, version 1.1a
   Copyright 2006-2010, Dean Edwards
   License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function () {
    // dummy
};

Base.extend = function (_instance, _static) { // subclass
    var extend = Base.prototype.extend;

    // build the prototype
    Base._prototyping = true;
    var proto = new this;
    extend.call(proto, _instance);
    proto.base = function () {
        // call this method from any other method to invoke that method's ancestor
    };
    delete Base._prototyping;

    // create the wrapper for the constructor function
    //var constructor = proto.constructor.valueOf(); //-dean
    var constructor = proto.constructor;
    var klass = proto.constructor = function () {
        if (!Base._prototyping) {
            if (this._constructing || this.constructor == klass) { // instantiation
                this._constructing = true;
                constructor.apply(this, arguments);
                delete this._constructing;
            } else if (arguments[0] != null) { // casting
                return (arguments[0].extend || extend).call(arguments[0], proto);
            }
        }
    };

    // build the class interface
    klass.ancestor = this;
    klass.extend = this.extend;
    klass.forEach = this.forEach;
    klass.implement = this.implement;
    klass.prototype = proto;
    klass.toString = this.toString;
    klass.valueOf = function (type) {
        //return (type == "object") ? klass : constructor; //-dean
        return (type == "object") ? klass : constructor.valueOf();
    };
    extend.call(klass, _static);
    // class initialisation
    if (typeof klass.init == "function") klass.init();
    return klass;
};

Base.prototype = {
    extend: function (source, value) {
        if (arguments.length > 1) { // extending with a name/value pair
            var ancestor = this[source];
            if (ancestor && (typeof value == "function") && // overriding a method?
                // the valueOf() comparison is to avoid circular references
				(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
				/\bbase\b/.test(value)) {
                // get the underlying method
                var method = value.valueOf();
                // override
                value = function () {
                    var previous = this.base || Base.prototype.base;
                    this.base = ancestor;
                    var returnValue = method.apply(this, arguments);
                    this.base = previous;
                    return returnValue;
                };
                // point to the underlying method
                value.valueOf = function (type) {
                    return (type == "object") ? value : method;
                };
                value.toString = Base.toString;
            }
            this[source] = value;
        } else if (source) { // extending with an object literal
            var extend = Base.prototype.extend;
            // if this object has a customised extend method then use it
            if (!Base._prototyping && typeof this != "function") {
                extend = this.extend || extend;
            }
            var proto = { toSource: null };
            // do the "toString" and other methods manually
            var hidden = ["constructor", "toString", "valueOf"];
            // if we are prototyping then include the constructor
            var i = Base._prototyping ? 0 : 1;
            while (key = hidden[i++]) {
                if (source[key] != proto[key]) {
                    extend.call(this, key, source[key]);

                }
            }
            // copy each of the source object's properties to this object
            for (var key in source) {
                if (!proto[key]) extend.call(this, key, source[key]);
            }
        }
        return this;
    }
};

// initialise
Base = Base.extend({
    constructor: function () {
        this.extend(arguments[0]);
    }
}, {
    ancestor: Object,
    version: "1.1",

    forEach: function (object, block, context) {
        for (var key in object) {
            if (this.prototype[key] === undefined) {
                block.call(context, object[key], key, object);
            }
        }
    },

    implement: function () {
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "function") {
                // if it's a function, call it
                arguments[i](this.prototype);
            } else {
                // add the interface using the extend method
                this.prototype.extend(arguments[i]);
            }
        }
        return this;
    },

    toString: function () {
        return String(this.valueOf());
    }
});


/*****************************************************************************/
/*  LOGGER IMPLEMENTER FOR OBJECT - add console and error logging to objects */
/*****************************************************************************/

var LOGGER = Base.extend({
    //Instantiate
    constructor: function () { },
    //boolean: debug mode active
    logActive: true,
    //boolean: try catch mode active
    trycatch: true,
    //select on which broeser use the logger
    logUse: function () {
        return navigator.userAgent.match(/Chrome/i) == "Chrome";
    },
    //create a new inherited object from obj 
    //having all the function implemented with the logger(trace method) functionality
    addTo: function (/* object or function to implement with debug functionality. prevents error and debug */obj, /* optional boolean: set the debug mode */debug) {
        if (debug === false) this.logActive = false;
        if (this.trycatch)
            for (func in obj) {
                if (typeof obj[func] === "function") {
                    this.trace(obj, func);
                }
            }
        return Object.create(obj); // Use f() to create an "heir" of p.
    },
    // Replace the method named m of the object o with a version that logs
    // messages before and after invoking the original method.
    trace: function (o, m) {
        var self = this;
        var original = o[m]; // Remember original method in the closure.
        o[m] = function () { // Now define the new method.
            try {
                if (self.logActive && self.logUse() === true && m != "log") console.log("TRACE: Entering function: " + m); // Log message.
                var result = original.apply(this, arguments); // Invoke original.
            }
            catch (e) {
                if (self.logUse() === true) console.log("!!! ERROR: " + e.message + " (" + e.name + ")");
            }
            finally {
                if (self.logActive && self.logUse() === true && m != "log") console.log("TRACE: Exiting function: " + m); // Log message.            
            }
            return result;
        }
    },
    // log messages if logActive is true - log txtmessages or all the properties of a passed object
    log: function (logMsg) {
        var self = this;
        if (self.logUse() === true && self.logActive === true) {
            if (typeof logMsg == "object") {
                console.log(new Date().getMilliseconds(), "---------------------------------------------------------ALL PROPERTIES FOR THE " + logMsg.toString() + "-----------------------------------------------------");
                for (key in logMsg)
                    if (typeof logMsg[key] != "function")
                        console.log(new Date().getMilliseconds(), '    ' + key + ': ' + logMsg[key]);
                console.log(new Date().getMilliseconds(), "---------------------------------------------------------END PROPERTIES FOR THE " + logMsg.toString() + "-----------------------------------------------------");
            } else {
                console.log(new Date().getMilliseconds(), self.stdMessage + logMsg);
            }
        }
    },
    // standard message printed before the log message
    stdMessage: "LOGGER - ",
    addTrace: function () { this.addTo(this); }

});
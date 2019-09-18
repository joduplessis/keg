"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Keg queue class
 * @class
 * @constructor
 * @public
 */
var Keg = /** @class */ (function () {
    function Keg(name) {
        this.taps = {};
        this.queue = {};
        this.spikes = {};
        this.name = "";
        this.name = name;
    }
    /**
     * Initialized the singletone factory
     * @param {String} kegName - ID for the object
     */
    Keg.keg = function (kegName) {
        // If it doesn't exist, create it
        if (!this.instances[kegName])
            this.instances[kegName] = new Keg(kegName);
        // Return the correct keg to use
        return this.instances[kegName];
    };
    /**
     * Initialized the listening mechanic
     * @param {String} tapName - topic for the queue
     * @param {Object} callback - function for each call to process the q
     */
    Keg.prototype.tap = function (tapName, callback) {
        // If this outlet doesn't exist - create it
        if (!this.taps[tapName])
            this.taps[tapName] = [];
        // Push our callback to the stack
        this.taps[tapName].push(callback);
        // Run it as soon as it's up
        // There might be nothing
        this.pour(tapName);
    };
    /**
     * Add midldeware
     * @param {String} tapName - specifies the queue
     * @param {Object} callback - middleware function the value passes through
     */
    Keg.prototype.spike = function (tapName, func) {
        // If this spike doesn't exist, create it
        if (!this.spikes[tapName])
            this.spikes[tapName] = [];
        // Add this value to the Q
        this.spikes[tapName].push(func);
    };
    /**
     * Outlet and sending values to listeners
     * @param {String} tapName - specifies the queue
     */
    Keg.prototype.pour = function (tapName) {
        var _this = this;
        // If there is no queue - return
        if (!this.queue[tapName])
            return;
        // Value to push out
        var value = this.queue[tapName][0];
        // If there is no value - return
        if (!value)
            return;
        // Spike our drink
        if (this.spikes[tapName]) {
            value = this.spikes[tapName].reduce(function (accumulator, currentValue) { return currentValue(accumulator); }, value);
        }
        // Pour it into all the taps
        // Then also give our tap a function to move to the next one
        this.taps[tapName].map(function (tap) { return tap(value, function () {
            // Remove the current one from the stack
            _this.queue[tapName].shift();
            // And pour it again
            _this.pour(tapName);
        }); });
    };
    /**
     * Adds a message to the queue
     * @param {String} tapName - specifies the queue
     * @param {Object} value - actual message
     */
    Keg.prototype.refill = function (tapName, value) {
        // If this tap doesn't exist, create it
        if (!this.queue[tapName])
            this.queue[tapName] = [];
        // Add this value to the Q
        this.queue[tapName].push(value);
        // Also check it's fine
        if (!this.taps[tapName])
            return;
        // And then only ever auto run the first value
        if (this.queue[tapName].length == 1)
            this.pour(tapName);
    };
    Keg.instances = {};
    return Keg;
}());
exports.default = Keg;
//# sourceMappingURL=index.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Keg queue class
 * @class
 * @constructor
 * @public
 */
var Keg = /** @class */ (function () {
    function Keg() {
        this.taps = {};
        this.queue = {};
        this.spikes = {};
    }
    /**
     * Initialized the listening mechanic
     * @param {String} tapName - topic for the queue
     * @param {Object} callback - function for each call to process the q
     */
    Keg.tap = function (tapName, callback) {
        if (!this.instance)
            this.instance = new Keg();
        // If this outlet doesn't exist - create it
        if (!this.instance.taps[tapName])
            this.instance.taps[tapName] = [];
        // Push our callback to the stack
        this.instance.taps[tapName].push(callback);
        // Run it as soon as it's up
        // There might be nothing
        this.instance.pour(tapName);
    };
    /**
     * Add midldeware
     * @param {String} tapName - specifies the queue
     * @param {Object} callback - middleware function the value passes through
     */
    Keg.spike = function (tapName, func) {
        // If there isn't an object, create it
        if (!this.instance)
            this.instance = new Keg();
        // If this spike doesn't exist, create it
        if (!this.instance.spikes[tapName])
            this.instance.spikes[tapName] = [];
        // Add this value to the Q
        this.instance.spikes[tapName].push(func);
    };
    /**
     * Outlet and sending values to listeners
     * @param {String} tapName - specifies the queue
     */
    Keg.prototype.pour = function (tapName) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            var _this = this;
            return __generator(this, function (_a) {
                // If there is no queue - return
                if (!this.queue[tapName])
                    return [2 /*return*/];
                value = this.queue[tapName][0];
                // If there is no value - return
                if (!value)
                    return [2 /*return*/];
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
                return [2 /*return*/];
            });
        });
    };
    /**
     * Adds a message to the queue
     * @param {String} tapName - specifies the queue
     * @param {Object} value - actual message
     */
    Keg.refill = function (tapName, value) {
        // If there isn't an object, create it
        if (!this.instance)
            this.instance = new Keg();
        // If this tap doesn't exist, create it
        if (!this.instance.queue[tapName])
            this.instance.queue[tapName] = [];
        // Add this value to the Q
        this.instance.queue[tapName].push(value);
        // Also check it's fine
        if (!this.instance.taps[tapName])
            return;
        // And then only ever auto run the first value
        if (this.instance.queue[tapName].length == 1)
            this.instance.pour(tapName);
    };
    return Keg;
}());
//# sourceMappingURL=index.js.map
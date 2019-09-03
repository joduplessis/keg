/**
 * Keg queue class
 * @class
 * @constructor
 * @public
 */
declare class Keg {
    static instance: Keg;
    taps: any;
    queue: any;
    spikes: any;
    constructor();
    /**
     * Initialized the listening mechanic
     * @param {String} tapName - topic for the queue
     * @param {Object} callback - function for each call to process the q
     */
    static tap(tapName: string, callback: any): void;
    /**
     * Add midldeware
     * @param {String} tapName - specifies the queue
     * @param {Object} callback - middleware function the value passes through
     */
    static spike(tapName: string, func: any): void;
    /**
     * Outlet and sending values to listeners
     * @param {String} tapName - specifies the queue
     */
    pour(tapName: string): Promise<void>;
    /**
     * Adds a message to the queue
     * @param {String} tapName - specifies the queue
     * @param {Object} value - actual message
     */
    static refill(tapName: string, value: any): void;
}

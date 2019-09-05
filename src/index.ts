/**
 * Keg queue class
 * @class
 * @constructor
 * @public
 */
export default class Keg {
  static instance: Keg;
  taps: any = {};
  queue: any = {};
  spikes: any = {};

  constructor() {}

  /**
   * Initialized the listening mechanic
   * @param {String} tapName - topic for the queue
   * @param {Object} callback - function for each call to process the q
   */
  static tap(tapName: string, callback: any) {
    if (!this.instance) this.instance = new Keg();

    // If this outlet doesn't exist - create it
    if (!this.instance.taps[tapName]) this.instance.taps[tapName] = [];

    // Push our callback to the stack
    this.instance.taps[tapName].push(callback);

    // Run it as soon as it's up
    // There might be nothing
    this.instance.pour(tapName);
  }

  /**
   * Add midldeware
   * @param {String} tapName - specifies the queue
   * @param {Object} callback - middleware function the value passes through
   */
  static spike(tapName: string, func: any) {
    // If there isn't an object, create it
    if (!this.instance) this.instance = new Keg();

    // If this spike doesn't exist, create it
    if (!this.instance.spikes[tapName]) this.instance.spikes[tapName] = [];

    // Add this value to the Q
    this.instance.spikes[tapName].push(func);
  }

  /**
   * Outlet and sending values to listeners
   * @param {String} tapName - specifies the queue
   */
  async pour(tapName: string) {
    // If there is no queue - return
    if (!this.queue[tapName]) return;

    // Value to push out
    let value: any = this.queue[tapName][0];

    // If there is no value - return
    if (!value) return;

    // Spike our drink
    if (this.spikes[tapName]) {
      value = this.spikes[tapName].reduce((accumulator: any, currentValue: any) => currentValue(accumulator), value);
    }

    // Pour it into all the taps
    // Then also give our tap a function to move to the next one
    this.taps[tapName].map((tap: any) => tap(value, () => {
      // Remove the current one from the stack
      this.queue[tapName].shift();

      // And pour it again
      this.pour(tapName);
    }))
  }

  /**
   * Adds a message to the queue
   * @param {String} tapName - specifies the queue
   * @param {Object} value - actual message
   */
  static refill(tapName: string, value: any) {
    // If there isn't an object, create it
    if (!this.instance) this.instance = new Keg();

    // If this tap doesn't exist, create it
    if (!this.instance.queue[tapName]) this.instance.queue[tapName] = [];

    // Add this value to the Q
    this.instance.queue[tapName].push(value);

    // Also check it's fine
    if (!this.instance.taps[tapName]) return;

    // And then only ever auto run the first value
    if (this.instance.queue[tapName].length == 1) this.instance.pour(tapName);
  }
}

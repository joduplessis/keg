
<img src="https://joduplessis-keg.s3-us-west-2.amazonaws.com/barrel.svg" width="90" height="90">

# Keg

> Keg is a messaging queue. It's not suitable for production yet. Expect things to break & change without notice. It includes TypeScript support.

## Installation
You can install the library directly from here until it gets to a post `0.0.0` state.
```
npm i @joduplessis/keg
```

## Terminology
It's helpful to think in these terms:
- Keg: overall queue ID
- Tap: outlet of messages received, identified by an ID
- Spike: a reduce orientated middleware for messages
- Refill: adds a new message to a keg:tap
- pour(): something like a `next()` to move through the queue

## Some example usage:
```
Keg.keg('kegger').tap('demo', async (val, pour) => {
  // 'val' is the current value for the demo queue
  // We can process it here
  // And then move onto the next item in the queue
  // Equivalent to next()
  pour()
})

// Add middleware to each message
Keg.keg('kegger').spike('demo', in => {
  return window.btoa(in)
})

Keg.keg('kegger').refill('demo', 'Some text')
Keg.keg('kegger').refill('demo', { order: 'Object message types' })
Keg.keg('kegger').refill('demo', 42)
```

## Spiking your drink
Any middleware that gets added will act as a pipe. It take the value `in` & passes it onto the next `spike()`.

## Roadmap
- [x]  Get base library set up
- [x]  Choose a nifty logo
- [x]  Add support for multiple kegs
- [ ]  Add tests
- [x]  Package for NPM
- [ ]  Add support for external pub/subs

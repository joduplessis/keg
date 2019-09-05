
<img src="https://joduplessis-keg.s3-us-west-2.amazonaws.com/barrel.svg" width="90" height="90">

# Keg

> Keg is a messaging queue. It's not suitable for production yet. Expect things to break & change without notice.

## Installation
You can install the library directly from master until it gets to a post v0.0.0 state.
```
npm i --save joduplessis/keg#master
```

## Terminology
It's helpful to think in these terms:
- Keg: overall app, topic stream
- Tap: outlet of messages received, identified by a name ID
- Spike: middleware for a received message
- Refill: add a message to topic
- pour(): something like next() (move through the queue)

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
Keg.keg('kegger').spike('demo', val => {
  return window.btoa(val)
})

Keg.keg('kegger').refill('demo', 'Some text')
Keg.keg('kegger').refill('demo', { order: 'Object message types' })
Keg.keg('kegger').refill('demo', 42)

```

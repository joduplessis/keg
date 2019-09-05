
<img src="https://joduplessis-keg.s3-us-west-2.amazonaws.com/barrel.svg" width="90" height="90">

# Keg

> Keg is a straightforward messaging queue. It's not suitable for any form of production yet. Expect things to break & change without notice.

## Installation
You can install the library directly from master until it gets to a post v0.0.0 state.

## Some example usage:

```
Keg.keg('kegger').tap('demo', async (val, pour) => {
  // 'val' is the current value for the demo queue
  // We can process it here
  // And then move onto the next item in the queue
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

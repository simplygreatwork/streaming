
# Streaming

### Summary

- Callbags are a specification for pullable and pushable streams in JavaScript.
- These examples run in a browser without a build process.
- Includes asynchronous callbags for produce, transform (async map), and consume.

### Roadmap

- want to extend "take" to allow for pagination (slice)
- ideas: emit, log, pluck, total/reduce
- idea: viable to pass data paramters (options) upward to a source? url? range? bust-cache?
- illustrate backpressure, throttling, etc
- be able to pass multiple non-fatal errors - e..g not using terminate - but another code (12)

### Examples Roadmap

- filter
- pluck
- ideas: emit, log, pluck, total/reduce
- idea: viable to pass data paramters (options) upward to a source? url? range? bust-cache?
- show how to pluck using transform
- show how to filter using transform
- show how to reduce using transform
- 

- https://github.com/callbag/callbag/blob/master/getting-started.md
- switch among backup sources, remote-1, remote-2, local, cached
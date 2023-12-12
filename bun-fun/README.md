# bun-fun

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```

Simulate or trigger past events:

```bash

# simulate tweet
bun run triggerEvent.ts <eventIndex> <courseName>

or
# trigger and send tweet (pass true as third argument)
bun run triggerEvent.ts <eventIndex> <courseName> [shouldSendTweet]
```

This project was created using `bun init` in bun v1.0.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

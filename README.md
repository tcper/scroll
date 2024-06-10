### Usage

```
pnpm install
pnpm run start
```

### Explained

Tech stack: tailwind/react-infinite-scroll-component

Scenario: Get page infos, generate all cards, cards to fetch detail infos.

### About concurrent request

Every page has 20 requests, just give it to browser to handle.
More complicated logic, like request dependencies, will use a pipeline.
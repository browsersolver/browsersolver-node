# BrowserSolver Node.js SDK

The official Node.js and TypeScript SDK for the [BrowserSolver](https://www.browsersolver.com) web unlocker API.

Unlock, render, crawl and screenshot any website — anti-bot bypass and technology detection through one API.

The SDK exposes **9 typed methods**, one per documented endpoint, plus a generic `request()` for anything else.

## Requirements

- Node.js 20 or newer

## Installation

```sh
npm install @browsersolver/sdk
```

The SDK works with TypeScript and JavaScript (ES modules). The examples below use TypeScript; JavaScript users can use the same API by omitting TypeScript-only syntax.

## Get your API key

[Sign up for BrowserSolver](https://app.browsersolver.com/register) or sign in to your existing account, then copy your API key from the [dashboard](https://app.browsersolver.com). Store it securely, for example in the `BROWSERSOLVER_API_KEY` environment variable, which the client reads by default.

## Quick start

```ts
import { BrowserSolverClient } from "@browsersolver/sdk";

const client = new BrowserSolverClient({
  apiKey: process.env.BROWSERSOLVER_API_KEY,
});

const response = await client.websiteWebunlocker({
  query: "https://example.com",
});
console.log(response.data);
```

Every method takes a parameter object that mirrors the [API reference](https://app.browsersolver.com/openapi) (snake_case names, exactly as documented) and an optional `RequestOptions` object.

## Binary responses

Some endpoints return a file (image, PDF…) instead of JSON. Their methods return an `ApiResponse`, so check `kind`:

```ts
import { writeFile } from "node:fs/promises";

const response = await client.websiteScreenshot({
  url: "https://example.com",
  format: "png",
});
if (response.kind === "binary") {
  await writeFile("screenshot.png", response.bytes);
} else {
  console.log(response.data);
}
```

## Async jobs

Any call accepts `is_async: true` (useful past the 60-second server limit): the response is then a `job_id`. `waitForJob()` polls `GET /v1/jobs/{id}` until the job reaches a terminal status (`CompletedJob`, `Error`, `NotFound`, `BadRequest`):

```ts
const submitted = await client.websiteWebunlocker({
  query: "https://example.com",
  is_async: true,
});
const job = await client.waitForJob(submitted.data.job_id, {
  onProgress: (j) => console.log(`${j.status} ${j.progress ?? 0}%`),
});
console.log(JSON.stringify(job.data, null, 2));
```

## GET or POST

Methods use GET when the endpoint supports it: parameters travel in the query string. POST sends the same parameters as a JSON body.

```ts
await client.websiteCrawler(
  { query: "https://books.toscrape.com/" },
  { method: "POST" },
);
```

`null`, `undefined` and empty arrays are omitted, `false` and `0` are sent, and arrays repeat the parameter name (`a=1&a=2`).

## Any endpoint

`request()` reaches any path, including endpoints released after this SDK version:

```ts
const response = await client.request("GET", "/v1/usage");
```

## Responses

- `JsonResponse` — `kind: "json"`, the parsed body in `data` (pass a type argument to type it: `client.websiteWebunlocker<MyType>(…)`).
- `BinaryResponse` — `kind: "binary"`, the body in `bytes` and its `contentType`.

Both keep the buffered `rawResponse` (status, headers, content type, body bytes).

## Errors

```ts
import { BrowserSolverApiError } from "@browsersolver/sdk";

try {
  await client.websiteWebunlocker({ query: "https://example.com" });
} catch (error) {
  if (error instanceof BrowserSolverApiError) {
    console.error(error.status, error.message, error.responseBody);
  }
  throw error;
}
```

| Error                                | When                                                                          |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| `BrowserSolverConfigurationError`    | Missing API key, invalid options or unsupported method.                       |
| `BrowserSolverSerializationError`    | A required parameter is missing or a value can't be sent.                     |
| `BrowserSolverTransportError`        | Network failure or client-side timeout.                                       |
| `BrowserSolverApiError`              | The API answered with a non-2xx status (`status`, `message`, `responseBody`). |
| `BrowserSolverResponseDecodingError` | A success response could not be decoded.                                      |

All of them extend `BrowserSolverError`. Common statuses: `400` invalid parameters, `401` invalid API key, `402` no credits left, `429` rate limit exceeded.

## Retries

Requests are retried up to 3 times after a network error, a `408`, `500`, `502`, `503` or `504`, or a rate limit — which the API returns as `401` (or `429`) with a `Rate limit exceeded` message. Per-key quota errors (`…: quota daily`) are not retried, nor are `400`, `402`, `404` or client-side timeouts. The delay starts at 1 second and grows 1.5× per retry (capped at 30 seconds); a `Retry-After` header wins.

```ts
const client = new BrowserSolverClient({ maxRetries: 5, retryDelay: 500 });

// or for one request
await client.websiteWebunlocker(
  { query: "https://example.com" },
  { maxRetries: 0 },
);
```

## Batch requests

`batch()` runs a task per item with at most 10 in flight (`concurrency`), and returns one result per item in input order, shaped like `Promise.allSettled`. One failure never stops the others.

```ts
const inputs = ["https://example.com", "https://www.browsersolver.com"];
const results = await client.batch(
  inputs,
  (query) => client.websiteWebunlocker({ query }),
  { concurrency: 5 },
);

for (const result of results) {
  if (result.status === "fulfilled") console.log(result.value.data);
  else console.error(inputs[result.index], result.reason);
}
```

| Constant                 | Default  | Description                                                     |
| ------------------------ | -------- | --------------------------------------------------------------- |
| `DEFAULT_CONCURRENCY`    | `10`     | Tasks run at the same time by batch                             |
| `DEFAULT_TIMEOUT_MS`     | `120000` | Request timeout (milliseconds)                                  |
| `MAX_RETRIES`            | `3`      | Retry attempts after a network error, a 408/5xx or a rate limit |
| `RETRY_BACKOFF_FACTOR`   | `1.5`    | Exponential backoff multiplier                                  |
| `DEFAULT_RETRY_DELAY_MS` | `1000`   | Delay before the first retry (milliseconds)                     |

## Timeouts and cancellation

```ts
const client = new BrowserSolverClient({ timeout: 60_000 }); // default 120000 ms, 0 disables

await client.websiteWebunlocker(
  { query: "https://example.com" },
  {
    signal: AbortSignal.timeout(30_000),
  },
);
```

## Advanced: custom Fetch transport

```ts
import {
  BrowserSolverClient,
  type BrowserSolverFetch,
} from "@browsersolver/sdk";

const loggingFetch: BrowserSolverFetch = async (input, init) => {
  const response = await fetch(input, init);
  console.log(init.method, String(input), response.status);
  return response;
};

const client = new BrowserSolverClient({ fetch: loggingFetch });
```

## Endpoints

9 methods, generated from the [OpenAPI document](https://app.browsersolver.com/openapi).

| Method                 | HTTP                                 | Description                                                                                                                                  |
| ---------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `jobs()`               | GET `/v1/jobs/{id}`                  | Poll the status, progress (0–100) and result of a job started with is_async=true. Polling is free. Poll until status is terminal: Completed… |
| `stats()`              | GET `/v1/stats`                      | Infrastructure health for an engine or endpoint over the last hour. Not scoped to your account or tenant. Enabled per account: HTTP 403 mea… |
| `usage()`              | GET `/v1/usage`                      | Retrieve real-time usage statistics and credit balance for your BrowserSolver account.                                                       |
| `websiteAntibot()`     | GET `/v1/website/antibot`            | Single-pass scan that names the bot-protection vendor in front of a URL so you can choose the right BrowserSolver fetch tier next.           |
| `websiteCrawler()`     | GET / POST `/v1/website/crawler`     | Fast HTTP pull of public HTML with no browser session. Ideal when the first response already contains the content you need.                  |
| `websiteRendering()`   | GET `/v1/website/rendering`          | Run a managed browser session against a public URL and collect the HTML after client-side scripts finish. Prefer Crawler for static markup;… |
| `websiteScreenshot()`  | GET / POST `/v1/website/screenshot`  | Turn any public URL into a PNG, JPEG, WebP, or PDF asset rendered by BrowserSolver. No local Chromium fleet to operate.                      |
| `websiteTechnology()`  | GET / POST `/v1/website/technology`  | Map CMS, frameworks, analytics, CDN, and security tooling exposed by a public URL. Choose simple lists or expert metadata with confidence s… |
| `websiteWebunlocker()` | GET / POST `/v1/website/webunlocker` | BrowserSolver's highest HTML fetch tier for retail and marketplace hosts on your account whitelist. Solves persistent bot challenges that s… |

## License

MIT — see [LICENSE](LICENSE).

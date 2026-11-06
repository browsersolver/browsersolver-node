// Generated from the BrowserSolver OpenAPI document. Do not edit by hand.

import type { OpenString } from "./types.js";

/** Parameters for operations that take none. */
export type EmptyParams = Record<string, never>;

/** Parameters for `jobs()` — `GET /v1/jobs/{id}`. */
export interface JobsParams {
  /** The job_id returned by an endpoint called with is_async=true. */
  id: string;
}

/** Parameters for `stats()` — `GET /v1/stats`. */
export interface StatsParams {
  /** API family to check, for example website. Provide at least engine or path. */
  engine?: string | undefined;
  /** Specific endpoint to check, for example /v1/website/screenshot. If you also pass engine, use an endpoint from that API. */
  path?: string | undefined;
}

/** Parameters for `websiteAntibot()` — `GET /v1/website/antibot`. */
export interface WebsiteAntibotParams {
  /** Full URL or bare domain to scan for bot-protection vendors. */
  query: string;
  /** Upper bound for waiting on the target HTTP response, expressed in seconds (defaults to 15). */
  timeout?: number | undefined;
  /** Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost. */
  fields?: string | undefined;
  /** Process the request asynchronously: the response is a job_id to poll on /v1/jobs/{id} (see waitForJob). Default: `false`. */
  is_async?: boolean | undefined;
  /** Return HTTP 200 even when an error occurs; the error is then in the response body. Default: `false`. */
  soft_fail?: boolean | undefined;
}

/** Parameters for `websiteCrawler()` — `GET / POST /v1/website/crawler`. */
export interface WebsiteCrawlerParams {
  /** Public URL to retrieve with the Crawler tier (plain HTTP, no JavaScript). Include http:// or https://. */
  query: string;
  /** Whether BrowserSolver should chase HTTP redirects for this fetch. Default: `true`. */
  allow_redirects?: boolean | undefined;
  /** Choose between processed markup and the exact bytes from the origin. Default: `false`. */
  return_page_source?: boolean | undefined;
  /** Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost. */
  fields?: string | undefined;
  /** Process the request asynchronously: the response is a job_id to poll on /v1/jobs/{id} (see waitForJob). Default: `false`. */
  is_async?: boolean | undefined;
  /** Return HTTP 200 even when an error occurs; the error is then in the response body. Default: `false`. */
  soft_fail?: boolean | undefined;
}

/** Parameters for `websiteRendering()` — `GET /v1/website/rendering`. */
export interface WebsiteRenderingParams {
  /** Public URL to load inside BrowserSolver's headless browser. Include http:// or https://. */
  query: string;
  /** Extra pause, in seconds, after the page load event before BrowserSolver returns HTML. Helpful when widgets animate or hydrate late. Default: `0`. */
  wait_in_seconds?: number | undefined;
  /** CSS or XPath selector that must appear in the DOM before HTML is returned. The managed browser waits until the node exists (or until timeout). */
  wait_for?: string | undefined;
  /** Skip ad-network requests while the page renders. Default: `false`. */
  block_ads?: boolean | undefined;
  /** Hard ceiling, in seconds, for the render session. When reached, BrowserSolver returns whatever HTML is available. Default: `30`. */
  timeout?: number | undefined;
  /** Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost. */
  fields?: string | undefined;
  /** Process the request asynchronously: the response is a job_id to poll on /v1/jobs/{id} (see waitForJob). Default: `false`. */
  is_async?: boolean | undefined;
  /** Return HTTP 200 even when an error occurs; the error is then in the response body. Default: `false`. */
  soft_fail?: boolean | undefined;
}

/** Parameters for `websiteScreenshot()` — `GET / POST /v1/website/screenshot`. */
export interface WebsiteScreenshotParams {
  /** Page address to render into an image or PDF. Must include a protocol. */
  url: string;
  /** File type returned in the response body. Default: `"png"`. */
  format?: OpenString<"jpeg" | "jpg" | "pdf" | "png" | "webp"> | undefined;
  /** Swap the desktop viewport for a preset handset or tablet fingerprint. */
  device?:
    | OpenString<
        | "galaxy_fold4"
        | "galaxy_s23"
        | "galaxy_s23_ultra"
        | "galaxy_s8"
        | "huawei_mate_50_pro"
        | "huawei_p60_pro"
        | "ipad"
        | "iphone_12"
        | "iphone_13_mini"
        | "iphone_13_pro_max"
        | "iphone_14_pro"
        | "iphone_14_pro_max"
        | "iphone_x"
        | "pixel_5"
        | "pixel_6a"
        | "pixel_7_pro"
        | "redmi_note_11"
        | "redmi_note_12_pro"
      >
    | undefined;
  /** Extend the capture beyond the viewport so the entire scrollable document is included. Default: `false`. */
  full_page?: boolean | undefined;
  /** Drive a scroll pass first so deferred content mounts before a tall capture. Default: `false`. */
  full_page_scroll?: boolean | undefined;
  /** Milliseconds spent scrolling prior to a full-height capture. Default: `400`. */
  full_page_scroll_duration?: number | undefined;
  /** Width of the synthetic desktop window, in pixels. Default: `1280`. */
  viewport_width?: number | undefined;
  /** Height of the synthetic desktop window, in pixels. Default: `1024`. */
  viewport_height?: number | undefined;
  /** Pixel density multiplier. Raise it for retina-quality output; files grow accordingly. Default: `1`. */
  scale_factor?: number | undefined;
  /** Lossy compression level for soft formats. Default: `"80"`. */
  image_quality?: string | undefined;
  /** Limit the shot to one DOM node matched by this CSS selector. */
  selector?: string | undefined;
  /** Serve a stored capture on repeat requests when caching is enabled. Default: `false`. */
  cache?: boolean | undefined;
  /** Lifetime of cached captures in seconds. Default: `2592000`. */
  cache_ttl?: number | undefined;
  /** Hide matching CSS selectors (modals, promo bars, etc.) before shooting. */
  remove_selectors?: string | undefined;
  /** Best-effort removal of cookie consent layers before capture. Default: `false`. */
  remove_cookie_banners?: boolean | undefined;
  /** Best-effort stripping of ad slots before capture. Default: `false`. */
  remove_ads?: boolean | undefined;
  /** Resource kinds to discard during load, as a comma list (example: image,stylesheet,font). */
  block_resources?:
    | OpenString<
        | "document"
        | "eventsource"
        | "fetch"
        | "font"
        | "image"
        | "manifest"
        | "media"
        | "other"
        | "script"
        | "stylesheet"
        | "texttrack"
        | "websocket"
        | "xhr"
      >
    | undefined;
  /** Substring patterns that should never be fetched (example: analytics,tracking,advertisement). Hosts, paths, or fragments such as .example.com/ work. */
  block_urls?: string | undefined;
  /** Additional settle time in seconds after the readiness event. Default: `0`. */
  delay?: number | undefined;
  /** Which browser lifecycle event marks the page ready. */
  wait_until?:
    | readonly OpenString<
        "domcontentloaded" | "load" | "networkidle0" | "networkidle2"
      >[]
    | undefined;
  /** Hold capture until this CSS node is present. */
  wait_for_selector?: string | undefined;
  /** Route the browser through an intermediate proxy. */
  proxy?: string | undefined;
  /** Secret key used to authenticate uploads. */
  s3_secret_key?: string | undefined;
  /** Access key used to authenticate uploads. */
  s3_access_key_id?: string | undefined;
  /** Destination bucket for the binary asset. */
  s3_bucket?: string | undefined;
  /** Key under which the object is stored (generated automatically if blank). */
  s3_object_key?: string | undefined;
  /** Cloud region of the bucket. */
  s3_region?: string | undefined;
  /** Override the default AWS endpoint for S3-compatible backends. Leave blank for AWS. R2 example: https://<accountId>.r2.cloudflarestorage.com. */
  storage_endpoint?: string | undefined;
  /** Upload the binary and include the public object URL in the API response. Default: `false`. */
  s3_url?: boolean | undefined;
  /** Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost. */
  fields?: string | undefined;
  /** Process the request asynchronously: the response is a job_id to poll on /v1/jobs/{id} (see waitForJob). Default: `false`. */
  is_async?: boolean | undefined;
  /** Return HTTP 200 even when an error occurs; the error is then in the response body. Default: `false`. */
  soft_fail?: boolean | undefined;
}

/** Parameters for `websiteTechnology()` — `GET / POST /v1/website/technology`. */
export interface WebsiteTechnologyParams {
  /** Public URL to fingerprint for CMS, frameworks, analytics, CDN, and security tooling. Include http:// or https://. */
  query: string;
  /** How much detail to include in the stack report. Default: `"expert"`. */
  mode?: string | undefined;
  /** Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost. */
  fields?: string | undefined;
  /** Process the request asynchronously: the response is a job_id to poll on /v1/jobs/{id} (see waitForJob). Default: `false`. */
  is_async?: boolean | undefined;
  /** Return HTTP 200 even when an error occurs; the error is then in the response body. Default: `false`. */
  soft_fail?: boolean | undefined;
}

/** Parameters for `websiteWebunlocker()` — `GET / POST /v1/website/webunlocker`. */
export interface WebsiteWebunlockerParams {
  /** Public URL to fetch with the WebUnlocker tier. Include http:// or https://. The hostname must be on your BrowserSolver whitelist. */
  query: string;
  /** Whether the unlock session should chase HTTP redirects. Default: `true`. */
  allow_redirects?: boolean | undefined;
  /** Choose between processed markup and the exact post-unlock source. Default: `false`. */
  return_page_source?: boolean | undefined;
  /** Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost. */
  fields?: string | undefined;
  /** Process the request asynchronously: the response is a job_id to poll on /v1/jobs/{id} (see waitForJob). Default: `false`. */
  is_async?: boolean | undefined;
  /** Return HTTP 200 even when an error occurs; the error is then in the response body. Default: `false`. */
  soft_fail?: boolean | undefined;
}

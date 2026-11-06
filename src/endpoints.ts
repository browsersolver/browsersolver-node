// Generated from the BrowserSolver OpenAPI document. Do not edit by hand.

import type { EndpointDefinition } from "./types.js";

/** Every documented operation, keyed by its snake_case name. */
export const ENDPOINTS = {
  jobs: {
    path: "/v1/jobs/{id}",
    methods: ["GET"],
    response: "json",
    required: ["id"],
  },
  stats: {
    path: "/v1/stats",
    methods: ["GET"],
    response: "json",
    required: [],
  },
  usage: {
    path: "/v1/usage",
    methods: ["GET"],
    response: "json",
    required: [],
  },
  website_antibot: {
    path: "/v1/website/antibot",
    methods: ["GET"],
    response: "json",
    required: ["query"],
  },
  website_crawler: {
    path: "/v1/website/crawler",
    methods: ["GET", "POST"],
    response: "json",
    required: ["query"],
  },
  website_rendering: {
    path: "/v1/website/rendering",
    methods: ["GET"],
    response: "json",
    required: ["query"],
  },
  website_screenshot: {
    path: "/v1/website/screenshot",
    methods: ["GET", "POST"],
    response: "any",
    required: ["url"],
  },
  website_technology: {
    path: "/v1/website/technology",
    methods: ["GET", "POST"],
    response: "json",
    required: ["query"],
  },
  website_webunlocker: {
    path: "/v1/website/webunlocker",
    methods: ["GET", "POST"],
    response: "json",
    required: ["query"],
  },
} as const satisfies Record<string, EndpointDefinition>;

export type EndpointName = keyof typeof ENDPOINTS;

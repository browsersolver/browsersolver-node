import { BrowserSolverClient } from "@browsersolver/sdk";

const client = new BrowserSolverClient({
  apiKey: process.env.BROWSERSOLVER_API_KEY,
});

const response = await client.websiteWebunlocker({
  query: "https://example.com",
});
console.log(JSON.stringify(response.data, null, 2));

import { BrowserSolverClient } from "@browsersolver/sdk";

const client = new BrowserSolverClient({
  apiKey: process.env.BROWSERSOLVER_API_KEY,
});

const submitted = await client.websiteWebunlocker({
  query: "https://example.com",
  is_async: true,
});
const job = await client.waitForJob(submitted.data.job_id, {
  onProgress: (j) => console.log(`${j.status} ${j.progress ?? 0}%`),
});
console.log(JSON.stringify(job.data, null, 2));

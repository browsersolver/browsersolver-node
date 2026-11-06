import { writeFile } from "node:fs/promises";
import { BrowserSolverClient } from "@browsersolver/sdk";

const client = new BrowserSolverClient({
  apiKey: process.env.BROWSERSOLVER_API_KEY,
});

const response = await client.websiteScreenshot({
  url: "https://example.com",
  format: "png",
});
if (response.kind === "binary") {
  await writeFile("screenshot.png", response.bytes);
  console.log(
    `Saved screenshot.png (${response.contentType}, ${response.bytes.length} bytes)`,
  );
} else {
  console.log(JSON.stringify(response.data, null, 2));
}

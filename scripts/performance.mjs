import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("qa", { recursive: true });
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless"],
  chromePath:
    process.env.CHROME_PATH ||
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});
try {
  const result = await lighthouse(
    process.env.TEST_URL || "http://127.0.0.1:4173",
    {
      port: chrome.port,
      output: ["html", "json"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    },
  );
  await writeFile("qa/lighthouse-mobile.html", result.report[0]);
  await writeFile("qa/lighthouse-mobile.json", result.report[1]);
  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([key, value]) => [
      key,
      Math.round(value.score * 100),
    ]),
  );
  console.log(
    JSON.stringify(
      {
        scores,
        metrics: {
          FCP: result.lhr.audits["first-contentful-paint"].displayValue,
          LCP: result.lhr.audits["largest-contentful-paint"].displayValue,
          CLS: result.lhr.audits["cumulative-layout-shift"].displayValue,
        },
        failedAudits: Object.values(result.lhr.audits)
          .filter((a) => a.score !== null && a.score < 1 && a.details)
          .map((a) => ({ id: a.id, title: a.title, score: a.score })),
      },
      null,
      2,
    ),
  );
} finally {
  await chrome.kill();
}

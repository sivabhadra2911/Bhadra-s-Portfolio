import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const base = process.env.TEST_URL || "http://127.0.0.1:5174";
await mkdir("qa", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {
  viewports: [],
  interactions: [],
  errors: [],
  accessibility: [],
};
try {
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    const context = await browser.newContext({
      viewport: { width, height: width < 700 ? 844 : 900 },
      reducedMotion: "reduce",
      isMobile: width < 700,
      hasTouch: width < 700,
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => report.errors.push(e.message));
    page.on("console", (message) => {
      if (message.type() === "error") report.errors.push(message.text());
    });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    // Reveal all sections through native scrolling before evaluating layout.
    for (const section of await page.locator("main > section").all())
      await section.scrollIntoViewIfNeeded();
    await page.getByRole("link", { name: "BACK TO TOP" }).click();
    const layout = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
      h1: document.querySelectorAll("h1").length,
      cursor: getComputedStyle(
        document.querySelector(".pointer-system") || document.body,
      ).display,
    }));
    assert.ok(
      layout.scroll <= width + 1,
      `Horizontal overflow at ${width}: ${layout.scroll}`,
    );
    assert.equal(layout.h1, 1);
    report.viewports.push({ width, overflow: false });
    if (width === 390 || width === 1440) {
      const a11y = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      report.accessibility.push({
        width,
        violations: a11y.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      });
      await page.screenshot({
        path: `qa/portfolio-${width}.png`,
        fullPage: true,
      });
      await page.screenshot({ path: `qa/hero-${width}.png` });
    }
    await page
      .getByRole("button", { name: "Explore TeamPulse", exact: true })
      .click();
    await page.getByRole("dialog").waitFor();
    assert.ok(
      await page
        .getByRole("dialog")
        .getByText("Contribution", { exact: true })
        .isVisible(),
    );
    assert.equal(
      await page.evaluate(() =>
        document.activeElement?.getAttribute("aria-label"),
      ),
      "Close dialog",
    );
    await page.keyboard.press("Tab");
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog").count(), 0);
    assert.equal(
      await page.evaluate(() =>
        document.activeElement?.getAttribute("aria-label"),
      ),
      "Explore TeamPulse",
    );
    if (width < 700) {
      await page.locator(".brand").click();
      await page.getByRole("button", { name: "Open navigation" }).click();
      assert.equal(
        await page
          .getByRole("button", { name: "Close navigation" })
          .getAttribute("aria-expanded"),
        "true",
      );
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "About" })
        .click();
      assert.equal(
        await page
          .getByRole("button", { name: "Open navigation" })
          .getAttribute("aria-expanded"),
        "false",
      );
      assert.ok(page.url().endsWith("#about"));
    }
    const anchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
      links.map((link) => ({
        href: link.getAttribute("href"),
        exists: !!document.querySelector(link.getAttribute("href")),
      })),
    );
    assert.ok(
      anchors.every((link) => link.exists),
      "Missing anchor destination",
    );
    assert.equal((await page.request.get(`${base}/resume.pdf`)).status(), 200);
    assert.equal(
      await page
        .locator(".orbit-core svg")
        .evaluate((el) => getComputedStyle(el).animationName),
      "none",
    );
    report.interactions.push({
      width,
      dialog: "passed",
      focusRestoration: "passed",
      anchors: "passed",
      resume: "passed",
      reducedMotion: "passed",
      mobileMenu: width < 700 ? "passed" : "n/a",
    });
    await context.close();
  }
  await writeFile("qa/verification.json", JSON.stringify(report, null, 2));
  // Validate pointer effects with a real fine pointer and ordinary animation.
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(base);
  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .hover();
  await page.mouse.move(600, 300);
  await page.locator(".pointer-ring.is-visible").waitFor({ state: "attached" });
  assert.notEqual(
    await page.locator("body").evaluate((el) => getComputedStyle(el).cursor),
    "none",
  );
  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .hover();
  assert.ok(
    await page
      .locator(".pointer-ring")
      .evaluate((el) => el.classList.contains("is-active")),
  );
  report.interactions.push({ pointer: "passed", nativeCursorPreserved: true });
  await context.close();
  assert.equal(report.errors.length, 0, "Browser errors");
  await writeFile("qa/verification.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (report.accessibility.some((result) => result.violations.length))
    process.exitCode = 1;
} finally {
  await browser.close();
}

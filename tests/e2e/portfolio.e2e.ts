import { expect, test } from "@playwright/test";

test("home desk renders six systems", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /software for ideas that do not fit a template/i })).toBeVisible();
  await expect(page.locator(".desk-field")).toBeVisible();
  await expect(page.locator(".desk-plate")).toHaveCount(6);
  await expect(page.locator(".desk-edge")).toBeVisible();
  await expect(page.getByRole("note", { name: "Contact" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Kaizen Code/i })).toHaveAttribute("href", "/work/kaizen-code");
});

test("the desk evidence assets are deployable", async ({ request }) => {
  const assets = [
    "/projects/kaizen-code.png",
    "/projects/snapshot.svg",
    "/projects/vrmac.svg",
    "/projects/android-suite.svg",
    "/projects/antichess.svg",
    "/projects/bridgeio.svg",
    "/projects/gallery/kaizen/session-overview.png",
    "/projects/gallery/snapshot/cli-help.svg",
    "/projects/gallery/vrmac/simulator-live.jpeg",
    "/projects/gallery/android-suite/suite.svg",
    "/projects/gallery/antichess/board.svg",
    "/projects/gallery/bridgeio/architecture.svg",
  ];

  for (const asset of assets) {
    const response = await request.get(asset);
    expect(response.ok(), asset).toBe(true);
    expect(response.headers()["content-type"], asset).toMatch(/^image\//);
  }
});

test("desk plates link to folders and folder opens as spread", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Android Suite/i }).click();
  await expect(page).toHaveURL(/\/work\/android-suite$/);
  await expect(page.getByRole("heading", { level: 1, name: "Android Suite" })).toBeVisible();
  await expect(page.locator(".folder")).toBeVisible();
  await expect(page.locator(".folder__plate")).toHaveCount(3);
});

test("folders drawer lists flagship and repository", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("heading", { level: 1, name: /Every folder on the desk/i })).toBeVisible();
  await expect(page.locator(".folders-list")).toHaveCount(3);
  await expect(page.getByRole("link", { name: /Kaizen Code/i })).toBeVisible();
});

test("bench side table renders placeholders", async ({ page }) => {
  await page.goto("/bench");
  await expect(page.getByRole("heading", { level: 1, name: /Loose notes on the bench/i })).toBeVisible();
  await expect(page.locator(".bench-note")).toHaveCount(8);
  await expect(page.getByRole("link", { name: /All folders/i })).toHaveAttribute("href", "/work");
});

test("about sheet renders pinned sheet", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator(".about-sheet")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: /Alhassan Abdulazeez/i })).toBeVisible();
});

test("about bench and folders are reachable from desk edge", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Desk" });
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link", { name: "bench" })).toHaveAttribute("href", "/bench");
  await expect(nav.getByRole("link", { name: "folders" })).toHaveAttribute("href", "/work");
  await expect(nav.getByRole("link", { name: "about" })).toHaveAttribute("href", "/about");
});

test("featured folder has direct static route and complete stack", async ({ page }) => {
  await page.goto("/work/vrmac");
  await expect(page.getByRole("heading", { level: 1, name: "VRMac" })).toBeVisible();
  await expect(page.getByText(/ARCHITECTURE/)).toBeVisible();
  await expect(page.locator(".folder__plate")).toHaveCount(4);
  await expect(page.getByText(/SPATIAL ↔ NATIVE ↔ MOBILE/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Current proof" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Next folder/i })).toBeVisible();
});

test("keyboard users can bypass navigation", async ({ page }) => {
  await page.goto("/work");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("reduced motion keeps desk and plates", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".desk-field")).toBeVisible();
  await expect(page.locator(".desk-plate")).toHaveCount(6);
});

test("lab redirects to bench", async ({ page }) => {
  await page.goto("/lab");
  await expect(page).toHaveURL(/\/bench$/);
  await expect(page.getByRole("heading", { level: 1, name: /Loose notes on the bench/i })).toBeVisible();
});

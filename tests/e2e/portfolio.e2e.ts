import { expect, test } from "@playwright/test";

test("home remains useful before and alongside WebGL", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /software for ideas that do not fit a template/i })).toBeVisible();
  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.getByRole("link", { name: /See what I build/i })).toHaveAttribute("href", "#project-kaizen-code");
  await expect(page.locator(".machine-stage")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Kaizen Code" })).toBeAttached();
});

test("the workbench evidence assets are deployable", async ({ request }) => {
  const assets = [
    "/projects/kaizen-code.png",
    "/projects/snapshot.svg",
    "/projects/vrmac.svg",
    "/projects/motion-cues.png",
    "/projects/opencode-annotate.png",
    "/projects/stackjet.svg",
    "/blueprint/ink-field.png",
    "/projects/gallery/kaizen/session-overview.png",
    "/projects/gallery/snapshot/cli-help.svg",
    "/projects/gallery/vrmac/simulator-live.jpeg",
    "/projects/gallery/motion/current.png",
    "/projects/gallery/annotate/protocol.svg",
    "/projects/gallery/stackjet/surface.svg",
  ];

  for (const asset of assets) {
    const response = await request.get(asset);
    expect(response.ok(), asset).toBe(true);
    expect(response.headers()["content-type"], asset).toMatch(/^image\//);
  }
});

test("scroll position selects the matching project evidence", async ({ page }) => {
  await page.goto("/");
  const stage = page.locator(".machine-stage");
  const chapters = [
    ["#project-kaizen-code", "2", "KAIZEN CODE"],
    ["#project-snapshot", "3", "SNAPSHOT"],
    ["#project-vrmac", "4", "VRMAC"],
    ["#project-motion-cues", "5", "MOTION CUES"],
    ["#project-opencode-annotate", "6", "OPENCODE ANNOTATE"],
    ["#project-stackjet", "7", "STACKJET"],
  ] as const;

  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
  for (const [selector, chapter, project] of chapters) {
    await page.evaluate((target) => {
      const element = document.querySelector<HTMLElement>(target);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(0, top - window.innerHeight * 0.3), behavior: "instant" });
      }
    }, selector);
    await page.waitForFunction(({ expectedChapter, expectedProject }) => {
      const stage = document.querySelector<HTMLElement>(".machine-stage");
      return stage?.dataset.chapter === expectedChapter && stage?.dataset.project === expectedProject;
    }, { expectedChapter: chapter, expectedProject: project });
    await expect(stage).toHaveAttribute("data-chapter", chapter);
    await expect(stage).toHaveAttribute("data-project", project);
  }
});

test("mobile navigation opens with keyboard focus", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.click();
    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(navigation).toBeVisible();
    await expect(menu).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeHidden();
  } else {
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  }
});

test("featured project has a direct static route and complete narrative", async ({ page }) => {
  await page.goto("/work/vrmac");
  await expect(page.getByRole("heading", { level: 1, name: "VRMac" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Read the build from several angles." })).toBeVisible();
  await expect(page.getByRole("img", { name: /world-anchored desktop architecture capture/i })).toBeVisible();
  await expect(page.locator(".case-gallery__item")).toHaveCount(5);
  await expect(page.getByText(/SPATIAL ↔ NATIVE ↔ MOBILE/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Current proof" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What this build changed." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Proof should be inspectable." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Next build record/i })).toBeVisible();
});

test("keyboard users can bypass navigation", async ({ page }) => {
  await page.goto("/work");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("reduced motion keeps content and the workbench path", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".machine-stage")).toBeVisible();
  await expect(page.getByRole("link", { name: /See what I build/i })).toBeVisible();
});

test("ink blueprint showcase renders the field and build register", async ({ page }) => {
  await page.goto("/showcase/ink-blueprint");
  await expect(page.getByRole("heading", { level: 1, name: /Turn the work into a field/i })).toBeVisible();
  await expect(page.locator(".blueprint-field")).toBeVisible();
  await expect(page.locator(".blueprint-plate")).toHaveCount(6);
  await expect(page.locator(".blueprint-showcase__register li")).toHaveCount(6);
  await expect(page.getByRole("link", { name: /Back to Signal Cartography/i })).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: /Open the VRMac build record/i })).toHaveAttribute("href", "/work/vrmac");
});

test("the old blueprint demo URL forwards to the full showcase", async ({ page }) => {
  await page.goto("/demo/ink-blueprint");
  await expect(page).toHaveURL(/\/showcase\/ink-blueprint$/);
  await expect(page.getByRole("heading", { level: 1, name: /Turn the work into a field/i })).toBeVisible();
});

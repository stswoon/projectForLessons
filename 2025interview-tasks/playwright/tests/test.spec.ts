import { test, expect } from '@playwright/test';

test('Counter triple click', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByRole("heading")).toHaveText("App");
  await page.click("button");
  await page.click("button");
  await page.click("button");
  await expect(page.locator(".counterView")).toHaveText("Counter: 4");
});

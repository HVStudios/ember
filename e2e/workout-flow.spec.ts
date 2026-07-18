import { expect, test } from "playwright/test";

test("completes Upper A, persists progress, and advances the program", async ({ page }) => {
  await page.goto("/workout/upper-a");
  await expect(page.getByRole("heading", { name: "Plan hantelpress" })).toBeVisible();

  const setCounts = [3, 3, 3, 2, 2, 2, 2];
  for (let exerciseIndex = 0; exerciseIndex < setCounts.length; exerciseIndex += 1) {
    for (let setIndex = 1; setIndex <= setCounts[exerciseIndex]; setIndex += 1) {
      await page.getByRole("textbox", { name: `Vikt för set ${setIndex}` }).fill("10");
      await page.getByRole("textbox", { name: `Repetitioner för set ${setIndex}` }).fill("10");
      await page.getByRole("button", { name: `Markera set ${setIndex} klart` }).click();
      await expect(page.getByRole("timer")).toBeVisible();
      await page.getByRole("button", { name: "Stäng vilotimer" }).click();
    }

    if (exerciseIndex === 0) {
      await page.reload();
      await expect(page.getByRole("textbox", { name: "Vikt för set 1" })).toHaveValue("10");
      await expect(page.getByRole("button", { name: "Öppna set 1 igen" })).toBeVisible();
    }

    if (exerciseIndex < setCounts.length - 1) await page.getByRole("button", { name: "Nästa övning" }).click();
  }

  await page.getByRole("button", { name: "Avsluta pass" }).click();
  await expect(page.getByRole("heading", { name: "Bra jobbat, Henrik." })).toBeVisible();
  await expect(page.getByText("17", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Till startsidan" }).click();
  await expect(page.getByRole("heading", { name: "Underkropp" })).toBeVisible();
  await expect(page.getByText("1 av 3", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Utveckling" }).click();
  await expect(page.getByText("Överkropp A", { exact: true })).toBeVisible();
});

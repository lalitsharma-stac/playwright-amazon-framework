const { expect } = require('@playwright/test');

async function takeScreenshot(page, fileName) {
    await page.screenshot({ path: `screenshots/${fileName}` });
}

async function softCheck(locator, expectedText) {
    await expect.soft(locator).toContainText(expectedText);
}

module.exports = { takeScreenshot, softCheck };

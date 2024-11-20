export async function waitForAndClick(locator) {
    await locator.waitFor(); // Wait for the element to be available
    await locator.click();   // Perform the click action
  }
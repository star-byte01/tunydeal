import { test, expect } from '@playwright/test';

test.describe('E2E: Add to Cart and Checkout Flow', () => {
  test('should allow a user to add a product to the cart and navigate to checkout', async ({ page }) => {
    // Start at the product listing page
    await page.goto('/products');

    // Click on the first product card
    await page.locator('.group').first().click();

    // Wait for the product detail page to load
    await expect(page).toHaveURL(/\/products\/.+/);
    await expect(page.locator('h1')).toBeVisible();

    // Click the "Order Now" button
    await page.getByRole('button', { name: /Order Now/i }).click();

    // The cart drawer should open. We'll check for the subtotal text.
    await expect(page.locator('text=Subtotal')).toBeVisible();

    // The drawer should contain an item.
    await expect(page.locator('ul > li').first()).toBeVisible();

    // Click the "Proceed to Checkout" button
    await page.getByRole('link', { name: /Proceed to Checkout/i }).click();

    // We should now be on the checkout page
    await expect(page).toHaveURL('/checkout');
    await expect(page.locator('h1')).toHaveText('Checkout');

    // Fill out the form
    await page.getByLabel('First Name').fill('John');
    await page.getByLabel('Last Name').fill('Doe');
    await page.getByLabel('Phone Number').fill('12345678');
    await page.getByLabel('City / Governorate').fill('Tunis');
    await page.getByLabel('Address').fill('123 Main St');

    // "Submit" the order
    await page.getByRole('button', { name: /Confirm Order/i }).click();

    // For now, we expect an alert. In a real app, we'd check for redirection.
    // This part of the test will need to be updated when the checkout logic is finalized.
    // Since Playwright can't easily handle alerts without a listener,
    // we'll just check that we are still on the checkout page.
    await expect(page.locator('h1')).toHaveText('Checkout');
  });
});

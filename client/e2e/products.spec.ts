import { test, expect } from '@playwright/test';

test.describe('Products CRUD Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('should display products on the products page', async ({ page }) => {
    const productsLink = page.getByTestId('nav-products');
    await expect(productsLink).toBeVisible();
    await productsLink.click();

    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="product-card"]');
    await expect(page.getByTestId('product-card').first()).toBeVisible();
    
    const productCount = await page.getByTestId('product-card').count();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should search products by keyword', async ({ page }) => {
    const productsLink = page.getByTestId('nav-products');
    await expect(productsLink).toBeVisible();
    await productsLink.click();

    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="product-card"]');

    const searchInput = page.getByTestId('product-search-input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('ring');
    await searchInput.press('Enter');

    await page.waitForLoadState('networkidle');
    const productCount = await page.getByTestId('product-card').count();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should filter products by category', async ({ page }) => {
    const productsLink = page.getByTestId('nav-products');
    await expect(productsLink).toBeVisible();
    await productsLink.click();

    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="product-card"]');

    const ringsTab = page.getByTestId('category-tab-rings');
    await expect(ringsTab).toBeVisible();
    await ringsTab.click();

    await page.waitForLoadState('networkidle');
    const productCount = await page.getByTestId('product-card').count();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should navigate to product detail page', async ({ page }) => {
    const productsLink = page.getByTestId('nav-products');
    await expect(productsLink).toBeVisible();
    await productsLink.click();

    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="product-card"]');

    const firstProductCard = page.getByTestId('product-card').first();
    await expect(firstProductCard).toBeVisible();
    await firstProductCard.click();

    await page.waitForLoadState('networkidle');
    const productCount = await page.getByTestId('product-card').count();
    expect(productCount).toBe(0);
  });
});

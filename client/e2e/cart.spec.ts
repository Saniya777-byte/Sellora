import { test, expect } from '@playwright/test';

test.describe('Cart Flow', () => {
  test('should add product to cart', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const productsLink = page.getByTestId('nav-products');
    await expect(productsLink).toBeVisible();
    await productsLink.click();

    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="product-card"]');
    
    const firstProductCard = page.getByTestId('product-card').first();
    await expect(firstProductCard).toBeVisible();
    
    const addToCartButton = firstProductCard.locator('.product-card__add-icon');
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    await page.waitForLoadState('networkidle');
    
    const cartButton = page.getByTestId('cart-button');
    await expect(cartButton).toBeVisible();
    const cartCount = await cartButton.locator('.navbar__cart-count').count();
    expect(cartCount).toBeGreaterThan(0);
  });

  test('should view cart items', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const productsLink = page.getByTestId('nav-products');
    await expect(productsLink).toBeVisible();
    await productsLink.click();

    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="product-card"]');
    
    const firstProductCard = page.getByTestId('product-card').first();
    await expect(firstProductCard).toBeVisible();
    
    const addToCartButton = firstProductCard.locator('.product-card__add-icon');
    await addToCartButton.click();

    await page.waitForLoadState('networkidle');
    
    const cartButton = page.getByTestId('cart-button');
    await expect(cartButton).toBeVisible();
    await cartButton.click();

    await page.waitForLoadState('networkidle');
    
    const cartItems = page.getByTestId('cart-item');
    await expect(cartItems.first()).toBeVisible();
  });

  test('should remove item from cart', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const productsLink = page.getByTestId('nav-products');
    await expect(productsLink).toBeVisible();
    await productsLink.click();

    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="product-card"]');
    
    const firstProductCard = page.getByTestId('product-card').first();
    await expect(firstProductCard).toBeVisible();
    
    const addToCartButton = firstProductCard.locator('.product-card__add-icon');
    await addToCartButton.click();

    await page.waitForLoadState('networkidle');
    
    const cartButton = page.getByTestId('cart-button');
    await expect(cartButton).toBeVisible();
    await cartButton.click();

    await page.waitForLoadState('networkidle');
    
    const cartItems = page.getByTestId('cart-item');
    const initialItemCount = await cartItems.count();
    expect(initialItemCount).toBeGreaterThan(0);

    const firstCartItem = cartItems.first();
    const removeButton = firstCartItem.locator('.cart-item__remove');
    await expect(removeButton).toBeVisible();
    await removeButton.click();

    await page.waitForLoadState('networkidle');
    const updatedItemCount = await cartItems.count();
    expect(updatedItemCount).toBeLessThan(initialItemCount);
  });
});

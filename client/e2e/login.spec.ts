import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should navigate to login page when sign-in is clicked', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loginButton = page.getByTestId('login-button');
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Sign in to Sellora' })).toBeVisible();
    await expect(page.getByTestId('username-input')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loginButton = page.getByTestId('login-button');
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    await page.waitForLoadState('networkidle');

    const usernameInput = page.getByTestId('username-input');
    const passwordInput = page.getByTestId('password-input');
    const submitButton = page.getByTestId('login-submit-btn');

    await usernameInput.fill('invaliduser');
    await passwordInput.fill('wrongpassword');
    await submitButton.click();

    await page.waitForLoadState('networkidle');
    const errorElement = page.getByTestId('login-error');
    await expect(errorElement).toBeVisible();
  });
});

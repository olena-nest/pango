import { test, expect } from 'playwright/test';
import { LoginPage } from '../pages/login-pages';

test.describe('OrangeHRM Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('Login with valid credentials', async () => {
    await loginPage.enterUsername('Admin');
    await loginPage.enterPassword('admin123');
    await loginPage.clickLogin();

    // Validate successful login
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
  });

  test('Login with invalid password', async () => {
    await loginPage.enterUsername('Admin');
    await loginPage.enterPassword('wrongpassword');
    await loginPage.clickLogin();

    // Validate error message
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Invalid credentials');
  });

  test('Login with non-existent user', async () => {
    await loginPage.enterUsername('NonExistentUser');
    await loginPage.enterPassword('wrongpassword');
    await loginPage.clickLogin();

    // Validate error message
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Invalid credentials');
  });

  test('Login with empty fields', async () => {
    await loginPage.enterUsername('');
    await loginPage.enterPassword('');
    await loginPage.clickLogin();

    // Validate error message
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Required');
  });
});

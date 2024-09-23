import { Page } from 'playwright/test';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Dynamic wait for the username field to be visible before filling it
  async enterUsername(username: string) {
    const usernameField = this.page.locator('input[name="username"]');
    await usernameField.waitFor({ state: 'visible' });  // Ensures the field is ready
    await usernameField.fill(username);
  }

  // Dynamic wait for the password field
  async enterPassword(password: string) {
    const passwordField = this.page.locator('input[name="password"]');
    await passwordField.waitFor({ state: 'visible' });
    await passwordField.fill(password);
  }

  // Dynamic wait for the login button before clicking
  async clickLogin() {
    const loginButton = this.page.locator('button[type="submit"]');
    await loginButton.waitFor({ state: 'attached' });  // Waits until the button is attached to DOM
    await loginButton.click();
  }

  // Dynamic wait for error messages
  async getErrorMessage(): Promise<string | null> {
    const errorMessage = this.page.locator('.oxd-alert-content');
    await errorMessage.waitFor({ state: 'visible' });
    return await errorMessage.textContent();
  }

  // Method to check dashboard visibility dynamically
  async isDashboardVisible(): Promise<boolean> {
    const dashboardHeader = this.page.locator('h6:has-text("Dashboard")');
    await dashboardHeader.waitFor({ state: 'visible' });  // Ensures the dashboard is fully loaded
    return dashboardHeader.isVisible();
  }

  async navigateToLoginPage() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.page.waitForLoadState('networkidle');  // Ensures that the page has fully loaded
  }
}

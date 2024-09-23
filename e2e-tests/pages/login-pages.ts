import { Page } from 'playwright';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Page Factory: Locators and actions
  async enterUsername(username: string) {
    await this.page.fill('input[name="username"]', username);
  }

  async enterPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async clickLogin() {
    await this.page.click('button[type="submit"]');
  }

  async getErrorMessage(): Promise<string | null> {
    return this.page.textContent('.oxd-alert-content');
  }

  async navigateToLoginPage() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  // Succesfull landing on dashboard validation

  async isDashboardVisible(): Promise<boolean> {
    return this.page.isVisible('h6:has-text("Dashboard")');  // Assume 'Dashboard' header element
  }
}

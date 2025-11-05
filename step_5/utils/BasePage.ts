import { Page } from '@playwright/test';

/**
 * BasePage - Base class for all page objects
 * Provides common functionality shared across all pages
 */
export class BasePage {
  protected page: Page;
  protected baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = '/sut/index.html';
  }

  /**
   * Navigate to the SUT application
   */
  async goto() {
    await this.page.goto(this.baseURL);
  }

  /**
   * Wait for the page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get the page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for a specific selector to be visible
   */
  async waitForSelector(selector: string, timeout: number = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Click on an element
   */
  async click(selector: string) {
    await this.page.click(selector);
  }

  /**
   * Fill in a text input
   */
  async fill(selector: string, value: string) {
    await this.page.fill(selector, value);
  }

  /**
   * Get text content of an element
   */
  async getText(selector: string): Promise<string | null> {
    return await this.page.textContent(selector);
  }

  /**
   * Check if an element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for a specific amount of time
   */
  async wait(milliseconds: number) {
    await this.page.waitForTimeout(milliseconds);
  }
}

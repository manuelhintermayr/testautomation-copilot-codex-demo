import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * NavigationPage - Page object for navigation functionality
 */
export class NavigationPage extends BasePage {
  // Locators
  private readonly logoButton: Locator;
  private readonly homeButton: Locator;
  private readonly cartButton: Locator;
  private readonly themeToggleButton: Locator;
  private readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.logoButton = page.locator('h1:has-text("TechShop")');
    // Home button in navigation
    this.homeButton = page.locator('nav button:has-text("Home")');
    // Cart button in navigation - more specific
    this.cartButton = page.locator('nav button:has-text("Cart")');
    // Theme toggle button - the first button with SVG in nav (should be the theme toggle)
    this.themeToggleButton = page.locator('nav button:has(svg)').first();
    this.searchInput = page.getByPlaceholder('Discover the future of technology...');
  }

  /**
   * Navigate to home using Home button
   */
  async goToHome() {
    await this.homeButton.click();
  }

  /**
   * Navigate to home using logo
   */
  async clickLogo() {
    await this.logoButton.click();
  }

  /**
   * Navigate to cart
   */
  async goToCart() {
    await this.cartButton.click();
  }

  /**
   * Toggle theme (dark/light mode)
   */
  async toggleTheme() {
    await this.themeToggleButton.first().click();
    await this.wait(300); // Wait for theme to apply
  }

  /**
   * Check if dark mode is enabled
   */
  async isDarkModeEnabled(): Promise<boolean> {
    const htmlElement = this.page.locator('html');
    const classes = await htmlElement.getAttribute('class');
    return classes?.includes('dark') || false;
  }

  /**
   * Check if search is visible
   */
  async isSearchVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }

  /**
   * Get cart badge count
   */
  async getCartCount(): Promise<string | null> {
    const cartBadge = this.page.locator('button:has-text("Cart") span');
    if (await cartBadge.isVisible()) {
      return await cartBadge.textContent();
    }
    return null;
  }
}

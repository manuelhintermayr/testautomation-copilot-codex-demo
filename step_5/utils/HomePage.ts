import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - Page object for the home/landing page
 */
export class HomePage extends BasePage {
  // Locators
  private readonly heroTitle: Locator;
  private readonly heroSubtitle: Locator;
  private readonly exploreButton: Locator;
  private readonly productCards: Locator;
  private readonly productsSection: Locator;

  constructor(page: Page) {
    super(page);
    this.heroTitle = page.getByText('The Future is');
    this.heroSubtitle = page.getByText('Now');
    this.exploreButton = page.getByRole('button', { name: 'Explore Collection' });
    this.productCards = page.locator('.product-card');
    this.productsSection = page.locator('#products');
  }

  /**
   * Navigate to home page
   */
  async navigateToHome() {
    await this.goto();
    await this.waitForProductsToLoad();
  }

  /**
   * Wait for products to load on the page
   */
  async waitForProductsToLoad() {
    await this.waitForSelector('.product-card', 10000);
  }

  /**
   * Check if hero section is visible
   */
  async isHeroVisible(): Promise<boolean> {
    return await this.heroTitle.isVisible() && await this.heroSubtitle.isVisible();
  }

  /**
   * Click the Explore Collection button
   */
  async clickExploreCollection() {
    await this.exploreButton.click();
    await this.wait(1000); // Wait for scroll animation
  }

  /**
   * Get the number of products displayed
   */
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  /**
   * Get a specific product card by index
   */
  getProductCard(index: number = 0): Locator {
    return this.productCards.nth(index);
  }

  /**
   * Get the first product card
   */
  getFirstProduct(): Locator {
    return this.productCards.first();
  }

  /**
   * Add first product to cart
   */
  async addFirstProductToCart() {
    const firstProduct = this.getFirstProduct();
    await firstProduct.getByRole('button', { name: 'Add to Cart' }).click();
  }

  /**
   * Add a specific product to cart by index
   */
  async addProductToCart(index: number) {
    const product = this.getProductCard(index);
    await product.getByRole('button', { name: 'Add to Cart' }).click();
  }

  /**
   * Check if featured badge exists
   */
  async hasFeaturedBadge(): Promise<boolean> {
    return await this.page.getByText('⭐ Featured').first().isVisible();
  }

  /**
   * Check if new badge exists
   */
  async hasNewBadge(): Promise<boolean> {
    return await this.page.getByText('🆕 New').first().isVisible();
  }

  /**
   * Check if products section is in viewport
   */
  async isProductsSectionInViewport(): Promise<boolean> {
    return await this.productsSection.isInViewport();
  }

  /**
   * Get product details from a product card
   */
  async getProductDetails(index: number = 0) {
    const product = this.getProductCard(index);
    const name = await product.locator('h3').textContent();
    const description = await product.locator('p').textContent();
    return { name, description };
  }
}

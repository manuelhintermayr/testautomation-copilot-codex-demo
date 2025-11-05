import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage - Page object for shopping cart page
 */
export class CartPage extends BasePage {
  // Locators
  private readonly cartHeading: Locator;
  private readonly cartItems: Locator;
  private readonly orderSummary: Locator;
  private readonly proceedToCheckoutButton: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly incrementButtons: Locator;
  private readonly decrementButtons: Locator;
  private readonly removeButtons: Locator;
  private readonly quantityDisplays: Locator;

  constructor(page: Page) {
    super(page);
    this.cartHeading = page.getByRole('heading', { name: 'Shopping Cart' });
    this.cartItems = page.locator('.bg-white.rounded-lg.shadow-md.p-6.mb-4');
    this.orderSummary = page.getByText('Order Summary');
    this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to Checkout' });
    this.emptyCartMessage = page.getByText('Your cart is empty');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.incrementButtons = page.getByRole('button', { name: '+' });
    this.decrementButtons = page.getByRole('button', { name: '-' });
    this.removeButtons = page.locator('button').filter({ has: page.locator('svg path[d*="M19 7l"]') });
    this.quantityDisplays = page.locator('.bg-gray-100 span');
  }

  /**
   * Navigate to cart page
   */
  async navigateToCart() {
    await this.page.getByRole('button', { name: /Cart/ }).click();
  }

  /**
   * Check if on cart page
   */
  async isOnCartPage(): Promise<boolean> {
    return await this.cartHeading.isVisible();
  }

  /**
   * Get cart item count from badge
   */
  async getCartBadgeCount(): Promise<string | null> {
    const cartBadge = this.page.locator('button:has-text("Cart") span');
    return await cartBadge.textContent();
  }

  /**
   * Check if cart badge is visible
   */
  async isCartBadgeVisible(): Promise<boolean> {
    const cartBadge = this.page.locator('button:has-text("Cart") span');
    return await cartBadge.isVisible();
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  /**
   * Increment quantity of first item
   */
  async incrementQuantity(index: number = 0) {
    await this.incrementButtons.nth(index).click();
  }

  /**
   * Decrement quantity of first item
   */
  async decrementQuantity(index: number = 0) {
    await this.decrementButtons.nth(index).click();
  }

  /**
   * Get quantity of item
   */
  async getQuantity(index: number = 0): Promise<string | null> {
    return await this.quantityDisplays.nth(index).textContent();
  }

  /**
   * Remove item from cart
   */
  async removeItem(index: number = 0) {
    await this.removeButtons.nth(index).click();
  }

  /**
   * Check if order summary is visible
   */
  async isOrderSummaryVisible(): Promise<boolean> {
    return await this.orderSummary.isVisible();
  }

  /**
   * Get number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    if (await this.isCartEmpty()) {
      return 0;
    }
    return await this.cartItems.count();
  }

  /**
   * Continue shopping from empty cart
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

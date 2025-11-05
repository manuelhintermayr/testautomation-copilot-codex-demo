import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CheckoutPage - Page object for checkout page
 */
export class CheckoutPage extends BasePage {
  // Locators
  private readonly checkoutHeading: Locator;
  private readonly deliveryMethodLabel: Locator;
  private readonly pickupMethodLabel: Locator;
  private readonly fullNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly addressInput: Locator;
  private readonly placeOrderButton: Locator;
  private readonly backToCartButton: Locator;
  private readonly orderSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutHeading = page.getByRole('heading', { name: 'Secure Checkout' });
    // Delivery method radio buttons based on actual HTML
    this.deliveryMethodLabel = page.locator('label:has-text("Express Delivery")');
    this.pickupMethodLabel = page.locator('label:has-text("Store Pickup")');
    // Form inputs based on placeholders in actual HTML
    this.fullNameInput = page.getByPlaceholder('John Doe');
    this.emailInput = page.getByPlaceholder('john@example.com');
    this.addressInput = page.getByPlaceholder('123 Tech Street, Innovation City, Future State 12345');
    // Buttons based on actual text
    this.placeOrderButton = page.getByRole('button', { name: 'Complete Order' });
    this.backToCartButton = page.getByRole('button', { name: 'Back to Cart' });
    this.orderSummary = page.getByText('Order Summary');
  }

  /**
   * Check if on checkout page
   */
  async isOnCheckoutPage(): Promise<boolean> {
    return await this.checkoutHeading.isVisible();
  }

  /**
   * Select delivery method
   */
  async selectDelivery() {
    await this.deliveryMethodLabel.click();
  }

  /**
   * Select pickup method
   */
  async selectPickup() {
    await this.pickupMethodLabel.click();
  }

  /**
   * Check if pickup is selected (has primary border)
   */
  async isPickupSelected(): Promise<boolean> {
    const classes = await this.pickupMethodLabel.getAttribute('class');
    return classes?.includes('border-primary-600') || false;
  }

  /**
   * Check if delivery is selected (has primary border)
   */
  async isDeliverySelected(): Promise<boolean> {
    const classes = await this.deliveryMethodLabel.getAttribute('class');
    return classes?.includes('border-primary-600') || false;
  }

  /**
   * Fill customer information
   */
  async fillCustomerInfo(name: string, email: string, address?: string) {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    if (address) {
      await this.addressInput.fill(address);
    }
  }

  /**
   * Place the order
   */
  async placeOrder() {
    await this.placeOrderButton.click();
  }

  /**
   * Go back to cart
   */
  async backToCart() {
    await this.backToCartButton.click();
  }

  /**
   * Check if order summary is visible
   */
  async isOrderSummaryVisible(): Promise<boolean> {
    return await this.orderSummary.isVisible();
  }

  /**
   * Complete checkout flow with pickup
   */
  async completeCheckoutWithPickup(name: string, email: string) {
    await this.selectPickup();
    await this.fillCustomerInfo(name, email);
    await this.placeOrder();
  }

  /**
   * Complete checkout flow with delivery
   */
  async completeCheckoutWithDelivery(name: string, email: string, address: string) {
    await this.selectDelivery();
    await this.fillCustomerInfo(name, email, address);
    await this.placeOrder();
  }
}

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ConfirmationPage - Page object for order confirmation page
 */
export class ConfirmationPage extends BasePage {
  // Locators
  private readonly confirmationHeading: Locator;
  private readonly successIcon: Locator;
  private readonly thankYouMessage: Locator;
  private readonly orderNumberText: Locator;
  private readonly orderDetails: Locator;
  private readonly deliveryInfo: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmationHeading = page.getByRole('heading', { name: 'Order Confirmed!' });
    this.successIcon = page.locator('svg.text-green-500');
    this.thankYouMessage = page.getByText(/Thank you for your order/);
    this.orderNumberText = page.getByText(/Your order number is:/);
    this.orderDetails = page.getByText('Order Details');
    this.deliveryInfo = page.locator('.bg-blue-50');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  /**
   * Check if on confirmation page
   */
  async isOnConfirmationPage(): Promise<boolean> {
    return await this.confirmationHeading.isVisible();
  }

  /**
   * Check if success icon is visible
   */
  async isSuccessIconVisible(): Promise<boolean> {
    return await this.successIcon.isVisible();
  }

  /**
   * Get the thank you message text
   */
  async getThankYouMessage(): Promise<string | null> {
    return await this.thankYouMessage.textContent();
  }

  /**
   * Check if order number is displayed
   */
  async isOrderNumberDisplayed(): Promise<boolean> {
    return await this.orderNumberText.isVisible();
  }

  /**
   * Get the order number
   */
  async getOrderNumber(): Promise<string | null> {
    const fullText = await this.orderNumberText.textContent();
    // Extract order number from text like "Your order number is: #TS-12345678"
    const match = fullText?.match(/#TS-\d+/);
    return match ? match[0] : null;
  }

  /**
   * Check if order details section is visible
   */
  async isOrderDetailsVisible(): Promise<boolean> {
    return await this.orderDetails.isVisible();
  }

  /**
   * Check if delivery info is visible
   */
  async isDeliveryInfoVisible(): Promise<boolean> {
    return await this.deliveryInfo.isVisible();
  }

  /**
   * Continue shopping
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Verify customer name in thank you message
   */
  async verifyCustomerName(name: string): Promise<boolean> {
    const message = await this.getThankYouMessage();
    return message?.includes(name) || false;
  }
}

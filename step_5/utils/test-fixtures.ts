import { test as base } from '@playwright/test';
import { HomePage } from './HomePage';
import { SearchPage } from './SearchPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { ConfirmationPage } from './ConfirmationPage';
import { NavigationPage } from './NavigationPage';

/**
 * Custom test fixtures that provide page object instances
 * Usage: test('test name', async ({ home, cart, checkout, ... }) => { ... })
 */
type PageObjects = {
  home: HomePage;
  search: SearchPage;
  cart: CartPage;
  checkout: CheckoutPage;
  confirmation: ConfirmationPage;
  navigation: NavigationPage;
};

/**
 * Extended test with page object fixtures
 */
export const test = base.extend<PageObjects>({
  home: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  search: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },

  cart: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkout: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  confirmation: async ({ page }, use) => {
    const confirmationPage = new ConfirmationPage(page);
    await use(confirmationPage);
  },

  navigation: async ({ page }, use) => {
    const navigationPage = new NavigationPage(page);
    await use(navigationPage);
  },
});

/**
 * Re-export expect from Playwright
 */
export { expect } from '@playwright/test';

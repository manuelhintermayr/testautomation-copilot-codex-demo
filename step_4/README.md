# Step 4: Page Object Model Pattern for Maintainable Tests

## Overview

This step implements the Page Object Model (POM) design pattern to create maintainable, readable, and scalable test automation.

## Prompt Used

```
Create step_4 from step_3, implement Page Object Model pattern with:
- Base page object class in utils folder
- Individual page objects for each area (home, cart, checkout, search, etc.)
- Custom test fixtures extending Playwright's test
- Tests using fixtures: test('xxx', async ({ home, cart, checkout }) => { ... })
- Import only expect from '@playwright/test', test comes from custom fixtures
```

For the complete prompt and detailed implementation notes, see [PROMPT.md](PROMPT.md).

## What Was Done

This step refactors the test suite to use the Page Object Model pattern for improved maintainability and readability.

### Actions Taken

1. **Created Page Object Classes**
   - `BasePage.ts` - Base class with common functionality
   - `HomePage.ts` - Home page interactions
   - `SearchPage.ts` - Search functionality
   - `CartPage.ts` - Shopping cart operations
   - `CheckoutPage.ts` - Checkout process
   - `ConfirmationPage.ts` - Order confirmation
   - `NavigationPage.ts` - Navigation and theme toggle

2. **Implemented Custom Test Fixtures**
   ```typescript
   // test-fixtures.ts
   export const test = base.extend<PageObjects>({
     home: async ({ page }, use) => {
       const homePage = new HomePage(page);
       await use(homePage);
     },
     // ... other fixtures
   });
   
   export { expect } from '@playwright/test';
   ```

3. **Refactored All Tests**
   ```typescript
   // Before
   import { test, expect } from '@playwright/test';
   test('name', async ({ page }) => {
     await page.goto('/sut/index.html');
     await page.waitForSelector('.product-card');
     // ... more page interactions
   });
   
   // After
   import { test, expect } from '../utils/test-fixtures';
   test('name', async ({ home }) => {
     await home.navigateToHome();
     // Clean, readable methods
   });
   ```

### Page Object Structure

```
utils/
├── BasePage.ts              # Common functionality for all pages
├── HomePage.ts              # Hero, products, add to cart
├── SearchPage.ts            # Search, filter, clear search
├── CartPage.ts              # Cart operations, quantities
├── CheckoutPage.ts          # Delivery, customer info, place order
├── ConfirmationPage.ts      # Order confirmation, order number
├── NavigationPage.ts        # Navigation, theme toggle
└── test-fixtures.ts         # Custom test fixtures
```

### Benefits Achieved

**Maintainability:**
- UI changes only require updates to page objects
- Tests remain unchanged when selectors change
- Single source of truth for element locations

**Readability:**
- Tests read like user stories
- Business logic separated from technical details
- Self-documenting code

**Reusability:**
- Page object methods reused across tests
- Common workflows encapsulated
- Reduced code duplication

**Scalability:**
- Easy to add new page objects
- Modular structure supports growth
- Better team collaboration

## Code Comparison

### Before (Direct Page Interactions)

```typescript
test('should add product and checkout', async ({ page }) => {
  await page.goto('/sut/index.html');
  await page.waitForSelector('.product-card', { timeout: 10000 });
  
  await page.locator('.product-card').first()
    .getByRole('button', { name: 'Add to Cart' }).click();
  
  await page.getByRole('button', { name: /Cart/ }).click();
  await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
  
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  
  await page.getByText('Store Pickup').click();
  await page.getByLabel('Full Name').fill('John Doe');
  await page.getByLabel('Email').fill('john@example.com');
  await page.getByRole('button', { name: 'Place Order' }).click();
  
  await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible();
});
```

### After (Page Object Model)

```typescript
test('should add product and checkout', async ({ home, cart, checkout, confirmation }) => {
  await home.navigateToHome();
  await home.addFirstProductToCart();
  
  await cart.navigateToCart();
  expect(await cart.isOnCartPage()).toBeTruthy();
  
  await cart.proceedToCheckout();
  await checkout.completeCheckoutWithPickup('John Doe', 'john@example.com');
  
  expect(await confirmation.isOnConfirmationPage()).toBeTruthy();
});
```

## Page Object Examples

### HomePage Methods

```typescript
await home.navigateToHome()          // Navigate and wait for load
await home.addFirstProductToCart()   // Add first product
await home.clickExploreCollection()  // Scroll to products
const count = await home.getProductCount()  // Get product count
const details = await home.getProductDetails(0)  // Get product info
```

### CartPage Methods

```typescript
await cart.navigateToCart()          // Go to cart page
await cart.incrementQuantity(0)      // Increase quantity
await cart.decrementQuantity(0)      // Decrease quantity
await cart.removeItem(0)             // Remove item
await cart.proceedToCheckout()       // Go to checkout
const count = await cart.getCartBadgeCount()  // Get badge count
```

### CheckoutPage Methods

```typescript
await checkout.selectPickup()        // Select pickup method
await checkout.selectDelivery()      // Select delivery method
await checkout.fillCustomerInfo(name, email, address)
await checkout.placeOrder()          // Place the order
await checkout.completeCheckoutWithPickup(name, email)  // Full flow
```

## Custom Test Fixtures Usage

Instead of importing `test` from Playwright:

```typescript
// Old way
import { test, expect } from '@playwright/test';

// New way (step_4)
import { test, expect } from '../utils/test-fixtures';
```

Tests now receive page objects as fixtures:

```typescript
test('test name', async ({ home, cart, checkout, search, navigation, confirmation }) => {
  // Use page objects directly
  await home.navigateToHome();
  await search.search('iPhone');
  // ...
});
```

## Running the Tests

### One-Command Test Execution

```bash
cd step_4

# Install dependencies (first time only)
npm install
npx playwright install

# Run all tests with Page Object Model
npm test

# Automated flow (same as step_3):
# 1. Start Vite server on :8888
# 2. Run tests in visible browsers (headless:false)
# 3. Use 2 parallel workers
# 4. Generate HTML report
# 5. Stop server
# 6. Display report
```

### Development Commands

```bash
# Interactive test mode
npm run test:ui

# Run with headed browsers
npm run test:headed

# Show existing report
npm run show-report

# Start dev server manually
npm run dev
```

## Test Coverage (Same as step_3, now with POM)

All 22 tests from step_3, refactored with page objects:

```
✓ TechShop - Home Page (5 tests)
✓ TechShop - Search Functionality (3 tests)
✓ TechShop - Shopping Cart (5 tests)
✓ TechShop - Checkout Process (5 tests)
✓ TechShop - Theme Toggle (1 test)
✓ TechShop - Navigation (2 tests)
```

## Comparison with step_3

| Feature | step_3 | step_4 |
|---------|--------|--------|
| **Pattern** | Direct interactions | Page Object Model |
| **Test Code** | ~14KB | ~9.7KB (-32%) |
| **Page Objects** | None | 7 classes (~18.5KB) |
| **Locators** | In tests | In page objects |
| **Test Readability** | Technical | Business-focused |
| **Maintainability** | Medium | High |
| **Reusability** | Low | High |
| **Fixtures** | `{ page }` | `{ home, cart, ... }` |
| **Import** | `@playwright/test` | Custom fixtures |

## Key Advantages

1. **Separation of Concerns** - Test logic separate from page interactions
2. **DRY Principle** - No repeated selectors or interaction code
3. **Type Safety** - Full TypeScript support with IntelliSense
4. **Easy Maintenance** - UI changes only affect page objects
5. **Readable Tests** - Tests read like requirements
6. **Team Collaboration** - Clear structure for multiple developers

## Next Steps

Future enhancements:
- API testing integration
- Visual regression testing
- Performance testing
- Custom test reporters
- Test data factories
- Component testing
- Advanced CI/CD integration

For complete details on the prompts used and full implementation, see [PROMPT.md](PROMPT.md).

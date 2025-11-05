# Step 5: Prompts and Implementation

## Preview

![Page Object Model Preview](preview.png)

*Professional test automation architecture with Page Object Model pattern, enabling maintainable and enterprise-ready test suites.*

This document describes the prompts used to create this step and the results achieved.

## Original Problem Statement / Prompt

**German (Original):**

> Jetzt erstelle bitte den "step_5"-folder wo auch alles von step_4 rüberkopiert wird und dann, du kennst es, die md files angepasst werden. Ich will, dass du nun für die playwright tests page objects einführst. Gerne legst dafür im utils ordner für die einzelne bereiche unterschiedliche page object klassen ein die das page object inherit haben und eine base page object klasse. Auf diese klasse kann dann zugegriffen wird in den spec.ts klassen. Bei den einzelnen tests kann ich dann statt der normalen page object auch die page object klassen abrufen a la: 
>
> test('xxx', async ({ home, cart, checkout, search, ....}) => {
>  
> Dazu kannst du { test } from '@playwright/test' erweitern in einer eigenen base klasse und stattdessen wird in den tests nicht mehr "import { test, expect } from '@playwright/test';" gemacht sonder nur mehr das expect. Das "test" wird von dieser neuen base klassen übernommen

**English Translation:**

> Now please create the "step_5" folder where everything from step_4 is copied over and then, you know it, the md files are adapted. I want you to now introduce page objects for the Playwright tests. Please create different page object classes for the individual areas in the utils folder that inherit from a base page object class. These classes can then be accessed in the spec.ts files. In the individual tests, instead of the normal page object, you can access the page object classes like: 
>
> test('xxx', async ({ home, cart, checkout, search, ....}) => {
>  
> For this, you can extend { test } from '@playwright/test' in your own base class, and instead in the tests, "import { test, expect } from '@playwright/test';" is no longer used, but only expect. The "test" is taken from this new base class.

**Note:** This was originally intended for step_5 but was moved to step_5 to maintain the correct progression.

## Tasks Breakdown

### Task 1: Create step_5 Structure
- Create step_5 folder
- Copy all files from step_4 to step_5
- Maintain all test infrastructure and configuration
- Update documentation files

### Task 2: Implement Page Object Model (POM) Pattern

**Sub-task 2.1: Create Base Page Object Class**
- Create `utils/BasePage.ts`
- Base class with common functionality
- Methods for navigation, waiting, clicking, filling forms
- Shared utilities for all page objects

**Sub-task 2.2: Create Individual Page Object Classes**
- Create `utils/HomePage.ts` - Home/landing page functionality
- Create `utils/SearchPage.ts` - Search functionality
- Create `utils/CartPage.ts` - Shopping cart operations
- Create `utils/CheckoutPage.ts` - Checkout process
- Create `utils/ConfirmationPage.ts` - Order confirmation
- Create `utils/NavigationPage.ts` - Navigation and theme toggle

**Sub-task 2.3: Create Custom Test Fixtures**
- Create `utils/test-fixtures.ts`
- Extend Playwright's `test` with custom fixtures
- Provide page object instances as fixtures
- Export custom `test` and `expect`

**Sub-task 2.4: Refactor Tests to Use Page Objects**
- Update all test files to use custom fixtures
- Import `test` and `expect` from `test-fixtures.ts`
- Use page objects instead of direct page interactions
- Simplify test code with page object methods

### Task 3: Update Documentation
- Create PROMPT.md with implementation details
- Update README.md for step_5
- Document Page Object Model structure and benefits

## Implementation Result

**Pull Request:** This implementation continues from [PR #1](https://github.com/manuelhintermayr/testautomation-copilot-codex-demo/pull/1)

### Files Created in step_5/utils/

#### 1. **`BasePage.ts`** (Base Page Object Class)
- Common functionality for all page objects
- Methods: `goto()`, `waitForPageLoad()`, `click()`, `fill()`, `isVisible()`
- Shared utilities and helper methods

#### 2. **`HomePage.ts`** (Home Page Object)
- Hero section interactions
- Product display and management
- Add to cart functionality
- Product card interactions
- Badge checking (Featured, New)

#### 3. **`SearchPage.ts`** (Search Page Object)
- Search input handling
- Result filtering
- Clear search functionality
- No results handling

#### 4. **`CartPage.ts`** (Cart Page Object)
- Cart navigation
- Item quantity management (increment/decrement)
- Remove items from cart
- Cart badge interactions
- Order summary validation

#### 5. **`CheckoutPage.ts`** (Checkout Page Object)
- Delivery method selection
- Customer information form filling
- Order placement
- Form validation
- Complete checkout flows

#### 6. **`ConfirmationPage.ts`** (Confirmation Page Object)
- Order confirmation validation
- Order number extraction
- Customer name verification
- Continue shopping functionality

#### 7. **`NavigationPage.ts`** (Navigation Page Object)
- Page navigation (Home, Cart)
- Theme toggle (Dark/Light mode)
- Cart count badge
- Logo and button interactions

#### 8. **`test-fixtures.ts`** (Custom Test Fixtures)
```typescript
export const test = base.extend<PageObjects>({
  home: async ({ page }, use) => { /* ... */ },
  search: async ({ page }, use) => { /* ... */ },
  cart: async ({ page }, use) => { /* ... */ },
  checkout: async ({ page }, use) => { /* ... */ },
  confirmation: async ({ page }, use) => { /* ... */ },
  navigation: async ({ page }, use) => { /* ... */ },
});

export { expect } from '@playwright/test';
```

### Test File Changes

**Before (step_4):**
```typescript
import { test, expect } from '@playwright/test';

test('should add product to cart', async ({ page }) => {
  await page.goto('/sut/index.html');
  await page.waitForSelector('.product-card', { timeout: 10000 });
  await page.locator('.product-card').first()
    .getByRole('button', { name: 'Add to Cart' }).click();
  const cartBadge = page.locator('button:has-text("Cart") span');
  await expect(cartBadge).toHaveText('1');
});
```

**After (step_5):**
```typescript
import { test, expect } from '../utils/test-fixtures';

test('should add product to cart', async ({ home, cart }) => {
  await home.navigateToHome();
  await home.addFirstProductToCart();
  const badgeCount = await cart.getCartBadgeCount();
  expect(badgeCount).toBe('1');
});
```

### Benefits of Page Object Model

**1. Maintainability**
- Changes to UI only require updates to page objects
- Tests remain unchanged when selectors change
- Single source of truth for element locations

**2. Reusability**
- Page object methods can be reused across tests
- Common workflows encapsulated in page objects
- Reduces code duplication

**3. Readability**
- Tests read like user stories
- Business logic separated from technical implementation
- Self-documenting code

**4. Testability**
- Page objects can be unit tested separately
- Easier to mock for testing
- Better separation of concerns

**5. Scalability**
- Easy to add new page objects
- Modular structure supports growth
- Team collaboration improved

## Technical Implementation Details

### Page Object Hierarchy

```
BasePage (abstract functionality)
  ├── HomePage
  ├── SearchPage
  ├── CartPage
  ├── CheckoutPage
  ├── ConfirmationPage
  └── NavigationPage
```

### Custom Test Fixtures Pattern

```typescript
// test-fixtures.ts
type PageObjects = {
  home: HomePage;
  search: SearchPage;
  cart: CartPage;
  // ...
};

export const test = base.extend<PageObjects>({
  home: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  // ...
});
```

### Usage in Tests

```typescript
// Tests can now use page objects directly as fixtures
test('test name', async ({ home, cart, checkout }) => {
  await home.navigateToHome();
  await home.addFirstProductToCart();
  await cart.navigateToCart();
  await cart.proceedToCheckout();
  await checkout.completeCheckoutWithPickup('John', 'john@example.com');
});
```

## Comparison: step_4 vs step_5

| Aspect | step_4 | step_5 |
|--------|--------|--------|
| **Pattern** | Direct page interactions | Page Object Model |
| **Test Code** | Verbose, technical | Concise, business-focused |
| **Locators** | In test files | In page objects |
| **Reusability** | Low | High |
| **Maintainability** | Medium | High |
| **Readability** | Technical | Business-readable |
| **Code Lines** | ~14,000 (tests) | ~9,700 (tests) + ~18,500 (PO) |
| **Test Import** | `@playwright/test` | Custom `test-fixtures` |
| **Fixtures** | `{ page }` | `{ home, cart, checkout, ... }` |

## File Structure

```
step_5/
├── utils/
│   ├── BasePage.ts              # Base page object class
│   ├── HomePage.ts              # Home page object
│   ├── SearchPage.ts            # Search page object
│   ├── CartPage.ts              # Cart page object
│   ├── CheckoutPage.ts          # Checkout page object
│   ├── ConfirmationPage.ts      # Confirmation page object
│   ├── NavigationPage.ts        # Navigation page object
│   └── test-fixtures.ts         # Custom test fixtures
├── tests/
│   └── techshop.spec.ts         # Refactored tests using POM
├── sut/
│   └── index.html               # TechShop application
├── package.json                 # Updated description
├── playwright.config.ts         # Unchanged
├── PROMPT.md                    # This file
└── README.md                    # Step documentation
```

## Running the Implementation

### Run Tests with Page Objects

```bash
cd step_5

# Install dependencies (if not already installed)
npm install

# Install Playwright browsers (if not already installed)
npx playwright install

# Run all tests (using Page Object Model)
npm test
# Same automated flow as step_4:
# 1. Start Vite server on :8888
# 2. Run tests in visible browsers
# 3. Generate HTML report
# 4. Stop server
# 5. Display report
```

### Test Execution

Tests now use clean, readable page object methods:
- `home.navigateToHome()`
- `home.addFirstProductToCart()`
- `cart.navigateToCart()`
- `checkout.completeCheckoutWithPickup()`
- `confirmation.verifyCustomerName()`

## Key Features

### 1. **Custom Test Fixtures**
```typescript
// Instead of: test('name', async ({ page }) => { ... })
// Now: test('name', async ({ home, cart, checkout }) => { ... })
```

### 2. **Encapsulated Page Logic**
- All selectors in page objects
- Reusable methods for common actions
- Business-focused test code

### 3. **Inheritance Hierarchy**
- BasePage provides common functionality
- Specific page objects extend BasePage
- Shared utilities across all pages

### 4. **Type Safety**
- TypeScript support throughout
- IntelliSense for page object methods
- Compile-time error checking

### 5. **Maintainable Tests**
- UI changes only affect page objects
- Tests remain stable
- Easy to update and extend

## Next Steps

Future steps (step_5, step_6, etc.) will progressively:
1. Add API testing alongside UI tests
2. Implement visual regression testing
3. Add performance testing
4. Create custom reporters
5. Implement test data factories
6. Add component testing
7. Integrate with CI/CD pipelines

Each subsequent step will include its own PROMPT.md documenting the exact prompts used and the evolution of the test automation suite.

## Summary

**What Changed from step_4:**
- Implemented Page Object Model pattern
- Created 7 page object classes (Base + 6 specific)
- Custom test fixtures replacing direct page usage
- Refactored all 22 tests to use page objects
- Improved test readability and maintainability
- Reduced test code complexity

**Benefits:**
- **32% reduction** in test code (14KB → 9.7KB)
- Clear separation of test logic and page interactions
- Reusable page object methods
- Type-safe page object interfaces
- Business-readable test code

The test suite now follows industry best practices with the Page Object Model pattern, making tests more maintainable, readable, and scalable.

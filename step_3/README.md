# Step 3: Comprehensive E2E Testing with Manual Server Management

## Preview

![TechShop Step 3 - Playwright Testing](preview.png)

## Overview

This step implements a complete end-to-end test suite for the TechShop application with manual server management and optimized test execution focused on Chromium browser.

## Prompt Used

```
Create step_3 from step_1, configure Playwright tests to run on localhost:8888 with manual
server management, headless:false, only Chromium browser, and separate HTML report command
```

For the complete prompt and detailed implementation notes, see [PROMPT.md](PROMPT.md).

## What Was Done

This step focuses on professional test automation with manual control over server and browser execution.

### Actions Taken

1. **Configured Manual Server Management**
   - Manual Vite server start required before tests
   - Tests run on fixed port :8888
   - Full developer control over server lifecycle
   - Separate commands for server and testing

2. **Updated Playwright Configuration**
   ```typescript
   export default defineConfig({
     baseURL: 'http://localhost:8888',
     headless: false,  // Visible browser execution
     workers: 2,       // Max 2 parallel tests
     projects: [
       { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
       // Firefox and WebKit disabled for faster execution
     ],
   });
   ```

3. **Created Comprehensive Test Suite (22+ tests)**
   - **Home Page Tests** - Title, hero section, products display, badges
   - **Search Functionality** - Filter, results, no results, clear search
   - **Shopping Cart** - Add, remove, quantities, totals, empty state
   - **Checkout Process** - Navigation, delivery selection, validation, confirmation
   - **Theme Toggle** - Dark/Light mode switching
   - **Navigation** - Page transitions, scroll behavior

4. **Updated Package Scripts for Windows Compatibility**
   ```json
   {
     "dev": "vite --open sut/index.html --port 8888",
     "test": "playwright test",
     "test:report": "playwright test && playwright show-report",
     "show-report": "playwright show-report"
   }
   ```

### Test Suite Coverage

**tests/techshop.spec.ts** - Complete e2e test coverage:

```
✓ TechShop - Home Page (5 tests)
  ✓ should load the home page with correct title
  ✓ should display hero section with call to action
  ✓ should display 20 products on home page
  ✓ should show product details correctly
  ✓ should display featured and new badges

✓ TechShop - Search Functionality (3 tests)
  ✓ should filter products based on search query
  ✓ should show "no results" message for non-existent product
  ✓ should clear search and show all products

✓ TechShop - Shopping Cart (6 tests)
  ✓ should add product to cart and update cart count
  ✓ should navigate to cart page and display added items
  ✓ should increment and decrement product quantity
  ✓ should remove product from cart
  ✓ should calculate cart total correctly

✓ TechShop - Checkout Process (5 tests)
  ✓ should navigate to checkout page from cart
  ✓ should select delivery method
  ✓ should validate required fields before placing order
  ✓ should complete checkout and show confirmation
  ✓ should clear cart after successful order

✓ TechShop - Theme Toggle (1 test)
  ✓ should toggle between light and dark mode

✓ TechShop - Navigation (2 tests)
  ✓ should navigate between pages
  ✓ should scroll to products when clicking Explore Collection
```

### Key Features

**Manual Control:**
- Full developer control over server lifecycle
- Manual server start/stop for debugging
- Separate test execution from server management
- Windows PowerShell optimized commands

**Optimized Browser Testing:**
- Chromium-only execution for faster development
- Firefox and WebKit disabled (can be re-enabled if needed)
- Visible browser execution (headless: false)
- Maximum 2 parallel workers for stability

**Comprehensive Test Coverage:**
- ✅ Server starts automatically before tests
- ✅ Server stops automatically after tests
- ✅ HTML report opens automatically
- ✅ No manual server management needed

**Visible Testing:**
- ✅ Browser windows visible during test execution
- ✅ Easy debugging and verification
- ✅ See exactly what's being tested

**Controlled Execution:**
- ✅ Maximum 2 parallel workers
- ✅ Stable and predictable test runs
- ✅ Better resource management

**Complete Coverage:**
- ✅ All user flows tested
- ✅ Edge cases covered
- ✅ Real-world scenarios validated

## Running the Tests

### One-Command Test Execution

```bash
cd step_3

# Install dependencies (first time only)
npm install
npx playwright install

# Run all tests (fully automated)
npm test

# This single command will:
# 1. Start Vite server on localhost:8888 (if not running)
# 2. Wait for server to be ready
# 3. Run all 25+ tests in visible browsers
# 4. Use max 2 parallel workers
# 5. Generate HTML test report
# 6. Stop the server (if it started it)
# 7. Automatically open HTML report in browser
```

### Development Workflow

```bash
# Option 1: Let tests manage the server
npm test  # Server starts, tests run, server stops, report opens

# Option 2: Manual server for development
npm run dev  # Start server manually (stays running)
# In another terminal:
npm test     # Tests will reuse existing server

# Option 3: Interactive test mode
npm run test:ui  # Playwright UI mode for debugging
```

### Other Commands

```bash
# Run tests with headed browsers
npm run test:headed

# Show existing HTML report
npm run show-report

# Start development server only
npm run dev
```

## Test Execution Flow

```
npm test
    ↓
Playwright checks localhost:8888
    ↓
Not running? → Start Vite server
Already running? → Reuse server
    ↓
Run all tests (headless: false)
    ↓
Execute with 2 parallel workers
    ↓
Generate HTML report
    ↓
Stop server (if Playwright started it)
    ↓
Open HTML report in browser
    ↓
Done!
```

## How to Run

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
cd step_3
npm install
```

### Manual Server & Testing Workflow

**Terminal 1 - Start Development Server:**
```bash
npm run dev
```
This opens http://localhost:8888 in your browser

**Terminal 2 - Run Tests:**
```bash
# Run tests only
npm run test

# Run tests with automatic report display (if tests pass)
npm run test:report

# Show report manually
npm run show-report
```

### Available Commands

- `npm run dev` - Start Vite development server on :8888
- `npm run test` - Run Playwright tests (Chromium only)
- `npm run test:report` - Run tests + show HTML report
- `npm run test:ui` - Run tests in interactive UI mode
- `npm run test:headed` - Run tests in visible browser
- `npm run show-report` - Display HTML test report

## Configuration Details

**Port Configuration:**
- Fixed port: `8888`
- Configured in both Vite and Playwright
- Consistent across development and testing

**Browser Configuration:**
- **headless: false** - Browsers visible during tests
- **workers: 2** - Maximum 2 tests in parallel
- **Chromium only** - Firefox and WebKit disabled for faster execution

**Server Configuration:**
- Manual start required: Server must be started before tests
- Full developer control over server lifecycle
- Windows PowerShell optimized

## Comparison with step_1

| Feature | step_1 | step_3 |
|---------|--------|--------|
| **Tests** | 2 example tests | 22+ e2e tests |
| **Server** | Manual start | Manual start |
| **Port** | Random | Fixed :8888 |
| **Headless** | Default (true) | False (visible) |
| **Workers** | Unlimited | Limited to 2 |
| **Browsers** | All browsers | Chromium only |
| **Coverage** | Minimal | Complete |
| **Report** | Manual | Manual/Auto |
| **Control** | Low | High |

## Benefits

1. **Manual Control** - Full developer control over server and tests
2. **Fast Execution** - Chromium-only for quick development feedback
3. **Visible Execution** - See tests running in real browsers
4. **Complete Coverage** - All features thoroughly tested
5. **Easy Debugging** - Visible browsers + HTML reports
6. **Windows Optimized** - PowerShell compatible commands

## Next Steps

Future enhancements:
- Page Object Model implementation
- API testing integration
- Visual regression testing
- Custom test utilities
- CI/CD pipeline integration
- Performance testing

For complete details on the prompts used and full implementation, see [PROMPT.md](PROMPT.md).

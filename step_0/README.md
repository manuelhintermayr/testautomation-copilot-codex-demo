# Step 0: Playwright Project Initialization

## Preview

![TechShop Step 0 - Basic E-commerce Application](preview.png)

## Prompt Used

```
Initialize a new Playwright project for test automation
```

## What Was Done

This step establishes the foundation for test automation by initializing a new Playwright project.

### Actions Taken

1. **Project Initialization**
   - Created a new Playwright project using `npm init playwright@latest`
   - Selected all three major browsers: Chromium, Firefox, and WebKit
   - Enabled GitHub Actions integration for CI/CD

2. **Project Structure Created**
   ```
   step_0/
   ├── .github/
   │   └── workflows/
   │       └── playwright.yml       # CI/CD workflow for GitHub Actions
   ├── sut/                          # System Under Test (webshop application)
   │   ├── shop.html                # Single-page e-commerce app
   │   ├── README.md                # SUT documentation
   │   ├── RUNNING.md               # How to run the app
   │   └── VISUAL_GUIDE.md          # Visual description
   ├── tests/
   │   └── example.spec.ts          # Sample test file
   ├── node_modules/                # Dependencies (installed automatically)
   ├── .gitignore                   # Playwright-specific ignore rules
   ├── package.json                 # Project dependencies
   ├── package-lock.json            # Locked dependency versions
   ├── playwright.config.ts         # Playwright configuration
   ├── PROMPT.md                    # Detailed prompts and implementation
   └── README.md                    # This file
   ```

3. **Configuration Details**
   - **Test Directory**: `./tests`
   - **Browser Projects**: Chromium, Firefox, WebKit
   - **Parallel Execution**: Enabled
   - **Tracing**: Enabled on first retry
   - **Reporter**: HTML reporter
   - **CI Integration**: GitHub Actions workflow included

4. **Dependencies Installed**
   - `@playwright/test`: Latest version of Playwright Test framework
   - `@types/node`: TypeScript type definitions for Node.js

### Sample Tests Included

The initialization created an `example.spec.ts` file with two basic tests:
1. **Title Test**: Verifies that the Playwright website has the correct title
2. **Navigation Test**: Tests clicking the "Get started" link and verifying the Installation heading

### Next Steps

Future steps will build upon this foundation by:
- Creating tests for the TechShop application in the `sut/` subfolder
- Implementing page object models
- Adding custom test utilities and helpers
- Expanding test coverage for all features

For complete details on the prompts used and full implementation, see [PROMPT.md](PROMPT.md).

## Running the Tests

To run the example tests (after browser installation):

```bash
# Install browsers (if not already installed)
npx playwright install

# Run all tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run tests in headed mode (see browser)
npx playwright test --headed

# View HTML report
npx playwright show-report
```

## Notes

- This is a fresh, minimal Playwright setup with no customizations
- The example tests target the official Playwright documentation site
- In subsequent steps, tests will be created for the TechShop application
- The GitHub Actions workflow is ready to run tests in CI/CD pipelines

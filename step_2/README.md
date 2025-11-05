# Step 2: Modular Application Architecture

## Preview

![TechShop Step 2 - Modular Architecture](preview.png)

## Overview

This step transforms the monolithic single-file application from step_1 into a modular, well-organized architecture with separated concerns.

## Prompt Used

```
Create step_2 folder, copy everything from step_1, and split index.html into separate files:
- JSON file for products data
- CSS in separate file
- JavaScript in separate files
- Components in separate files
```

For the complete prompt and detailed implementation notes, see [PROMPT.md](PROMPT.md).

## What Was Done

This step focuses on code organization and maintainability by refactoring the application into modular components.

### Actions Taken

1. **Created Modular File Structure**
   - Extracted products data into `products.json`
   - Separated CSS into `styles.css`
   - Extracted Tailwind config to `tailwind.config.js`
   - Moved Vue app logic to `app.js`
   - Cleaned up `index.html` to contain only HTML structure

2. **New File Organization**
   ```
   step_2/sut/
   ├── index.html              # HTML structure and template (431 lines, -52%)
   ├── tailwind.config.js      # Tailwind configuration
   ├── styles.css              # Custom CSS styles
   ├── app.js                  # Vue application logic
   ├── products.json           # Products data (20 products)
   ├── README.md               # SUT documentation
   ├── RUNNING.md              # How to run the app
   └── VISUAL_GUIDE.md         # Visual description
   ```

3. **Benefits Achieved**
   - **Separation of Concerns**: Data, styling, logic, and structure separated
   - **Better Maintainability**: Each file has a single responsibility
   - **Improved Testability**: Components can be tested independently
   - **Enhanced Reusability**: Modules can be reused across pages
   - **Cleaner Code**: 52% reduction in HTML file size

### File Details

**products.json (5.9 KB)**
- JSON array with all 20 products
- Structured data with: id, name, description, price, category, rating, badges
- Dynamically loaded by the application

**styles.css (1.4 KB)**
- Glass morphism effects
- Gradient backgrounds
- Product card animations
- Cyber border effects
- Dark mode variations

**tailwind.config.js (2.0 KB)**
- Custom color palette (primary, dark)
- Custom animations (float, glow, slideInUp, fadeIn)
- Keyframe definitions
- Dark mode configuration

**app.js (4.8 KB)**
- Vue 3 application initialization
- Asynchronous products data loading
- Application state management
- Computed properties
- All methods (cart, checkout, theme toggle)

### Comparison with step_1

| Feature | step_1 | step_2 |
|---------|--------|--------|
| Files | 1 monolithic HTML | 5 modular files |
| HTML Size | 897 lines | 431 lines (-52%) |
| Data | Embedded in JS | External JSON |
| CSS | Inline `<style>` | External file |
| JS | Inline `<script>` | External file |
| Maintainability | Medium | High |
| Testability | Low | High |

## Running the Application

### Start the SUT with Vite

```bash
cd step_2

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev
```

### Or use a simple HTTP server

```bash
cd step_2/sut
python3 -m http.server 8000
# Navigate to http://localhost:8000/index.html
```

## Running the Tests

To run the Playwright tests (after browser installation):

```bash
# Install browsers (if not already installed)
npx playwright install

# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# View HTML report
npm run show-report
```

## Next Steps

Future steps will build upon this modular foundation by:
- Creating comprehensive Playwright tests for the modular application
- Implementing component-based architecture with single-file components
- Adding state management (Vuex/Pinia)
- Creating page object models for tests
- Implementing API integration for products

For complete details on the prompts used and full implementation, see [PROMPT.md](PROMPT.md).

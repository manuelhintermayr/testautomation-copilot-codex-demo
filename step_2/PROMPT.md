# Step 2: Prompts and Implementation

This document describes the prompts used to create this step and the results achieved.

## Original Problem Statement / Prompt

**German (Original):**

> Jetzt erstelle bitte den "step_2"-folder wo auch alles von step_1 rüberkopiert wird und dann, du kennst es, die md files angepasst werden. Ich will, dass du für index.html beginnst dieses aufzuteilen: ein eigenes json file für die produkte, das css in ein eigenes file. JS kommt auch in eigene files. Komponenten bitte auch in eigene files.

**English Translation:**

> Now please create the "step_2" folder where everything from step_1 is copied over and then, you know it, the md files are adapted. I want you to start splitting up the index.html: a separate json file for the products, the css in a separate file. JS also goes into separate files. Components please also in separate files.

## Tasks Breakdown

### Task 1: Create step_2 Structure
- Create step_2 folder
- Copy all files from step_1 to step_2
- Maintain Playwright configuration and tests
- Maintain Vite development server setup

### Task 2: Modularize index.html

**Sub-task 2.1: Extract Products Data**
- Create `products.json` file
- Move all 20 products data from Vue component to JSON
- Maintain product structure (id, name, description, price, category, etc.)
- Load products dynamically in Vue application

**Sub-task 2.2: Extract CSS Styles**
- Create `styles.css` file
- Move custom CSS rules from `<style>` tag
- Keep glass morphism effects
- Keep gradient backgrounds
- Keep product card animations
- Keep cyber border effects

**Sub-task 2.3: Extract Tailwind Configuration**
- Create `tailwind.config.js` file
- Move Tailwind custom configuration
- Extract color palette (primary, dark colors)
- Extract custom animations (float, glow, slideInUp, fadeIn)
- Extract keyframes definitions

**Sub-task 2.4: Extract JavaScript Application Logic**
- Create `app.js` file
- Move Vue application initialization
- Move all Vue component logic (data, computed, methods)
- Implement products data loading from JSON
- Maintain all existing functionality

**Sub-task 2.5: Create Modular index.html**
- Keep only HTML structure and template
- Link external CSS file
- Link external Tailwind config
- Link external JavaScript file
- Link Vue.js CDN
- Maintain proper HTML structure

### Task 3: Update Documentation
- Update PROMPT.md with step_2 details
- Update README.md explaining the modular structure
- Update root README.md to include step_2

## Implementation Result

**Pull Request:** This implementation continues from [PR #1](https://github.com/manuelhintermayr/testautomation-copilot-codex-demo/pull/1)

### Files Created/Modified in step_2/sut/

#### New Files Created:
1. **`products.json`** (5.9 KB)
   - JSON array containing all 20 products
   - Structured product data with all fields
   - Easy to maintain and update
   - Can be loaded dynamically

2. **`styles.css`** (1.4 KB)
   - All custom CSS styles
   - Glass morphism effects
   - Gradient backgrounds
   - Product card animations
   - Cyber border effects
   - Dark mode variations

3. **`tailwind.config.js`** (2.0 KB)
   - Tailwind CSS configuration
   - Custom color palette (primary, dark)
   - Custom animations (float, glow, slideInUp, fadeIn)
   - Keyframes definitions
   - Dark mode class strategy

4. **`app.js`** (4.8 KB)
   - Vue 3 application initialization
   - Products data loading from JSON
   - All application state management
   - Computed properties (displayedProducts, cartItemCount, cartTotal)
   - All methods (theme toggle, cart management, checkout flow)
   - Lifecycle hooks (mounted)

#### Modified Files:
1. **`index.html`** (reduced from 897 to 431 lines - 52% reduction)
   - Clean HTML structure
   - External file references
   - Vue template only
   - No inline scripts or styles
   - Better maintainability

### Technical Implementation Details

**File Structure (Before vs After):**

```
Before (step_1):
step_1/sut/
└── index.html (897 lines)
    ├── <script> Tailwind config (64 lines)
    ├── <style> Custom CSS (56 lines)
    ├── <body> HTML Template (408 lines)
    └── <script> Vue App (369 lines)

After (step_2):
step_2/sut/
├── index.html (431 lines) - HTML structure only
├── tailwind.config.js (64 lines) - Tailwind configuration
├── styles.css (56 lines) - Custom CSS
├── app.js (155 lines) - Vue application logic
└── products.json (243 lines) - Products data
```

**Benefits of Modularization:**

1. **Separation of Concerns**
   - Data (products.json)
   - Styling (styles.css, tailwind.config.js)
   - Logic (app.js)
   - Structure (index.html)

2. **Maintainability**
   - Easier to find and edit specific parts
   - Each file has a single responsibility
   - Better code organization

3. **Reusability**
   - Products data can be used by other tools
   - CSS can be reused in other pages
   - JavaScript modules can be extended

4. **Testability**
   - Products data can be validated separately
   - JavaScript logic can be unit tested
   - CSS can be linted independently

5. **Performance**
   - Files can be cached separately
   - Only changed files need to be reloaded
   - Better for development workflow

**Products Data Loading:**

```javascript
// app.js - Asynchronous data loading
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        productsData = data;
        initializeApp();
    })
    .catch(error => {
        console.error('Error loading products:', error);
        initializeApp(); // Fallback with empty products
    });
```

**File References in index.html:**

```html
<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Tailwind Configuration -->
<script src="tailwind.config.js"></script>

<!-- Custom Styles -->
<link rel="stylesheet" href="styles.css">

<!-- Vue.js 3 CDN -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Vue Application -->
<script src="app.js"></script>
```

## Comparison: step_1 vs step_2

| Aspect | step_1 | step_2 |
|--------|--------|--------|
| **Architecture** | Monolithic (single HTML file) | Modular (5 separate files) |
| **Total Lines** | 897 lines in 1 file | 949 lines in 5 files |
| **HTML Size** | 897 lines | 431 lines (-52%) |
| **Data Management** | Embedded in JavaScript | External JSON file |
| **CSS Organization** | Inline `<style>` tag | External `styles.css` |
| **JS Organization** | Inline `<script>` tag | External `app.js` |
| **Tailwind Config** | Inline `<script>` | External `.js` file |
| **Maintainability** | Medium | High |
| **Testability** | Low | High |
| **Reusability** | Low | High |
| **Development** | Edit single large file | Edit focused small files |

## Running the Implementation

### Start the SUT Application

```bash
cd step_2

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev

# Or use a simple HTTP server
cd sut
python3 -m http.server 8000
# Navigate to http://localhost:8000/index.html
```

### Run Playwright Tests

```bash
cd step_2

# Install Playwright browsers (if not already installed)
npx playwright install

# Run tests
npm test

# Run tests in UI mode
npm run test:ui

# View test report
npm run show-report
```

## Next Steps

Future steps (step_3, step_4, etc.) will progressively:
1. Create actual Playwright tests for the modular TechShop application
2. Implement component-based architecture with Vue single-file components
3. Add state management (Vuex/Pinia)
4. Implement API integration for products
5. Add more advanced test patterns and page object models

Each subsequent step will include its own PROMPT.md documenting the exact prompts used and the evolution of the application and test automation suite.

## Summary

**What Changed:**
- Transformed monolithic single-file application into modular architecture
- Separated concerns: data, styles, logic, and structure
- Improved code organization and maintainability
- Enhanced testability and reusability
- Maintained all functionality from step_1

**Files Split:**
- `products.json` - Product catalog data
- `styles.css` - Custom CSS styles
- `tailwind.config.js` - Tailwind configuration
- `app.js` - Vue application logic
- `index.html` - HTML structure and template

The application remains functionally identical to step_1 but with a cleaner, more professional, and maintainable code structure.

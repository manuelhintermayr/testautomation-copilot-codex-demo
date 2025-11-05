# Step 0: Prompts and Implementation

## Preview

![TechShop Step 0 - System Under Test](preview.png)

This document describes the prompts used to create this step and the results achieved.

## Original Problem Statement / Prompt

**German (Original):**

> "This is a demo to show off what all can be done in test automation with copilot or codex" ==> bitte erstelle ein entsprechendes repo. Es gibt mehrere folder: "sut"-folder und "step_x"-folders. In dem "sut" ist das System under Test. In den step_x-foldern ist jeweils die jeweiligen step bzw solutions.
>
> Du fängst an mit den readme.md, bitte lizenz vermerken und dort beschreiben, was das ziel des repos ist auf englisch. Du beschreibst dass in jedem step_x-folder (also step_0, step_1, step_2, ... step_n") jeder dieser folder die solution einen schritt weiter geht, immer mit den nächsten Prompt result. in dem jeweiligen ordner ist dann auch der Prompt beschrieben und was getan wurde.
>
> Du machst nun "sut" und "step_0"
> In "step_0" initalisiert du einfach nur ein neues playwright projekt, nicht mehr.
> In "sut" erstellst du bitte ein single html file mit tailwind und vue3 wrapper. Ich will einen online webshop haben, alles mit fake daten aber visuell aufbereitet. Ähnlich wie amazon, medimops, meiertobler oder sonstiges. Sexy style. Folgende Features:
> - Hauptseite des Shops mit 5 Beispielprodukten mit Sample Bildern
> - Suche (in der nav der hauptseite und allen anderen seiten eingebeddet) wo ebenfalls nach diesem 5 Beispielprodukten gesucht werden kann
> - Aktueller Warenkorb Seite zu dem die Beispielprodukte einmal oder mehrmals hinzugefügt werden können, bzw auch gelöscht werden können. Über den aktuellen Warenkorb kann zur CheckoutPage geswicht werden
> - Checkout page siehst du eine Summary und kannst zwischen pickup und delivery entscheiden. Wenn du alles durchgegangen bist kommt so ein "okay-hackerl" das zeigt, dass die Bestellung abgeschickt wurde auf einer summary page und der aktuelle Warenkorb wird wieder gecleared.

**English Translation:**

> "This is a demo to show off what all can be done in test automation with copilot or codex" ==> please create a corresponding repo. There are multiple folders: "sut"-folder and "step_x"-folders. In "sut" is the System Under Test. In the step_x-folders are the respective steps and solutions.
>
> You start with the readme.md, please note the license and describe what the goal of the repo is in English. You describe that in each step_x-folder (so step_0, step_1, step_2, ... step_n) each of these folders takes the solution one step further, always with the next prompt result. In the respective folder, the prompt is also described and what was done.
>
> You now do "sut" and "step_0"
> In "step_0" you simply initialize a new playwright project, nothing more.
> In "sut" please create a single html file with tailwind and vue3 wrapper. I want an online webshop, everything with fake data but visually prepared. Similar to amazon, medimops, meiertobler or similar. Sexy style. Following features:
> - Main page of the shop with 5 example products with sample images
> - Search (in the nav of the main page and all other pages embedded) where you can also search for these 5 example products
> - Current shopping cart page where the example products can be added once or multiple times, or deleted. From the current shopping cart you can switch to the checkout page
> - Checkout page you see a summary and can choose between pickup and delivery. When you've gone through everything, there's an "okay checkmark" that shows the order was sent on a summary page and the current shopping cart is cleared again.

## Tasks Breakdown

### Task 1: Repository Setup
- Create/update README.md with MIT license reference
- Describe repository goal in English
- Explain step_x folder structure
- Document that each step progresses with prompts

### Task 2: Initialize Playwright Project (step_0)
**Sub-prompt:** "Initialize a new Playwright project for test automation"

**Actions:**
- Run `npm init playwright@latest`
- Configure for Chromium, Firefox, and WebKit browsers
- Enable GitHub Actions integration

### Task 3: Create System Under Test (sut)
**Requirements:**
- Single HTML file
- Vue.js 3 integration (CDN)
- Tailwind CSS integration (CDN)
- E-commerce webshop with professional design

**Features:**
1. **Home Page**
   - Display 5 sample products
   - Product cards with images (emojis), names, descriptions, prices
   - "Add to Cart" functionality

2. **Search Functionality**
   - Search bar in navigation (visible on all pages)
   - Real-time filtering of products
   - Search across product names and descriptions

3. **Shopping Cart**
   - View all cart items
   - Add products (single or multiple)
   - Remove products
   - Adjust quantities (increment/decrement)
   - Order summary with totals
   - "Proceed to Checkout" button

4. **Checkout Page**
   - Delivery method selection:
     - Home Delivery
     - Store Pickup
   - Customer information form
   - Order summary
   - Form validation

5. **Confirmation Page**
   - Success checkmark indicator
   - Order number generation
   - Order details summary
   - Cart automatically cleared
   - "Continue Shopping" button

## Implementation Result

**Pull Request:** [#1 - Initialize test automation demo repository with SUT webshop and Playwright project](https://github.com/manuelhintermayr/testautomation-copilot-codex-demo/pull/1)

### Files Created

#### Root Level
- `README.md` - Main repository documentation with MIT license reference
- `LICENSE` - MIT License file (already existed)

#### step_0/sut/ (System Under Test)
- `shop.html` - Complete e-commerce webshop application (423 lines)
- `README.md` - SUT feature documentation
- `RUNNING.md` - Instructions for running the application
- `VISUAL_GUIDE.md` - Detailed visual description of all pages

#### step_0/ (Playwright Project)
- `package.json` - Node.js project configuration
- `package-lock.json` - Dependency lock file
- `playwright.config.ts` - Playwright test configuration
- `tests/example.spec.ts` - Sample Playwright tests
- `.github/workflows/playwright.yml` - GitHub Actions CI/CD workflow
- `.gitignore` - Ignore rules for Playwright artifacts
- `README.md` - Step documentation

### Technical Implementation Details

**TechShop Application (sut/shop.html):**
```javascript
// Vue.js 3 reactive data structure
data() {
  return {
    currentPage: 'home',      // 'home' | 'cart' | 'checkout' | 'confirmation'
    searchQuery: '',
    deliveryMethod: 'delivery',
    cart: [],
    products: [
      { id: 1, name: 'Wireless Headphones Pro', price: 299.99, image: '🎧' },
      { id: 2, name: 'Smart Watch Ultra', price: 449.99, image: '⌚' },
      { id: 3, name: 'Laptop Pro 15"', price: 1299.99, image: '💻' },
      { id: 4, name: 'Smartphone X', price: 899.99, image: '📱' },
      { id: 5, name: 'Wireless Earbuds', price: 149.99, image: '🎵' }
    ]
  }
}
```

**Playwright Configuration (playwright.config.ts):**
```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
```

### Key Features Implemented

✅ **All Requirements Met:**
- 5 sample products with visual representation (emojis)
- Real-time search functionality across all pages
- Shopping cart with add/remove/quantity management
- Checkout with delivery method selection (pickup vs delivery)
- Order confirmation with success indicator and cart reset
- Responsive design using Tailwind CSS
- Single-page application using Vue.js 3
- Complete Playwright project initialization
- GitHub Actions CI/CD integration

### Design Highlights

**Color Scheme:**
- Primary: Blue (#2563EB)
- Secondary: Dark Blue (#1E40AF)
- Success: Green (#059669)
- Professional gradient navigation bar

**Responsive Layout:**
- Desktop (>1024px): 3-column product grid
- Tablet (768-1024px): 2-column product grid
- Mobile (<768px): 1-column layout

**User Experience:**
- Hover effects on product cards
- Real-time search filtering
- Form validation
- Cart badge showing item count
- Smooth page transitions

## Running the Implementation

### Start the SUT Application

```bash
# Option 1: Direct file open
open step_0/sut/shop.html

# Option 2: Local web server (recommended)
cd step_0/sut
python3 -m http.server 8000
# Navigate to http://localhost:8000/shop.html
```

### Run Playwright Tests

```bash
cd step_0

# Install dependencies
npm install

# Install browsers
npx playwright install

# Run tests
npx playwright test

# View test report
npx playwright show-report
```
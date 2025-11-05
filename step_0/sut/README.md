# System Under Test (SUT)

## Overview
This folder contains the web application being tested - a fully functional e-commerce webshop called **TechShop**.

## Application Details

### Technology Stack
- **Vue.js 3**: Modern JavaScript framework for reactive UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Single HTML File**: Self-contained application with no build step required

### Features

#### 1. Product Catalog (Home Page)
- Displays 5 sample tech products with:
  - Product images (emoji icons)
  - Product names and descriptions
  - Pricing information
  - "Add to Cart" functionality
- Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)

#### 2. Search Functionality
- Integrated into the navigation bar (available on all pages)
- Real-time search across product names and descriptions
- Shows filtered results with clear indication of search terms
- Easy "Clear search" option to reset results

#### 3. Shopping Cart
- Add products to cart from the home page
- View all cart items with:
  - Product details and pricing
  - Quantity adjustment (increment/decrement)
  - Remove item option
  - Line item totals
- Order summary sidebar showing:
  - Subtotal
  - Shipping cost
  - Grand total
- "Proceed to Checkout" button

#### 4. Checkout Process
- Delivery method selection:
  - **Home Delivery**: Free shipping, 3-5 business days
  - **Store Pickup**: Free, ready within 24 hours
- Customer information form:
  - Full name (required)
  - Email address (required)
  - Delivery address (required for home delivery only)
- Order summary review
- Form validation before order placement

#### 5. Order Confirmation
- Success confirmation with checkmark icon
- Unique order number generation
- Complete order summary
- Delivery/pickup information
- Email confirmation notice
- "Continue Shopping" button to return to home page
- **Cart is automatically cleared** after successful order

### Sample Products
1. **Wireless Headphones Pro** - $299.99
2. **Smart Watch Ultra** - $449.99
3. **Laptop Pro 15"** - $1,299.99
4. **Smartphone X** - $899.99
5. **Wireless Earbuds** - $149.99

## Running the Application

Simply open `shop.html` in a web browser:

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Using Node.js http-server
npx http-server

# Or just open the file directly
open shop.html  # macOS
xdg-open shop.html  # Linux
start shop.html  # Windows
```

Then navigate to `http://localhost:8000/sut/shop.html` (if using a server) or the file path directly.

## Testing Targets

This application is designed to demonstrate various test automation scenarios:
- Navigation testing
- Search functionality
- Shopping cart operations (add, remove, update quantities)
- Form validation
- Multi-step checkout process
- State management (cart persistence during navigation)
- Responsive design testing
- End-to-end user flows

## Notes
- All data is stored in memory (no backend)
- Cart is cleared after successful order placement
- No authentication or payment processing (demo only)
- Uses emoji icons instead of actual product images for simplicity

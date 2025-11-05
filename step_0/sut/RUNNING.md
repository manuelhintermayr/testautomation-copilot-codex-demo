# Running the TechShop Application

## Starting the Application

The webshop is a single HTML file that requires external CDN resources (Vue.js and Tailwind CSS). To run it:

### Option 1: Direct File Open
Simply open `shop.html` in your web browser:
```bash
open sut/shop.html  # macOS
xdg-open sut/shop.html  # Linux
start sut/shop.html  # Windows
```

### Option 2: Local Web Server (Recommended)
For better compatibility, serve it through a local web server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to: `http://localhost:8000/sut/shop.html`

## Features to Test

1. **Home Page**
   - View 5 featured products
   - Product cards with images, descriptions, and prices
   - "Add to Cart" buttons

2. **Search**
   - Type in the search bar in the navigation
   - Results update in real-time
   - Clear search to see all products again

3. **Shopping Cart**
   - Click "Cart" in navigation
   - Add/remove products
   - Adjust quantities using +/- buttons
   - View order summary
   - Proceed to checkout

4. **Checkout**
   - Choose delivery method (Delivery or Pickup)
   - Fill in customer information
   - Review order summary
   - Place order

5. **Confirmation**
   - View order confirmation with unique order number
   - See order details
   - Cart automatically clears
   - Continue shopping to return to home

## Browser Compatibility

The application works best in modern browsers with JavaScript enabled:
- Chrome/Chromium
- Firefox
- Safari
- Edge

It requires internet access to load:
- Tailwind CSS from CDN
- Vue.js 3 from CDN

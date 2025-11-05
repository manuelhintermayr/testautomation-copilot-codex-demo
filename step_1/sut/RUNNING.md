# Running the TechShop Enhanced Application

## Starting the Application

### Recommended: Vite Development Server
The enhanced TechShop application is best run through Vite for optimal development experience:

```bash
# From the step_1 directory
npm install  # if not already done
npm run dev
```

This will:
- Start Vite development server on `http://localhost:5173/`
- Automatically open `sut/index.html` in your browser
- Enable hot reload for development
- Provide better debugging capabilities

### Alternative: Direct File Access
You can also open the file directly, though this may limit some features:

```bash
# Direct file open
open sut/index.html     # macOS
xdg-open sut/index.html # Linux
start sut/index.html    # Windows
```

### Alternative: Local Web Server
For compatibility without Vite:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to: `http://localhost:8000/sut/index.html`

## New Features to Test in Step 1

### 🌓 Dark/Light Mode
- Click the sun/moon icon in the top navigation
- Theme persists across browser sessions
- Automatic system preference detection on first visit

### 🎨 Enhanced User Experience
- **Hero Section**: Animated landing page with call-to-action
- **Glass Effects**: Translucent cards and navigation
- **Smooth Animations**: Hover effects and transitions
- **Improved Search**: Enhanced styling and placeholder text

### 🛍️ Expanded Product Catalog
- **20 Products** across 10 diverse categories
- **Price Range**: $99 - $89,999 covering all market segments
- **Product Badges**: Featured ⭐ and New 🆕 indicators
- **Star Ratings**: 4-5 star ratings for social proof
- **Discount Pricing**: Original prices with current sale prices

### 🎯 Sales-Optimized Features
- **Category Filtering**: Search by product category
- **Professional Checkout**: Enhanced form design and validation
- **Tax Calculation**: Automatic 8% tax addition
- **Trust Elements**: Professional design builds buyer confidence
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

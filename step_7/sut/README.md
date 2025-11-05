# System Under Test (SUT) - TechShop Enhanced

## Overview
This folder contains the enhanced web application being tested - a professional, futuristic e-commerce platform called **TechShop Enhanced**.

## Application Details

### Technology Stack
- **Vue.js 3**: Modern JavaScript framework for reactive UI
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Vite**: Modern build tool for development and production
- **Single HTML File**: Self-contained application with advanced styling

### New Features in Step 1

#### 🎨 Modern Design System
- **Glass Morphism**: Translucent backgrounds with backdrop blur effects
- **Gradient Schemes**: Blue-purple gradients throughout the interface
- **Dark/Light Theme**: Complete theme system with persistence
- **Smooth Animations**: Float, glow, and transition effects
- **Cyber Effects**: Border animations and light sweep interactions

#### 🌓 Theme System
- **System Detection**: Automatically detects user's preferred color scheme
- **Manual Toggle**: Sun/moon icon for manual theme switching
- **Persistent Storage**: Remembers user's theme choice across sessions
- **Complete Coverage**: All components optimized for both light and dark modes

#### 🛍️ Enhanced Product Catalog
- **20 Premium Products**: Diverse tech products across 10 categories
- **Price Range**: From $99 (HomePod mini) to $89,999 (Tesla Model S Plaid)
- **Product Features**:
  - ⭐ Featured badges for highlighted products
  - 🆕 New badges for latest releases
  - Star ratings (4-5 stars)
  - Original prices with discount indicators
  - Category classification
  - Professional product descriptions

### Product Categories
1. **Audio** - Premium headphones and speakers (3 products)
2. **Wearables** - Smart watches and health trackers (2 products)
3. **Computers** - Laptops and professional workstations (1 product)
4. **Smartphones & Tablets** - Latest mobile devices (2 products)
5. **Gaming** - Consoles and VR equipment (3 products)
6. **Smart Home** - Connected home devices (3 products)
7. **Photography** - Professional cameras and drones (2 products)
8. **Fitness & Health** - Exercise equipment and health monitors (2 products)
9. **Electric Vehicles** - Tesla and future transportation (1 product)
10. **Connectivity** - Satellite internet and communication (1 product)

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

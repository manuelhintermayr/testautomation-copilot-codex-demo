import { test, expect } from '@playwright/test';

test.describe('TechShop - Home Page', () => {
  test('should load the home page with correct title', async ({ page }) => {
    await page.goto('/sut/index.html');
    await expect(page).toHaveTitle('TechShop - Future of Technology');
  });

  test('should display hero section with call to action', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    // Check for hero text
    await expect(page.getByText('The Future is')).toBeVisible();
    await expect(page.getByText('Now')).toBeVisible();
    
    // Check for CTA button
    await expect(page.getByRole('button', { name: 'Explore Collection' })).toBeVisible();
  });

  test('should display 20 products on home page', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    // Wait for products to load
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Count product cards
    const productCards = page.locator('.product-card');
    await expect(productCards).toHaveCount(20);
  });

  test('should show product details correctly', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    // Wait for first product
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    const firstProduct = page.locator('.product-card').first();
    
    // Check product has name, description, price, and add to cart button
    await expect(firstProduct.locator('h3')).toBeVisible();
    await expect(firstProduct.locator('p')).toBeVisible();
    await expect(firstProduct.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
  });

  test('should display featured and new badges', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Check for featured badge
    const featuredBadge = page.getByText('⭐ Featured').first();
    await expect(featuredBadge).toBeVisible();
    
    // Check for new badge
    const newBadge = page.getByText('🆕 New').first();
    await expect(newBadge).toBeVisible();
  });
});

test.describe('TechShop - Search Functionality', () => {
  test('should filter products based on search query', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Type in search box
    const searchInput = page.getByPlaceholder('Discover the future of technology...');
    await searchInput.fill('iPhone');
    
    // Wait for filtering
    await page.waitForTimeout(500);
    
    // Check search results message
    await expect(page.getByText('products found for')).toBeVisible();
    await expect(page.getByText('"iPhone"')).toBeVisible();
    
    // Verify filtered results contain iPhone
    const productCards = page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(20);
  });

  test('should show "no results" message for non-existent product', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Search for non-existent product
    const searchInput = page.getByPlaceholder('Discover the future of technology...');
    await searchInput.fill('NonExistentProduct12345');
    
    // Wait for filtering
    await page.waitForTimeout(500);
    
    // Check no results message
    await expect(page.getByText('No products found matching your search')).toBeVisible();
  });

  test('should clear search and show all products', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Search first
    const searchInput = page.getByPlaceholder('Discover the future of technology...');
    await searchInput.fill('iPhone');
    await page.waitForTimeout(500);
    
    // Click clear search
    await page.getByRole('button', { name: 'Clear search' }).click();
    
    // Verify all products are shown again
    const productCards = page.locator('.product-card');
    await expect(productCards).toHaveCount(20);
  });
});

test.describe('TechShop - Shopping Cart', () => {
  test('should add product to cart and update cart count', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Click "Add to Cart" on first product
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    
    // Check cart badge shows 1
    const cartBadge = page.locator('button:has-text("Cart") span');
    await expect(cartBadge).toHaveText('1');
  });

  test('should navigate to cart page and display added items', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Add product to cart
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    
    // Navigate to cart
    await page.getByRole('button', { name: /Cart/ }).click();
    
    // Verify we're on cart page
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    
    // Verify cart has items
    await expect(page.getByText('Order Summary')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Proceed to Checkout' })).toBeVisible();
  });

  test('should increment and decrement product quantity', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Add product to cart
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    
    // Go to cart
    await page.getByRole('button', { name: /Cart/ }).click();
    
    // Find quantity controls
    const incrementButton = page.getByRole('button', { name: '+' }).first();
    const quantityDisplay = page.locator('.bg-gray-100 span').first();
    
    // Initial quantity should be 1
    await expect(quantityDisplay).toHaveText('1');
    
    // Increment
    await incrementButton.click();
    await expect(quantityDisplay).toHaveText('2');
    
    // Decrement
    const decrementButton = page.getByRole('button', { name: '-' }).first();
    await decrementButton.click();
    await expect(quantityDisplay).toHaveText('1');
  });

  test('should remove product from cart', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Add product to cart
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    
    // Go to cart
    await page.getByRole('button', { name: /Cart/ }).click();
    
    // Remove item
    await page.locator('button').filter({ has: page.locator('svg path[d*="M19 7l"]') }).first().click();
    
    // Verify empty cart message
    await expect(page.getByText('Your cart is empty')).toBeVisible();
  });

  test('should calculate cart total correctly', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Add first product to cart
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    
    // Go to cart
    await page.getByRole('button', { name: /Cart/ }).click();
    
    // Verify order summary shows total
    await expect(page.getByText('Order Summary')).toBeVisible();
    await expect(page.getByText(/Subtotal/).locator('xpath=following-sibling::span')).toBeVisible();
    await expect(page.getByText(/Total/).locator('xpath=following-sibling::span')).toBeVisible();
  });
});

test.describe('TechShop - Checkout Process', () => {
  test('should navigate to checkout page from cart', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Add product and go to cart
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: /Cart/ }).click();
    
    // Proceed to checkout
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    
    // Verify checkout page
    await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
  });

  test('should select delivery method', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Add product, go to cart, then checkout
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: /Cart/ }).click();
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    
    // Select pickup option
    await page.getByText('Store Pickup').click();
    
    // Verify pickup is selected (check for blue border)
    const pickupLabel = page.locator('label:has-text("Store Pickup")');
    await expect(pickupLabel).toHaveClass(/border-blue-600/);
  });

  test('should validate required fields before placing order', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Add product, go to cart, then checkout
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: /Cart/ }).click();
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    
    // Try to place order without filling fields
    page.once('dialog', dialog => {
      expect(dialog.message()).toContain('Please fill in your contact information');
      dialog.accept();
    });
    
    await page.getByRole('button', { name: 'Place Order' }).click();
  });

  test('should complete checkout and show confirmation', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Add product, go to cart, then checkout
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: /Cart/ }).click();
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    
    // Fill in customer information
    await page.getByLabel('Full Name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    
    // Select pickup (no address needed)
    await page.getByText('Store Pickup').click();
    
    // Place order
    await page.getByRole('button', { name: 'Place Order' }).click();
    
    // Verify confirmation page
    await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible();
    await expect(page.getByText(/Thank you for your order, John Doe/)).toBeVisible();
    await expect(page.getByText(/Your order number is:/)).toBeVisible();
  });

  test('should clear cart after successful order', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Complete full checkout flow
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: /Cart/ }).click();
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByLabel('Full Name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByText('Store Pickup').click();
    await page.getByRole('button', { name: 'Place Order' }).click();
    
    // Continue shopping
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    
    // Verify cart is empty (no badge)
    const cartButton = page.getByRole('button', { name: 'Cart' }).first();
    await expect(cartButton.locator('span')).not.toBeVisible();
  });
});

test.describe('TechShop - Theme Toggle', () => {
  test('should toggle between light and dark mode', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Get the theme toggle button (sun/moon icon)
    const themeToggle = page.locator('button:has(svg)').filter({ has: page.locator('path[d*="M10 2a1 1 0 011 1v1"]') });
    
    // Click to toggle theme
    await themeToggle.first().click();
    
    // Wait for theme to apply
    await page.waitForTimeout(300);
    
    // Check if dark class is added to html element
    const htmlElement = page.locator('html');
    const hasDearkClass = await htmlElement.evaluate((el) => el.classList.contains('dark'));
    
    // Toggle back
    await themeToggle.first().click();
    await page.waitForTimeout(300);
  });
});

test.describe('TechShop - Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Add item to cart
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    
    // Go to cart
    await page.getByRole('button', { name: /Cart/ }).click();
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    
    // Go back to home using logo/Home button
    await page.getByRole('button', { name: 'Home' }).click();
    await expect(page.getByText('The Future is')).toBeVisible();
  });

  test('should scroll to products when clicking Explore Collection', async ({ page }) => {
    await page.goto('/sut/index.html');
    
    await page.waitForSelector('.product-card', { timeout: 10000 });
    
    // Click Explore Collection button
    await page.getByRole('button', { name: 'Explore Collection' }).click();
    
    // Wait for scroll
    await page.waitForTimeout(1000);
    
    // Verify products section is in view
    const productsSection = page.locator('#products');
    await expect(productsSection).toBeInViewport();
  });
});

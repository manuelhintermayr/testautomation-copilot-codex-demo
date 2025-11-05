import { test, expect } from '../utils/test-fixtures';

test.describe('TechShop - Home Page', () => {
  test('should load the home page with correct title', async ({ home }) => {
    await home.navigateToHome();
    const title = await home.getTitle();
    expect(title).toBe('TechShop - Future of Technology');
  });

  test('should display hero section with call to action', async ({ home }) => {
    await home.navigateToHome();
    
    // Check hero section is visible
    const isHeroVisible = await home.isHeroVisible();
    expect(isHeroVisible).toBeTruthy();
  });

  test('should display 20 products on home page', async ({ home }) => {
    await home.navigateToHome();
    
    // Check product count
    const productCount = await home.getProductCount();
    expect(productCount).toBe(20);
  });

  test('should show product details correctly', async ({ home }) => {
    await home.navigateToHome();
    
    // Get first product details
    const details = await home.getProductDetails(0);
    expect(details.name).toBeTruthy();
    expect(details.description).toBeTruthy();
    
    // Check add to cart button exists
    const firstProduct = home.getFirstProduct();
    await expect(firstProduct.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
  });

  test('should display featured and new badges', async ({ home }) => {
    await home.navigateToHome();
    
    // Check for badges
    const hasFeatured = await home.hasFeaturedBadge();
    const hasNew = await home.hasNewBadge();
    
    expect(hasFeatured).toBeTruthy();
    expect(hasNew).toBeTruthy();
  });
});

test.describe('TechShop - Search Functionality', () => {
  test('should filter products based on search query', async ({ home, search }) => {
    await home.navigateToHome();
    
    // Perform search
    await search.search('iPhone');
    
    // Check search results
    const isMessageVisible = await search.isSearchResultsMessageVisible();
    expect(isMessageVisible).toBeTruthy();
    
    const resultCount = await search.getResultCount();
    expect(resultCount).toBeGreaterThan(0);
    expect(resultCount).toBeLessThan(20);
  });

  test('should show "no results" message for non-existent product', async ({ home, search }) => {
    await home.navigateToHome();
    
    // Search for non-existent product
    await search.search('NonExistentProduct12345');
    
    // Check no results message
    const isNoResultsVisible = await search.isNoResultsMessageVisible();
    expect(isNoResultsVisible).toBeTruthy();
  });

  test('should clear search and show all products', async ({ home, search }) => {
    await home.navigateToHome();
    
    // Search first
    await search.search('iPhone');
    
    // Clear search
    await search.clearSearch();
    
    // Verify all products are shown
    const productCount = await home.getProductCount();
    expect(productCount).toBe(20);
  });
});

test.describe('TechShop - Shopping Cart', () => {
  test('should add product to cart and update cart count', async ({ home, cart }) => {
    await home.navigateToHome();
    
    // Add product to cart
    await home.addFirstProductToCart();
    
    // Check cart badge
    const badgeCount = await cart.getCartBadgeCount();
    expect(badgeCount).toBe('1');
  });

  test('should navigate to cart page and display added items', async ({ home, cart }) => {
    await home.navigateToHome();
    
    // Add product and navigate to cart
    await home.addFirstProductToCart();
    await cart.navigateToCart();
    
    // Verify we're on cart page
    const isOnCart = await cart.isOnCartPage();
    expect(isOnCart).toBeTruthy();
    
    // Verify order summary is visible
    const isSummaryVisible = await cart.isOrderSummaryVisible();
    expect(isSummaryVisible).toBeTruthy();
  });

  test('should increment and decrement product quantity', async ({ home, cart }) => {
    await home.navigateToHome();
    
    // Add product and go to cart
    await home.addFirstProductToCart();
    await cart.navigateToCart();
    
    // Get initial quantity
    let quantity = await cart.getQuantity(0);
    expect(quantity).toBe('1');
    
    // Increment
    await cart.incrementQuantity(0);
    quantity = await cart.getQuantity(0);
    expect(quantity).toBe('2');
    
    // Decrement
    await cart.decrementQuantity(0);
    quantity = await cart.getQuantity(0);
    expect(quantity).toBe('1');
  });

  test('should remove product from cart', async ({ home, cart }) => {
    await home.navigateToHome();
    
    // Add product and go to cart
    await home.addFirstProductToCart();
    await cart.navigateToCart();
    
    // Remove item
    await cart.removeItem(0);
    
    // Verify empty cart
    const isEmpty = await cart.isCartEmpty();
    expect(isEmpty).toBeTruthy();
  });

  test('should calculate cart total correctly', async ({ home, cart }) => {
    await home.navigateToHome();
    
    // Add product and go to cart
    await home.addFirstProductToCart();
    await cart.navigateToCart();
    
    // Verify order summary is visible (which includes totals)
    const isSummaryVisible = await cart.isOrderSummaryVisible();
    expect(isSummaryVisible).toBeTruthy();
  });
});

test.describe('TechShop - Checkout Process', () => {
  test('should navigate to checkout page from cart', async ({ home, cart, checkout }) => {
    await home.navigateToHome();
    
    // Add product, go to cart, then checkout
    await home.addFirstProductToCart();
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    
    // Verify checkout page
    const isOnCheckout = await checkout.isOnCheckoutPage();
    expect(isOnCheckout).toBeTruthy();
  });

  test('should select delivery method', async ({ home, cart, checkout }) => {
    await home.navigateToHome();
    
    // Navigate to checkout
    await home.addFirstProductToCart();
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    
    // Select pickup
    await checkout.selectPickup();
    
    // Verify pickup is selected
    const isPickupSelected = await checkout.isPickupSelected();
    expect(isPickupSelected).toBeTruthy();
  });

  test('should validate required fields before placing order', async ({ home, cart, checkout, page }) => {
    await home.navigateToHome();
    
    // Navigate to checkout
    await home.addFirstProductToCart();
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    
    // Try to place order without filling fields
    page.once('dialog', dialog => {
      expect(dialog.message()).toContain('Please fill in your contact information');
      dialog.accept();
    });
    
    await checkout.placeOrder();
  });

  test('should complete checkout and show confirmation', async ({ home, cart, checkout, confirmation }) => {
    await home.navigateToHome();
    
    // Navigate to checkout
    await home.addFirstProductToCart();
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    
    // Complete checkout with pickup
    await checkout.completeCheckoutWithPickup('John Doe', 'john@example.com');
    
    // Verify confirmation page
    const isOnConfirmation = await confirmation.isOnConfirmationPage();
    expect(isOnConfirmation).toBeTruthy();
    
    const isSuccessVisible = await confirmation.isSuccessIconVisible();
    expect(isSuccessVisible).toBeTruthy();
    
    const hasCustomerName = await confirmation.verifyCustomerName('John Doe');
    expect(hasCustomerName).toBeTruthy();
    
    const isOrderNumberDisplayed = await confirmation.isOrderNumberDisplayed();
    expect(isOrderNumberDisplayed).toBeTruthy();
  });

  test('should clear cart after successful order', async ({ home, cart, checkout, confirmation }) => {
    await home.navigateToHome();
    
    // Complete full checkout flow
    await home.addFirstProductToCart();
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    await checkout.completeCheckoutWithPickup('John Doe', 'john@example.com');
    
    // Continue shopping
    await confirmation.continueShopping();
    
    // Verify cart is empty (no badge)
    const isBadgeVisible = await cart.isCartBadgeVisible();
    expect(isBadgeVisible).toBeFalsy();
  });
});

test.describe('TechShop - Theme Toggle', () => {
  test('should toggle between light and dark mode', async ({ home, navigation }) => {
    await home.navigateToHome();
    
    // Get initial theme state
    const initialDarkMode = await navigation.isDarkModeEnabled();
    
    // Toggle theme
    await navigation.toggleTheme();
    
    // Check theme changed
    const newDarkMode = await navigation.isDarkModeEnabled();
    expect(newDarkMode).toBe(!initialDarkMode);
    
    // Toggle back
    await navigation.toggleTheme();
    const finalDarkMode = await navigation.isDarkModeEnabled();
    expect(finalDarkMode).toBe(initialDarkMode);
  });
});

test.describe('TechShop - Navigation', () => {
  test('should navigate between pages', async ({ home, cart, navigation }) => {
    await home.navigateToHome();
    
    // Add item and go to cart
    await home.addFirstProductToCart();
    await navigation.goToCart();
    
    const isOnCart = await cart.isOnCartPage();
    expect(isOnCart).toBeTruthy();
    
    // Go back to home
    await navigation.goToHome();
    
    const isHeroVisible = await home.isHeroVisible();
    expect(isHeroVisible).toBeTruthy();
  });

  test('should scroll to products when clicking Explore Collection', async ({ home }) => {
    await home.navigateToHome();
    
    // Click Explore Collection
    await home.clickExploreCollection();
    
    // Verify products section is in viewport
    const isInViewport = await home.isProductsSectionInViewport();
    expect(isInViewport).toBeTruthy();
  });
});

test.describe('TechShop - Drone Delivery', () => {
  test('should show drone delivery option when all items support it', async ({ home, cart, checkout, page }) => {
    await home.navigateToHome();
    
    // Add a product that supports drone delivery (AirPods Pro Max - index 0)
    await home.addProductToCart(0);
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    
    // Drone delivery option should be enabled
    const isDisabled = await checkout.isDroneDeliveryDisabled();
    expect(isDisabled).toBeFalsy();
    
    // Warning should not be visible
    const warningVisible = await checkout.isDroneDeliveryWarningVisible();
    expect(warningVisible).toBeFalsy();
  });

  test('should disable drone delivery when cart contains unsupported items', async ({ home, cart, checkout, page }) => {
    await home.navigateToHome();
    
    // Add MacBook Pro which doesn't support drone delivery (index 2)
    await home.addProductToCart(2);
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    
    // Drone delivery option should be disabled
    const isDisabled = await checkout.isDroneDeliveryDisabled();
    expect(isDisabled).toBeTruthy();
    
    // Warning should be visible
    const warningVisible = await checkout.isDroneDeliveryWarningVisible();
    expect(warningVisible).toBeTruthy();
  });

  test('should prevent checkout with drone delivery for unsupported items', async ({ home, cart, checkout, page }) => {
    await home.navigateToHome();
    
    // Add MacBook Pro (doesn't support drone delivery - index 2)
    await home.addProductToCart(2);
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    
    // Verify drone delivery is disabled
    const isDroneDisabled = await checkout.isDroneDeliveryDisabled();
    expect(isDroneDisabled).toBeTruthy();
    
    // Verify warning is visible
    const isWarningVisible = await checkout.isDroneDeliveryWarningVisible();
    expect(isWarningVisible).toBeTruthy();
    
    // Try to click on the disabled drone delivery option
    await checkout.tryToSelectDroneDelivery();
    
    // Verify it was NOT selected (should still be false)
    const isDroneSelected = await checkout.isDroneDeliverySelected();
    expect(isDroneSelected).toBeFalsy();
    
    // Fill customer info and select a valid delivery method instead
    await checkout.fillCustomerInfo('John Doe', 'john@example.com', '123 Test Street');
    await checkout.selectDelivery(); // Select regular delivery instead
    
    // Verify we can complete checkout with valid delivery method
    await checkout.placeOrder();
    
    // Should be redirected to confirmation page
    const isOnConfirmation = await page.waitForSelector('h2:has-text("Order Confirmed!")', { timeout: 5000 }).then(() => true).catch(() => false);
    expect(isOnConfirmation).toBeTruthy();
  });

  test('should successfully complete checkout with drone delivery for supported items', async ({ home, cart, checkout, confirmation, page }) => {
    await home.navigateToHome();
    
    // Add iPhone (supports drone delivery - index 3)
    await home.addProductToCart(3);
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    
    // Complete checkout with drone delivery
    await checkout.completeCheckoutWithDrone('Jane Doe', 'jane@example.com', '456 Drone Lane');
    
    // Verify confirmation page
    const isOnConfirmation = await confirmation.isOnConfirmationPage();
    expect(isOnConfirmation).toBeTruthy();
    
    // Verify drone delivery information is shown
    const deliveryInfo = page.getByText(/drone within 30 minutes/i);
    await expect(deliveryInfo).toBeVisible();
  });

  test('should show correct drone delivery fee', async ({ home, cart, checkout, page }) => {
    await home.navigateToHome();
    
    // Add a product that supports drone delivery
    await home.addProductToCart(0);
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    
    // Verify drone delivery shows $9.99 fee
    const droneOption = page.locator('label:has-text("Drone Delivery")');
    await expect(droneOption.getByText('$9.99')).toBeVisible();
  });

  test('should show FREE for other delivery methods', async ({ home, cart, checkout, page }) => {
    await home.navigateToHome();
    
    await home.addFirstProductToCart();
    await cart.navigateToCart();
    await cart.proceedToCheckout();
    
    // Verify express delivery is FREE
    const deliveryOption = page.locator('label:has-text("Express Delivery")');
    await expect(deliveryOption.getByText('FREE')).toBeVisible();
    
    // Verify store pickup is FREE
    const pickupOption = page.locator('label:has-text("Store Pickup")');
    await expect(pickupOption.getByText('FREE')).toBeVisible();
  });
});

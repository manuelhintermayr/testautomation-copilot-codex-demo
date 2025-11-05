# 🧪 TechShop Test Report - Step 4

**Generated on:** 5.11.2025, 16:03:57  
**Report Type:** JUnit XML Custom Analysis

---

## 📊 Executive Summary

### Test Execution Overview

> **Key Metrics**
> - **Total Tests:** 21
> - **Passed:** 10 ✅
> - **Failed:** 11 ❌  
> - **Skipped:** 0 ⚠️
> - **Pass Rate:** 48%
> - **Total Duration:** 65.6 seconds

---

## 🎯 Test Status Overview

**Overall Status:** 🔴 **TESTS FAILED**

- **✅ Passed Tests:** 10/21
- **❌ Failed Tests:** 11/21
- **⚠️ Skipped Tests:** 0/21

---

## 📋 Detailed Test Results

| Test Name | Test Suite | Status | Duration | Result |
|-----------|------------|--------|----------|--------|
| TechShop - Home Page › should load the home page with correct title | techshop.spec.ts | ✅ PASSED | 1.52s | ✅ OK |
| TechShop - Home Page › should display hero section with call to action | techshop.spec.ts | ✅ PASSED | 1.47s | ✅ OK |
| TechShop - Home Page › should display 20 products on home page | techshop.spec.ts | ✅ PASSED | 1.48s | ✅ OK |
| TechShop - Home Page › should show product details correctly | techshop.spec.ts | ✅ PASSED | 1.25s | ✅ OK |
| TechShop - Home Page › should display featured and new badges | techshop.spec.ts | ✅ PASSED | 1.04s | ✅ OK |
| TechShop - Search Functionality › should filter products based on search query | techshop.spec.ts | ✅ PASSED | 1.92s | ✅ OK |
| TechShop - Search Functionality › should show "no results" message for non-existent product | techshop.spec.ts | ✅ PASSED | 1.63s | ✅ OK |
| TechShop - Search Functionality › should clear search and show all products | techshop.spec.ts | ✅ PASSED | 2.00s | ✅ OK |
| TechShop - Shopping Cart › should add product to cart and update cart count | techshop.spec.ts | ✅ PASSED | 1.25s | ✅ OK |
| TechShop - Shopping Cart › should navigate to cart page and display added items | techshop.spec.ts | ❌ FAILED | 1.75s | **Error:** techshop.spec.ts:133:7 should navigate to cart page and disp...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Shopping Cart › should increment and decrement product quantity | techshop.spec.ts | ❌ FAILED | 2.09s | **Error:** techshop.spec.ts:152:7 should increment and decrement produc...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Shopping Cart › should remove product from cart | techshop.spec.ts | ❌ FAILED | 1.84s | **Error:** techshop.spec.ts:180:7 should remove product from cart...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Shopping Cart › should calculate cart total correctly | techshop.spec.ts | ❌ FAILED | 1.85s | **Error:** techshop.spec.ts:198:7 should calculate cart total correctly...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Checkout Process › should navigate to checkout page from cart | techshop.spec.ts | ❌ FAILED | 1.99s | **Error:** techshop.spec.ts:217:7 should navigate to checkout page from...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Checkout Process › should select delivery method | techshop.spec.ts | ❌ FAILED | 2.05s | **Error:** techshop.spec.ts:233:7 should select delivery method...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Checkout Process › should validate required fields before placing order | techshop.spec.ts | ❌ FAILED | 1.91s | **Error:** techshop.spec.ts:251:7 should validate required fields befor...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Checkout Process › should complete checkout and show confirmation | techshop.spec.ts | ❌ FAILED | 1.93s | **Error:** techshop.spec.ts:270:7 should complete checkout and show con...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Checkout Process › should clear cart after successful order | techshop.spec.ts | ❌ FAILED | 1.99s | **Error:** techshop.spec.ts:296:7 should clear cart after successful or...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Theme Toggle › should toggle between light and dark mode | techshop.spec.ts | ❌ FAILED | 30.12s | **Error:** techshop.spec.ts:320:7 should toggle between light and dark ...<br/>**Details:** locator.click: Test timeout of 30000ms exceeded.... |
| TechShop - Navigation › should navigate between pages | techshop.spec.ts | ❌ FAILED | 1.66s | **Error:** techshop.spec.ts:345:7 should navigate between pages...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Navigation › should scroll to products when clicking Explore Collection | techshop.spec.ts | ✅ PASSED | 2.85s | ✅ OK |


---

## 📈 Quality Metrics

### Performance & Quality Indicators

#### Pass Rate Analysis
- **Current Pass Rate:** 48%
- **Target Pass Rate:** 100%
- **Status:** 🔴 **NEEDS IMPROVEMENT**

#### Execution Time
- **Total Execution Time:** 65.6 seconds
- **Average Test Time:** 3.12 seconds per test

---

## 🔧 Recommendations


> **⚠️ Action Required**
> 
> **11 test(s) are currently failing.** Please review the failed tests and address the underlying issues:
> 
> - Check test environment setup
> - Verify application functionality  
> - Review test data and dependencies
> - Update test assertions if application behavior changed


---

## 📊 Test Environment

- **Platform:** Playwright with Chromium Browser
- **Framework:** Node.js + Vite Development Server  
- **Reporting:** JUnit XML → Custom HTML + Confluence
- **Test Scope:** E2E Testing for TechShop Application

---

*Report generated by TechShop Step 4 Custom Report Generator*  
*Last Updated: 5.11.2025, 16:03:57*
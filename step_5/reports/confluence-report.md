# 🧪 TechShop Test Report - Step 4

**Generated on:** 5.11.2025, 16:27:39  
**Report Type:** JUnit XML Custom Analysis

---

## 📊 Executive Summary

### Test Execution Overview

> **Key Metrics**
> - **Total Tests:** 21
> - **Passed:** 9 ✅
> - **Failed:** 12 ❌  
> - **Skipped:** 0 ⚠️
> - **Pass Rate:** 43%
> - **Total Duration:** 57.83 seconds

---

## 🎯 Test Status Overview

**Overall Status:** 🔴 **TESTS FAILED**

- **✅ Passed Tests:** 9/21
- **❌ Failed Tests:** 12/21
- **⚠️ Skipped Tests:** 0/21

---

## 📋 Detailed Test Results

| Test Name | Test Suite | Status | Duration | Result |
|-----------|------------|--------|----------|--------|
| TechShop - Home Page › should load the home page with correct title | techshop.spec.ts | ✅ PASSED | 1.32s | ✅ OK |
| TechShop - Home Page › should display hero section with call to action | techshop.spec.ts | ✅ PASSED | 1.09s | ✅ OK |
| TechShop - Home Page › should display 20 products on home page | techshop.spec.ts | ✅ PASSED | 0.97s | ✅ OK |
| TechShop - Home Page › should show product details correctly | techshop.spec.ts | ✅ PASSED | 0.96s | ✅ OK |
| TechShop - Home Page › should display featured and new badges | techshop.spec.ts | ✅ PASSED | 1.01s | ✅ OK |
| TechShop - Search Functionality › should filter products based on search query | techshop.spec.ts | ✅ PASSED | 1.54s | ✅ OK |
| TechShop - Search Functionality › should show "no results" message for non-existent product | techshop.spec.ts | ✅ PASSED | 1.54s | ✅ OK |
| TechShop - Search Functionality › should clear search and show all products | techshop.spec.ts | ✅ PASSED | 1.64s | ✅ OK |
| TechShop - Shopping Cart › should add product to cart and update cart count | techshop.spec.ts | ✅ PASSED | 1.02s | ✅ OK |
| TechShop - Shopping Cart › should navigate to cart page and display added items | techshop.spec.ts | ❌ FAILED | 1.23s | **Error:** techshop.spec.ts:105:7 should navigate to cart page and disp...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Shopping Cart › should increment and decrement product quantity | techshop.spec.ts | ❌ FAILED | 1.51s | **Error:** techshop.spec.ts:121:7 should increment and decrement produc...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Shopping Cart › should remove product from cart | techshop.spec.ts | ❌ FAILED | 1.46s | **Error:** techshop.spec.ts:143:7 should remove product from cart...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Shopping Cart › should calculate cart total correctly | techshop.spec.ts | ❌ FAILED | 1.43s | **Error:** techshop.spec.ts:158:7 should calculate cart total correctly...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Checkout Process › should navigate to checkout page from cart | techshop.spec.ts | ❌ FAILED | 1.48s | **Error:** techshop.spec.ts:172:7 should navigate to checkout page from...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Checkout Process › should select delivery method | techshop.spec.ts | ❌ FAILED | 1.42s | **Error:** techshop.spec.ts:185:7 should select delivery method...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Checkout Process › should validate required fields before placing order | techshop.spec.ts | ❌ FAILED | 1.39s | **Error:** techshop.spec.ts:201:7 should validate required fields befor...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Checkout Process › should complete checkout and show confirmation | techshop.spec.ts | ❌ FAILED | 1.50s | **Error:** techshop.spec.ts:218:7 should complete checkout and show con...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Checkout Process › should clear cart after successful order | techshop.spec.ts | ❌ FAILED | 1.46s | **Error:** techshop.spec.ts:243:7 should clear cart after successful or...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Theme Toggle › should toggle between light and dark mode | techshop.spec.ts | ❌ FAILED | 30.17s | **Error:** techshop.spec.ts:262:7 should toggle between light and dark ...<br/>**Details:** locator.click: Test timeout of 30000ms exceeded.... |
| TechShop - Navigation › should navigate between pages | techshop.spec.ts | ❌ FAILED | 1.17s | **Error:** techshop.spec.ts:283:7 should navigate between pages...<br/>**Details:** locator.click: Error: strict mode violation: getByRole('button', { name: /Cart/ }) resolved to 21 el... |
| TechShop - Navigation › should scroll to products when clicking Explore Collection | techshop.spec.ts | ❌ FAILED | 2.52s | **Error:** techshop.spec.ts:300:7 should scroll to products when clicki... |


---

## 📈 Quality Metrics

### Performance & Quality Indicators

#### Pass Rate Analysis
- **Current Pass Rate:** 43%
- **Target Pass Rate:** 100%
- **Status:** 🔴 **NEEDS IMPROVEMENT**

#### Execution Time
- **Total Execution Time:** 57.83 seconds
- **Average Test Time:** 2.75 seconds per test

---

## 🔧 Recommendations


> **⚠️ Action Required**
> 
> **12 test(s) are currently failing.** Please review the failed tests and address the underlying issues:
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
*Last Updated: 5.11.2025, 16:27:39*
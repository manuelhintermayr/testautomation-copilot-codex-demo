import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * SearchPage - Page object for search functionality
 */
export class SearchPage extends BasePage {
  // Locators
  private readonly searchInput: Locator;
  private readonly searchResultsMessage: Locator;
  private readonly clearSearchButton: Locator;
  private readonly noResultsMessage: Locator;
  private readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder('Discover the future of technology...');
    this.searchResultsMessage = page.getByText('products found for');
    this.clearSearchButton = page.getByRole('button', { name: 'Clear search' });
    this.noResultsMessage = page.getByText('No products found matching your search');
    this.productCards = page.locator('.product-card');
  }

  /**
   * Perform a search
   */
  async search(query: string) {
    await this.searchInput.fill(query);
    await this.wait(500); // Wait for filtering
  }

  /**
   * Clear the search
   */
  async clearSearch() {
    await this.clearSearchButton.click();
  }

  /**
   * Get the number of search results
   */
  async getResultCount(): Promise<number> {
    return await this.productCards.count();
  }

  /**
   * Check if search results message is visible
   */
  async isSearchResultsMessageVisible(): Promise<boolean> {
    return await this.searchResultsMessage.isVisible();
  }

  /**
   * Check if no results message is visible
   */
  async isNoResultsMessageVisible(): Promise<boolean> {
    return await this.noResultsMessage.isVisible();
  }

  /**
   * Get the search query from results message
   */
  async getSearchQuery(): Promise<string | null> {
    const searchQueryLocator = this.page.locator('text=/\\".*\\"/');
    return await searchQueryLocator.textContent();
  }

  /**
   * Check if search input is visible
   */
  async isSearchInputVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }
}

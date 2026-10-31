import React from 'react';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';

/**
 * SearchFilter Component
 * Provides product name search, category filter, and stock level filter controls.
 */
function SearchFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  stockStatusFilter,
  onStockStatusChange,
  onResetFilters,
  totalCount,
  filteredCount
}) {
  const isFiltered = searchTerm !== '' || selectedCategory !== 'all' || stockStatusFilter !== 'all';

  return (
    <div className="filter-card">
      <div className="filter-controls-grid">
        {/* Search by Product Name */}
        <div className="filter-group filter-search">
          <label htmlFor="search-input" className="filter-label">
            Search Product
          </label>
          <div className="input-with-icon">
            <span className="search-icon">🔍</span>
            <input
              id="search-input"
              type="text"
              className="form-input search-input"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Filter by Category */}
        <div className="filter-group">
          <label htmlFor="category-select" className="filter-label">
            Category
          </label>
          <select
            id="category-select"
            className="form-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Stock Status */}
        <div className="filter-group">
          <label htmlFor="status-select" className="filter-label">
            Stock Status
          </label>
          <select
            id="status-select"
            className="form-select"
            value={stockStatusFilter}
            onChange={(e) => onStockStatusChange(e.target.value)}
          >
            <option value="all">All Stock Levels</option>
            <option value="in-stock">In Stock (Above Min)</option>
            <option value="low-stock">Low Stock (≤ Min Level)</option>
            <option value="out-of-stock">Out of Stock (0 units)</option>
          </select>
        </div>

        {/* Reset Action & Counter */}
        <div className="filter-actions">
          {isFiltered && (
            <button
              type="button"
              className="btn btn-secondary btn-reset"
              onClick={onResetFilters}
              title="Clear all filters"
            >
              Reset Filters
            </button>
          )}
          <span className="filter-count-badge">
            Showing {filteredCount} of {totalCount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;

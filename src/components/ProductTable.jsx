import React from 'react';

/**
 * ProductTable Component
 * Displays inventory items in a clean, readable table.
 * Highlights low-stock and out-of-stock items with visual badges and warnings.
 */
function ProductTable({ products, onEdit, onDeleteRequest, onResetFilters, isFiltered }) {
  if (products.length === 0) {
    return (
      <div className="table-card empty-state-card">
        <div className="empty-state-content">
          <span className="empty-icon">📦</span>
          <h3>No Products Found</h3>
          <p>
            {isFiltered
              ? 'No products match your current search and filter settings.'
              : 'Your inventory is currently empty. Click the button above to add a product.'}
          </p>
          {isFiltered && (
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={onResetFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="products-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>#</th>
              <th>Product Name</th>
              <th>Category</th>
              <th className="text-right">Price</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Min. Level</th>
              <th className="text-center">Status</th>
              <th className="text-right">Total Value</th>
              <th className="text-center" style={{ minWidth: '140px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const qty = Number(product.quantity);
              const min = Number(product.minStock);
              const price = Number(product.price);
              const isOutOfStock = qty === 0;
              const isLowStock = !isOutOfStock && qty <= min;

              // Determine status badge class and label
              let statusClass = 'badge-success';
              let statusLabel = 'In Stock';

              if (isOutOfStock) {
                statusClass = 'badge-danger';
                statusLabel = 'Out of Stock';
              } else if (isLowStock) {
                statusClass = 'badge-warning';
                statusLabel = 'Low Stock ⚠️';
              }

              return (
                <tr
                  key={product.id}
                  className={isOutOfStock ? 'row-out-of-stock' : isLowStock ? 'row-low-stock' : ''}
                >
                  <td className="text-muted">{index + 1}</td>
                  <td className="product-name-cell">
                    <strong>{product.name}</strong>
                    {isLowStock && (
                      <span className="stock-alert-note">
                        Needs reorder ({qty} remaining, min: {min})
                      </span>
                    )}
                    {isOutOfStock && (
                      <span className="stock-alert-note text-danger">
                        Immediate restock needed!
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="category-tag">{product.category}</span>
                  </td>
                  <td className="text-right font-mono">
                    ₹{price.toFixed(2)}
                  </td>
                  <td className="text-center">
                    <span className={`qty-indicator ${isOutOfStock ? 'qty-zero' : isLowStock ? 'qty-low' : 'qty-ok'}`}>
                      {qty}
                    </span>
                  </td>
                  <td className="text-center text-muted">{min}</td>
                  <td className="text-center">
                    <span className={`status-badge ${statusClass}`}>
                      {statusLabel}
                    </span>
                  </td>
                  <td className="text-right font-mono">
                    ₹{(price * qty).toFixed(2)}
                  </td>
                  <td className="text-center">
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="btn-action btn-action-edit"
                        onClick={() => onEdit(product)}
                        title={`Edit ${product.name}`}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-action-delete"
                        onClick={() => onDeleteRequest(product)}
                        title={`Delete ${product.name}`}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;

import React, { useState, useEffect } from 'react';
import { PRODUCT_CATEGORIES } from '../data/initialProducts';

/**
 * ProductForm Component
 * Used for both adding a new product and editing an existing product.
 * Includes complete client-side validation:
 * - Product name: non-empty string
 * - Price: strictly greater than zero (> 0)
 * - Quantity: non-negative integer (>= 0)
 * - Minimum Stock: non-negative integer (>= 0)
 */
function ProductForm({ isOpen, onClose, onSave, editingProduct }) {
  // Form field state
  const [name, setName] = useState('');
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minStock, setMinStock] = useState('5');

  // Error validation state
  const [errors, setErrors] = useState({});

  // When editingProduct changes (or modal opens), populate form fields
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || '');
      setCategory(editingProduct.category || PRODUCT_CATEGORIES[0]);
      setPrice(editingProduct.price !== undefined ? String(editingProduct.price) : '');
      setQuantity(editingProduct.quantity !== undefined ? String(editingProduct.quantity) : '');
      setMinStock(editingProduct.minStock !== undefined ? String(editingProduct.minStock) : '5');
      setErrors({});
    } else {
      // Default reset for "Add New Product"
      setName('');
      setCategory(PRODUCT_CATEGORIES[0]);
      setPrice('');
      setQuantity('');
      setMinStock('5');
      setErrors({});
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // 1. Name validation
    if (!name.trim()) {
      newErrors.name = 'Product name is required and cannot be empty.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Product name must have at least 2 characters.';
    }

    // 2. Category validation
    if (!category) {
      newErrors.category = 'Please select a valid category.';
    }

    // 3. Price validation: must be > 0
    const numPrice = Number(price);
    if (price === '' || price === null || price === undefined) {
      newErrors.price = 'Price is required.';
    } else if (isNaN(numPrice) || numPrice <= 0) {
      newErrors.price = 'Price must be a positive number greater than 0.';
    }

    // 4. Quantity validation: non-negative integer (>= 0)
    const numQuantity = Number(quantity);
    if (quantity === '' || quantity === null || quantity === undefined) {
      newErrors.quantity = 'Stock quantity is required.';
    } else if (isNaN(numQuantity) || numQuantity < 0 || !Number.isInteger(numQuantity)) {
      newErrors.quantity = 'Quantity must be a whole number 0 or greater.';
    }

    // 5. Min stock validation: non-negative integer (>= 0)
    const numMinStock = Number(minStock);
    if (minStock === '' || minStock === null || minStock === undefined) {
      newErrors.minStock = 'Minimum stock level is required.';
    } else if (isNaN(numMinStock) || numMinStock < 0 || !Number.isInteger(numMinStock)) {
      newErrors.minStock = 'Minimum stock must be a whole number 0 or greater.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productPayload = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: name.trim(),
      category,
      price: parseFloat(Number(price).toFixed(2)),
      quantity: parseInt(quantity, 10),
      minStock: parseInt(minStock, 10)
    };

    onSave(productPayload);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {editingProduct ? '✏️ Edit Stationery Item' : '➕ Add New Stationery Item'}
          </h3>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Field: Product Name */}
            <div className="form-group">
              <label htmlFor="prod-name" className="form-label">
                Product Name <span className="text-danger">*</span>
              </label>
              <input
                id="prod-name"
                type="text"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="e.g. Classmate Long Notebook (180 pgs)"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                }}
                autoFocus
              />
              {errors.name && <span className="field-error-text">{errors.name}</span>}
            </div>

            {/* Field: Category */}
            <div className="form-group">
              <label htmlFor="prod-category" className="form-label">
                Category <span className="text-danger">*</span>
              </label>
              <select
                id="prod-category"
                className={`form-select ${errors.category ? 'input-error' : ''}`}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (errors.category) setErrors((prev) => ({ ...prev, category: null }));
                }}
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <span className="field-error-text">{errors.category}</span>}
            </div>

            {/* Row with Price, Quantity, Min Stock */}
            <div className="form-row-3">
              {/* Field: Price */}
              <div className="form-group">
                <label htmlFor="prod-price" className="form-label">
                  Unit Price (₹) <span className="text-danger">*</span>
                </label>
                <input
                  id="prod-price"
                  type="number"
                  step="0.5"
                  min="0.01"
                  className={`form-input ${errors.price ? 'input-error' : ''}`}
                  placeholder="e.g. 45.00"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    if (errors.price) setErrors((prev) => ({ ...prev, price: null }));
                  }}
                />
                {errors.price && <span className="field-error-text">{errors.price}</span>}
              </div>

              {/* Field: Quantity */}
              <div className="form-group">
                <label htmlFor="prod-quantity" className="form-label">
                  Stock Quantity <span className="text-danger">*</span>
                </label>
                <input
                  id="prod-quantity"
                  type="number"
                  step="1"
                  min="0"
                  className={`form-input ${errors.quantity ? 'input-error' : ''}`}
                  placeholder="e.g. 20"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    if (errors.quantity) setErrors((prev) => ({ ...prev, quantity: null }));
                  }}
                />
                {errors.quantity && <span className="field-error-text">{errors.quantity}</span>}
              </div>

              {/* Field: Minimum Stock Level */}
              <div className="form-group">
                <label htmlFor="prod-min-stock" className="form-label">
                  Min. Stock Alert <span className="text-danger">*</span>
                </label>
                <input
                  id="prod-min-stock"
                  type="number"
                  step="1"
                  min="0"
                  className={`form-input ${errors.minStock ? 'input-error' : ''}`}
                  placeholder="e.g. 5"
                  value={minStock}
                  onChange={(e) => {
                    setMinStock(e.target.value);
                    if (errors.minStock) setErrors((prev) => ({ ...prev, minStock: null }));
                  }}
                />
                {errors.minStock && <span className="field-error-text">{errors.minStock}</span>}
              </div>
            </div>

            <p className="form-helper-note">
              ℹ️ A low-stock warning will automatically trigger whenever the stock quantity falls to or below the minimum alert level.
            </p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {editingProduct ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;

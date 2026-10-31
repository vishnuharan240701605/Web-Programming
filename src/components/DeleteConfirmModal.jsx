import React from 'react';

/**
 * DeleteConfirmModal Component
 * Prompts user for explicit confirmation before permanently deleting an item.
 */
function DeleteConfirmModal({ isOpen, product, onConfirm, onCancel }) {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-card modal-card-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header modal-header-danger">
          <h3 className="modal-title">⚠️ Confirm Deletion</h3>
          <button
            type="button"
            className="btn-close"
            onClick={onCancel}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="delete-warning-text">
            Are you sure you want to delete the product:
          </p>
          <div className="delete-target-info">
            <strong>{product.name}</strong>
            <span className="text-muted">Category: {product.category} | Current Stock: {product.quantity}</span>
          </div>
          <p className="text-muted-small mt-2">
            This action cannot be undone and will remove this product from local inventory.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Yes, Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;

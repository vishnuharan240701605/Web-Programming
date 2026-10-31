import React from 'react';

/**
 * Navbar Component
 * Displays the application header, brand name, and project subtitle.
 */
function Navbar({ onOpenAddModal }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">📦</div>
          <div>
            <h1 className="brand-title">ShopStock</h1>
            <p className="brand-subtitle">Stationery Shop Inventory Management System</p>
          </div>
        </div>
        <button 
          className="btn btn-primary btn-add" 
          onClick={onOpenAddModal}
          type="button"
        >
          + Add New Product
        </button>
      </div>
    </header>
  );
}

export default Navbar;

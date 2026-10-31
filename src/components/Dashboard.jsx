import React from 'react';

/**
 * Dashboard Component
 * Displays key summary statistics calculated dynamically from the products array:
 * 1. Total Products
 * 2. Total Stock Quantity
 * 3. Low-Stock Product Count (items where quantity <= minStock)
 * 4. Total Inventory Value (sum of price * quantity)
 */
function Dashboard({ products }) {
  // 1. Total number of distinct products
  const totalProducts = products.length;

  // 2. Total units of stock across all products
  const totalStockQuantity = products.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  // 3. Count of products that need restocking (quantity <= minStock)
  const lowStockCount = products.filter(
    (item) => Number(item.quantity) <= Number(item.minStock)
  ).length;

  // 4. Total monetary value of current stock (quantity * price)
  const totalInventoryValue = products.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  return (
    <section className="dashboard-section" aria-label="Inventory Overview">
      <div className="section-header">
        <h2 className="section-title">Dashboard Overview</h2>
        <span className="live-badge">● Live Metrics</span>
      </div>

      <div className="stats-grid">
        {/* Card 1: Total Products */}
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-blue">📋</div>
          <div className="stat-details">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{totalProducts}</span>
            <span className="stat-hint">Unique stationery items</span>
          </div>
        </div>

        {/* Card 2: Total Stock Quantity */}
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-green">📦</div>
          <div className="stat-details">
            <span className="stat-label">Total Stock Units</span>
            <span className="stat-value">{totalStockQuantity}</span>
            <span className="stat-hint">Units currently in store</span>
          </div>
        </div>

        {/* Card 3: Low-Stock Products */}
        <div className={`stat-card ${lowStockCount > 0 ? 'card-warning' : ''}`}>
          <div className="stat-icon-wrapper icon-orange">⚠️</div>
          <div className="stat-details">
            <span className="stat-label">Low Stock Alerts</span>
            <span className="stat-value">{lowStockCount}</span>
            <span className="stat-hint">
              {lowStockCount > 0 ? 'Items below or at min level' : 'All items sufficiently stocked'}
            </span>
          </div>
        </div>

        {/* Card 4: Total Inventory Value */}
        <div className="stat-card">
          <div className="stat-icon-wrapper icon-emerald">💰</div>
          <div className="stat-details">
            <span className="stat-label">Total Inventory Value</span>
            <span className="stat-value">₹{totalInventoryValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="stat-hint">Total wholesale/retail worth</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

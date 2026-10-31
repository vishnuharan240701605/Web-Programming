import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SearchFilter from './components/SearchFilter';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Notification from './components/Notification';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import './App.css';

const LOCAL_STORAGE_KEY = 'shopstock_stationery_inventory';

function App() {
  // 1. Products state: loaded from localStorage or initialized with realistic sample stationery items
  const [products, setProducts] = useState(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Error loading products from localStorage:', err);
    }
    return INITIAL_PRODUCTS;
  });

  // 2. Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState('all');

  // 3. Modal & Interaction states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // 4. Feedback Notification state
  const [notification, setNotification] = useState(null);

  // Sync products to browser localStorage whenever products array changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    } catch (err) {
      console.error('Error saving products to localStorage:', err);
    }
  }, [products]);

  // Handler: Open Add Modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  // Handler: Open Edit Modal
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  // Handler: Close Form Modal
  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingProduct(null);
  };

  // Handler: Save Product (Both Add and Edit)
  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing item
      setProducts((prev) =>
        prev.map((item) => (item.id === productData.id ? productData : item))
      );
      setNotification({
        type: 'success',
        message: `Product "${productData.name}" was updated successfully!`
      });
    } else {
      // Add new item to front of list
      setProducts((prev) => [productData, ...prev]);
      setNotification({
        type: 'success',
        message: `New product "${productData.name}" was added successfully!`
      });
    }

    handleCloseFormModal();
  };

  // Handler: Delete Request (Open Confirmation)
  const handleDeleteRequest = (product) => {
    setDeletingProduct(product);
  };

  // Handler: Confirm Deletion
  const handleConfirmDelete = () => {
    if (!deletingProduct) return;

    const removedName = deletingProduct.name;
    setProducts((prev) => prev.filter((item) => item.id !== deletingProduct.id));
    setDeletingProduct(null);

    setNotification({
      type: 'danger',
      message: `Product "${removedName}" has been removed from inventory.`
    });
  };

  // Handler: Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setStockStatusFilter('all');
  };

  // Reset to initial sample products (useful for demonstration in college viva)
  const handleResetToSampleData = () => {
    if (window.confirm('Reset inventory back to initial sample stationery items?')) {
      setProducts(INITIAL_PRODUCTS);
      handleResetFilters();
      setNotification({
        type: 'info',
        message: 'Inventory reset to initial sample stationery items.'
      });
    }
  };

  // Derived: Filtered products list
  const filteredProducts = products.filter((item) => {
    // 1. Search filter (case-insensitive product name)
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase().trim());

    // 2. Category filter
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    // 3. Stock status filter
    const qty = Number(item.quantity);
    const min = Number(item.minStock);

    let matchesStockStatus = true;
    if (stockStatusFilter === 'in-stock') {
      matchesStockStatus = qty > min;
    } else if (stockStatusFilter === 'low-stock') {
      matchesStockStatus = qty <= min && qty > 0;
    } else if (stockStatusFilter === 'out-of-stock') {
      matchesStockStatus = qty === 0;
    }

    return matchesSearch && matchesCategory && matchesStockStatus;
  });

  const isFiltered = searchTerm !== '' || selectedCategory !== 'all' || stockStatusFilter !== 'all';

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      <Notification
        notification={notification}
        onDismiss={() => setNotification(null)}
      />

      {/* Navigation Header */}
      <Navbar onOpenAddModal={handleOpenAddModal} />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-container">
          {/* Dashboard Summary Cards */}
          <Dashboard products={products} />

          {/* Product Management Section */}
          <section className="inventory-section">
            <div className="section-header inventory-header">
              <div>
                <h2 className="section-title">Product Inventory</h2>
                <p className="section-desc">
                  Manage stock levels, pricing, and reorder alerts for all stationery items.
                </p>
              </div>

              <div className="header-actions">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleResetToSampleData}
                  title="Reload default stationery items"
                >
                  🔄 Reset Sample Data
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleOpenAddModal}
                >
                  + Add Product
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              stockStatusFilter={stockStatusFilter}
              onStockStatusChange={setStockStatusFilter}
              onResetFilters={handleResetFilters}
              totalCount={products.length}
              filteredCount={filteredProducts.length}
            />

            {/* Product Table */}
            <ProductTable
              products={filteredProducts}
              onEdit={handleOpenEditModal}
              onDeleteRequest={handleDeleteRequest}
              onResetFilters={handleResetFilters}
              isFiltered={isFiltered}
            />
          </section>
        </div>
      </main>

      {/* Add / Edit Product Modal */}
      <ProductForm
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProduct)}
        product={deletingProduct}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingProduct(null)}
      />

      {/* Footer with Project Credits */}
      <footer className="app-footer">
        <div className="content-container footer-content">
          <p>
            <strong>ShopStock</strong> — College Web Programming Project (React + LocalStorage)
          </p>
          <p className="text-muted-small">
            Designed for Small Stationery Shops • Clean Modular React Architecture
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

# ShopStock — Stationery Shop Inventory Management System

A beginner-friendly, clean college Web Programming project built with **React**, **JavaScript**, **CSS**, and **HTML (JSX)**.

Designed specifically for a small neighborhood stationery shop, this project demonstrates realistic inventory tracking, low-stock alerts, dynamic dashboard statistics, input validation, and `localStorage` persistence.

---

## 📌 Project Overview

- **Project Title:** ShopStock — Inventory Management System
- **Domain:** Small Retail / Stationery Shop
- **Tech Stack:** React 18, Vite, Plain Vanilla CSS, HTML5 (JSX)
- **Persistence:** Browser `localStorage` (No external database or backend required)

---

## 🚀 How to Run the Project

### Prerequisites
Make sure you have **Node.js** (v18 or higher) installed on your computer.

### Step-by-Step Execution:
1. Open your terminal / command prompt in this project folder:
   ```bash
   cd "Inventory Management System"
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 🗂️ Project Directory Structure

```text
Inventory Management System/
├── index.html                  # HTML entry template
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite bundler configuration
├── src/
│   ├── main.jsx                # React DOM entry point
│   ├── App.jsx                 # Root component: state management, filtering, CRUD logic
│   ├── App.css                 # Custom CSS styling (dark-green stationery store theme)
│   ├── index.css               # Base CSS resets and typography
│   ├── data/
│   │   └── initialProducts.js  # Realistic initial sample stationery items and categories
│   └── components/
│       ├── Navbar.jsx          # Header with branding and 'Add Product' button
│       ├── Dashboard.jsx       # 4 live summary cards with dynamic statistics
│       ├── SearchFilter.jsx    # Real-time search, category dropdown, & stock filter
│       ├── ProductTable.jsx    # Table listing products with stock status badges & actions
│       ├── ProductForm.jsx     # Add/Edit modal form with input validation
│       ├── DeleteConfirmModal.jsx # Confirmation dialog before deleting items
│       └── Notification.jsx    # Toast banner showing success/delete messages
└── README.md                   # Documentation and viva preparation notes
```

---

## 🎯 Key Features & Requirements Met

1. **Live Dashboard Metrics (Calculated Dynamically):**
   - **Total Products:** Total count of unique inventory items.
   - **Total Stock Units:** Total sum of all stock quantities currently in store.
   - **Low Stock Alerts:** Count of products where `quantity <= minStock`.
   - **Total Inventory Value:** Sum of `(price × quantity)` across all items, formatted in Indian Rupees (`₹`).

2. **Add & Edit Products:**
   - Add new products or update existing ones via a modal dialog.
   - Supports: Name, Category, Price, Stock Quantity, and Minimum Alert Level.

3. **Input Validation:**
   - **Product Name:** Must not be empty and must have at least 2 characters.
   - **Unit Price:** Must be greater than zero (`price > 0`).
   - **Stock Quantity:** Must be a non-negative whole number (`quantity >= 0`).
   - **Minimum Stock Alert:** Must be a non-negative whole number (`minStock >= 0`).
   - Clear inline error messages appear beneath any invalid fields.

4. **Search and Filtering:**
   - **Real-time Name Search:** Filters items instantly as you type.
   - **Category Dropdown:** Filter by categories such as *Notebooks & Paper*, *Writing Instruments*, *Office Supplies*, etc.
   - **Stock Status Filter:** Filter by *In Stock*, *Low Stock (≤ Min Level)*, or *Out of Stock (0 units)*.
   - **Reset Filters Button:** Easily clear all filters at once.

5. **Visual Low-Stock & Out-of-Stock Warnings:**
   - Amber warning badges (`Low Stock ⚠️`) for items below or equal to threshold.
   - Red warning badges (`Out of Stock`) for zero-quantity items.
   - Descriptive notes advising shopkeepers when an item needs reordering.

6. **Browser LocalStorage Persistence:**
   - Products are automatically saved to `localStorage` upon any add, edit, or delete.
   - Loads saved inventory on refresh or restart.
   - Falls back to realistic stationery sample items if localStorage is empty.
   - A convenient **Reset Sample Data** button is provided to reset the catalog during live viva demonstrations.

7. **Safe Deletion Confirmation:**
   - A modal dialog prompts for confirmation before permanently removing an item.
   - Shows the product name and current stock to prevent accidental deletion.

8. **User Feedback Notifications:**
   - Toast banner appears upon adding, updating, or deleting a product.
   - Automatically auto-dismisses after 4 seconds or can be closed manually.

---

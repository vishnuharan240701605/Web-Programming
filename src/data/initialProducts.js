// Initial sample products for the stationery shop
// Used when the app is first opened or if localStorage is empty

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Classmate Ruled Notebook (172 Pages)',
    category: 'Notebooks & Paper',
    price: 45,
    quantity: 28,
    minStock: 10
  },
  {
    id: 'prod-2',
    name: 'Reynolds 045 Fine Ball Pens (Pack of 5)',
    category: 'Writing Instruments',
    price: 50,
    quantity: 16,
    minStock: 8
  },
  {
    id: 'prod-3',
    name: 'Pastel Chisel Highlighters (Pack of 5)',
    category: 'Writing Instruments',
    price: 130,
    quantity: 4,
    minStock: 6
  },
  {
    id: 'prod-4',
    name: 'JK Copier A4 Paper Ream (500 Sheets)',
    category: 'Notebooks & Paper',
    price: 290,
    quantity: 12,
    minStock: 5
  },
  {
    id: 'prod-5',
    name: 'Kangaro Medium Desk Stapler (#10)',
    category: 'Office Supplies',
    price: 95,
    quantity: 7,
    minStock: 5
  },
  {
    id: 'prod-6',
    name: 'Kangaro Staple Pins Box (Pack of 1000)',
    category: 'Office Supplies',
    price: 20,
    quantity: 3,
    minStock: 10
  },
  {
    id: 'prod-7',
    name: 'Dust-Free White Erasers (Box of 20)',
    category: 'Writing Instruments',
    price: 60,
    quantity: 0,
    minStock: 5
  },
  {
    id: 'prod-8',
    name: 'Camlin Mathematical Geometry Box',
    category: 'Art & Drawing',
    price: 115,
    quantity: 9,
    minStock: 5
  },
  {
    id: 'prod-9',
    name: '3M Post-it Yellow Sticky Notes (3x3)',
    category: 'Office Supplies',
    price: 75,
    quantity: 18,
    minStock: 8
  },
  {
    id: 'prod-10',
    name: 'Fevicol MR Craft Glue Bottle (100g)',
    category: 'Art & Drawing',
    price: 40,
    quantity: 22,
    minStock: 8
  }
];

export const PRODUCT_CATEGORIES = [
  'Notebooks & Paper',
  'Writing Instruments',
  'Office Supplies',
  'Art & Drawing',
  'Other Stationery'
];

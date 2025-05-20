const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

// MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Change if your XAMPP MySQL has a password
  database: 'agricultural_dashboard'
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// 1. Dashboard Summary
app.get('/api/dashboard', async (req, res) => {
  try {
    // Using the provided static data
    res.json({
      summary: {
        totalSales: 1257.25,
        totalProducts: 4050,
        totalDeliveries: 2,
        growthRate: 15
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// 2. Sales Trends (last 7 days)
app.get('/api/sales/trends', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE(transaction_date) as date, SUM(total_amount) as total
      FROM sales_transactions
      GROUP BY DATE(transaction_date)
      ORDER BY date DESC
      LIMIT 7
    `);
    rows.reverse();
    res.json({
      labels: rows.map(r => {
        const date = new Date(r.date);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      }),
      data: rows.map(r => r.total)
    });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// 3. Inventory Status
app.get('/api/inventory/status', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT product_name, quantity_in_stock FROM products');
    res.json({
      products: rows.map(r => ({ name: r.product_name, quantity: r.quantity_in_stock }))
    });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// 4. Delivery Status
app.get('/api/deliveries/status', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT delivery_status, COUNT(*) as count
      FROM delivery_records
      GROUP BY delivery_status
    `);
    const statusMap = { Pending: 0, 'In Transit': 0, Delivered: 0 };
    rows.forEach(r => { statusMap[r.delivery_status] = r.count; });
    res.json({
      pending: statusMap['Pending'],
      inTransit: statusMap['In Transit'],
      delivered: statusMap['Delivered']
    });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// 5. Growth Metrics (static for now)
app.get('/api/growth/metrics', (req, res) => {
  res.json({
    labels: ['Sales Growth', 'Market Share', 'Customer Base', 'Product Range', 'Supply Chain'],
    data: [80, 60, 70, 50, 65]
  });
});

// 6. Recent Sales
app.get('/api/sales/recent', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.transaction_id, p.product_name, s.quantity_sold, s.total_amount, s.transaction_date
      FROM sales_transactions s
      JOIN products p ON s.product_id = p.product_id
      ORDER BY s.transaction_date DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// 7. Product List
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT product_id, product_name, category, unit_price, quantity_in_stock FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Dashboard running at http://localhost:${port}`);
}); 
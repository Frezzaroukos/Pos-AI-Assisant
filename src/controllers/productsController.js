const db = require('../models/database');

exports.addProduct = (req, res) => {
  const { name, price, description } = req.body;
  const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';

  db.run(query, [name, price, description], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to add product', error: err.message });
    }
    res.status(201).json({ message: 'Product added successfully', productId: this.lastID });
  });
};

// src/controllers/productsController.js
const db = require('../models/database');

exports.addProduct = (req, res) => {
  const { name, price, description } = req.body;

  const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
  db.run(query, [name, price, description], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to add product', error: err.message });
    }
    res.status(201).json({ message: 'Product added successfully', productId: this.lastID });
  });
};

// src/controllers/productsController.js
exports.getAllProducts = (req, res) => {
    const query = 'SELECT * FROM products';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching products', error: err.message });
        }
        res.status(200).json(rows);
    });
};
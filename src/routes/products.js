const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Endpoint για προσθήκη νέου προϊόντος
router.post('/add', (req, res) => {
    const { name, price, stock } = req.body;
    
    if (!name || !price || !stock) {
        return res.status(400).json({ error: 'Name, price, and stock are required' });
    }
    
    const query = `INSERT INTO products (name, price, stock) VALUES (?, ?, ?)`;
    db.run(query, [name, price, stock], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, price, stock });
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Route για την προσθήκη προϊόντος
router.post('/add', productsController.addProduct);

// Εδώ μπορείς να προσθέσεις άλλες routes για ανάκτηση ή διαγραφή προϊόντων

module.exports = router;

// src/routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Route για την προσθήκη προϊόντος
router.post('/add', productsController.addProduct);

// Route για την ανάκτηση όλων των προϊόντων
router.get('/', productsController.getAllProducts);

module.exports = router;
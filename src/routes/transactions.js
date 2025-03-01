const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Endpoint για καταγραφή συναλλαγής
router.post('/record', (req, res) => {
    const { product_id, quantity } = req.body;
    
    if (!product_id || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    // Βρες το προϊόν από τη βάση δεδομένων
    db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const total_price = product.price * quantity;
        const date = new Date().toISOString();
        
        // Καταγραφή συναλλαγής
        const query = `INSERT INTO transactions (product_id, quantity, total_price, date) VALUES (?, ?, ?, ?)`;
        db.run(query, [product_id, quantity, total_price, date], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID, product_id, quantity, total_price, date });
        });
    });
});

module.exports = router;
 require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('POS AI Assistant is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const db = require('./models/database');

const productsRoute = require('./routes/products');
const transactionsRoute = require('./routes/transactions');

app.use('/api/products', productsRoute);
app.use('/api/transactions', transactionsRoute);
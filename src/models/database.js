 const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ορισμός της διαδρομής της βάσης
const dbPath = path.resolve(__dirname, 'pos_database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Δημιουργία των πινάκων (αν δεν υπάρχουν ήδη)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        quantity INTEGER,
        total_price REAL,
        date TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`);
});

module.exports = db;
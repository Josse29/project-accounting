const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('products.db');

// Create tables
const createTables = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS Category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            category_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES Category(id)
        )`);
    });
};

const getProducts = () => {
    db.all(`SELECT 
                Product.id, 
                Product.name, 
                Product.price, 
                Product.category_id, 
                Category.name AS category_name, 
                Product.created_at, 
                Product.updated_at 
            FROM Product 
            LEFT JOIN Category ON Product.category_id = Category.id`,
        [],
        (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            rows.forEach((row) => {
                console.log(row);
            });
        });
};

// Insert a new product
const insertProduct = (name, price, categoryId) => {
    db.run(`INSERT INTO Product (name, price, category_id) VALUES (?, ?, ?)`, [name, price, categoryId], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
};

// Update a product
const updateProduct = (id, name, price, categoryId) => {
    db.run(`UPDATE Product SET name = ?, price = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [name, price, categoryId, id], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    });
};

// Delete a product
const deleteProduct = (id) => {
    db.run(`DELETE FROM Product WHERE id = ?`, id, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) deleted: ${this.changes}`);
    });
};

// Example usage
db.serialize(() => {
    createTables();
    getProducts()
    insertProduct('Laptop', 999.99, 1);
    updateProduct(1, 'Gaming Laptop', 1299.99, 1);
    deleteProduct(1);
});

// Close the database
db.close();

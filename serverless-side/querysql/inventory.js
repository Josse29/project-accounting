// create-table
// CREATE TABLE Inventory (
//     InventoryId INTEGER PRIMARY KEY AUTOINCREMENT,
//     InventoryDate TEXT DEFAULT (datetime('now','localtime')),
//     InventoryInfo TEXT,
//     InventoryProductId INTEGER,
//     InventorySupplierId INTEGER,
//     InventoryUserId INTEGER,
//     FOREIGN KEY (InventoryProductId) REFERENCES Product(ProductId),
//     FOREIGN KEY (InventorySupplierId) REFERENCES Supplier(SupplierId)
//     FOREIGN KEY (InventoryUserId) REFERENCES Product(ProductId),
// );

// SELECT 
// InventoryId, 
// InventoryDate, 
// Product.ProductName, 
// Product.ProductCategoryId, 
// Category.CategoryName, 
// Supplier.SupplierName
// FROM Inventory
// LEFT JOIN Product ON Inventory.InventoryProductId = Product.ProductId
// LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
// LEFT JOIN Supplier ON Inventory.InventorySupplierId = Supplier.SupplierId
// ORDER BY Inventory.InventoryDate DESC
// LIMIT ${limitProduct} 
// OFFSET ${offsetProduct}

// init table & col
const tableName = `Inventory`
const colInventoryId = `InventoryId`
const colInventoryDate = `InventoryDate`
const colInventoryProductId = `InventoryProductId`
const colInventorySupplierId = `InventorySupplierId`


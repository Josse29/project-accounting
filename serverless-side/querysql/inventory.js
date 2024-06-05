// create-table
// CREATE TABLE Inventory (
//     InventoryId INTEGER PRIMARY KEY AUTOINCREMENT,
//     InventoryDate TEXT DEFAULT (datetime('now','localtime')),
//     InventoryInfo TEXT,
//     InventoryProductId INTEGER,
//     InventorySupplierId INTEGER,
//     FOREIGN KEY (InventoryProductId) REFERENCES Product(ProductId),
//     FOREIGN KEY (InventorySupplierId) REFERENCES Supplier(SupplierId)
// );


// init table & col
const tableName = `Satuan`
const colInventoryId = `InventoryId`
const colInventoryDate = `InventoryDate`
const colInventoryProductId = `InventoryProductId`
const colInventorySupplierId = `InventorySupplierId`


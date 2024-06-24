// create-table
// CREATE TABLE Inventory (
//     InventoryId INTEGER PRIMARY KEY AUTOINCREMENT,
//     InventoryDate TEXT DEFAULT (datetime('now','localtime')),
//     InventoryInfo TEXT,
//     InventoryProductId INTEGER,
//     InventoryProductQty INTEGER,
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
const colInventoryProductQty = `InventoryProductQty`
const colInventoryInfo = `InventoryInfo`
// 1.CREATE 
export const queryInsertInventory = (inventoryProductId, inventoryProductQty, inventoryInfo) => {
    return `INSERT 
            INTO ${tableName} 
            (${colInventoryProductId}, ${colInventoryProductQty},${colInventoryInfo}) 
            VALUES 
            ('${inventoryProductId}', '${inventoryProductQty}', '${inventoryInfo})`
}
// 2.READ
export const queryGetInventory = () => {
    return `SELECT *
            FROM ${tableName}
            LEFT JOIN Product ON ${tableName}.${colInventoryProductId} = Product.ProductId
            LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
            LEFT JOIN Supplier ON Inventory.InventorySupplierId = Supplier.SupplierId
            ORDER BY Inventory.InventoryDate DESC`

}
// 3.UPDATE
export const queryUpdateInventory = (inventoryId, inventoryProductId, inventoryProductQty, inventoryInfo) => {
    return `UPDATE
            ${tableName}
            SET ${colInventoryProductId} = '${inventoryProductId}',
                ${colInventoryProductQty} = '${inventoryProductQty}',
                ${colInventoryInfo} = '${inventoryInfo}',
            WHERE ${colInventoryId} = '${inventoryId}'`
}
// 4.DELETE
export const queryDeleteInventory = (inventoryId) => {
    return `DELETE
            FROM ${tableName}
            WHERE ${colInventoryId} = '${inventoryId}'`
}
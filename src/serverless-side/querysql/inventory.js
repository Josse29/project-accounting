// create-table
// CREATE TABLE Inventory (
//     InventoryId INTEGER PRIMARY KEY AUTOINCREMENT,
//     InventoryDate TEXT DEFAULT (datetime('now','localtime')),
//     InventoryInfo TEXT,
//     InventoryProductId INTEGER,
//     InventoryProductQty INTEGER,
//     InventoryUserId INTEGER,
//     FOREIGN KEY (InventoryProductId) REFERENCES Product(ProductId),
//     FOREIGN KEY (InventorySupplierId) REFERENCES Supplier(SupplierId)
//     FOREIGN KEY (InventoryUserId) REFERENCES Product(ProductId),
// );
// CREATE TABLE INVENTORY (
//   InventoryId INTEGER PRIMARY KEY AUTOINCREMENT,
//   InventoryDate TEXT DEFAULT (datetime('now','localtime')),
//   InventoryInfo TEXT,
//   InventoryProductId INTEGER,
//   InventoryProductQty INTEGER,
//   FOREIGN KEY (InventoryProductId) REFERENCES Product(ProductId)
// )
// init table & col
const tableName = `Inventory`;
const colInventoryId = `InventoryId`;
const colInventoryDate = `InventoryDate`;
const colInventoryProductId = `InventoryProductId`;
const colInventoryProductQty = `InventoryProductQty`;
const colInventoryInfo = `InventoryInfo`;
// 1.CREATE
export const queryInsertInventory = (inventoryProductId, inventoryInfo) => {
  return `INSERT 
          INTO ${tableName} 
          (${colInventoryProductId},${colInventoryInfo}) 
          VALUES 
          (${inventoryProductId}, '${inventoryInfo}')`;
};
// 2.READ
export const queryGetInventory = (
  inventorySearch,
  inventoryLimit,
  inventoryActivePage
) => {
  let query = `SELECT *
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colInventoryProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with searhing value
  if (inventorySearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${inventorySearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${inventorySearch}%' ESCAPE '!' OR
                    Supplier.SupplierName LIKE '%${inventorySearch}%' ESCAPE '!' `;
  }
  // with order limit offset
  query += `ORDER BY ${tableName}.${colInventoryDate} DESC
            LIMIT ${inventoryLimit} 
            OFFSET ${inventoryActivePage}`;
  return query;
};
export const queryTotalRowInventory = (inventorySearch) => {
  let query = `SELECT COUNT(${colInventoryId})
               AS TOTAL_ROW
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colInventoryProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with searhing value
  if (inventorySearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${inventorySearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${inventorySearch}%' ESCAPE '!' OR
                    Supplier.SupplierName LIKE '%${inventorySearch}%' ESCAPE '!' `;
  }
  return query;
};
export const queryListInventory = (inventorySearch) => {
  let query = `SELECT  
               Product.ProductId,
               Product.ProductName
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colInventoryProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with searhing value
  if (inventorySearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${inventorySearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${inventorySearch}%' ESCAPE '!' OR
                    Supplier.SupplierName LIKE '%${inventorySearch}%' ESCAPE '!' `;
  }
  return query;
};
// 3.UPDATE
export const queryUpdateInventory = (
  inventoryId,
  inventoryProductId,
  inventoryProductQty,
  inventoryInfo
) => {
  return `UPDATE
          ${tableName}
          SET ${colInventoryProductId} = '${inventoryProductId}',
              ${colInventoryProductQty} = '${inventoryProductQty}',
              ${colInventoryInfo} = '${inventoryInfo}',
          WHERE ${colInventoryId} = '${inventoryId}'`;
};
// 4.DELETE
export const queryDeleteInventory = (inventoryId) => {
  return `DELETE
          FROM ${tableName}
          WHERE ${colInventoryId} = ${inventoryId}`;
};

// create-table
export const createTable = () => {
  return `CREATE 
          TABLE Supplier (
            SupplierId INTEGER PRIMARY KEY AUTOINCREMENT, 
            SupplierDate TEXT DEFAULT (datetime('now','localtime')),
            SupplierName VARCHAR(255), 
            SupplierInfo TEXT,
            SupplierImg BLOB ,
            SupplierProductId TEXT
          );`;
};
// SuplierProductId
// init table & col
const tableName = `Supplier`;
const colSupplierId = `SupplierId`;
const colSuppplierDate = `SupplierDate`;
const colSupplierName = `SupplierName`;
const colSupplierInfo = `SupplierInfo`;
const colSupplierImg = `SupplierImg`;
const colSupplierProductId = `SupplierProductId`; // as JSON.STRINGIFY || SQLITE isn't exist array || ambigu
// 1.CREATE
export const queryInsertSupplier = (
  supplierName,
  supplierInfo,
  supplierImg
) => {
  return `INSERT 
          INTO ${tableName} 
          (${colSupplierName}, ${colSupplierInfo}, ${colSupplierImg}) 
          VALUES 
          ('${supplierName}', '${supplierInfo}', '${supplierImg}')`;
};
// 2.READ
export const queryGetSupplier = (
  supplierSearch,
  supplierLimit,
  supplierStartOffset
) => {
  let query = `SELECT ${tableName}.${colSupplierId},
                      ${tableName}.${colSuppplierDate},
                      ${tableName}.${colSupplierName},
                      ${tableName}.${colSupplierImg},
                      ${tableName}.${colSupplierInfo},
              (SELECT GROUP_CONCAT(Product.ProductName) FROM Product
              WHERE Product.ProductSupplierId = ${tableName}.${colSupplierId})
              AS ProductList 
              FROM Supplier `;
  // with feature search
  if (supplierSearch !== "") {
    query += `WHERE ${colSupplierName} LIKE '%${supplierSearch}%' ESCAPE '!' OR
                    ${colSupplierInfo} LIKE '%${supplierSearch}%' ESCAPE '!' `;
  }
  query += `ORDER BY ${colSupplierName} ASC
            LIMIT ${supplierLimit}
            OFFSET ${supplierStartOffset}`;
  return query;
};
export const queryTotalRowSupplier = (supplierSearch) => {
  let query = `SELECT COUNT (${colSupplierId}) 
               AS TOTAL_ROW
               FROM ${tableName} `;
  // with feature search
  if (supplierSearch !== "") {
    query += `WHERE ${colSupplierName} LIKE '%${supplierSearch}%' ESCAPE '!' OR 
                    ${colSupplierInfo} LIKE '%${supplierSearch}%' ESCAPE '!'`;
  }
  return query;
};
export const queryGetListSupplier = (supplierSearch) => {
  let query = `SELECT 
               ${colSupplierId}, ${colSupplierName} 
               FROM ${tableName} `;
  // with feature search
  if (supplierSearch !== "") {
    query += `WHERE ${colSupplierName} LIKE '%${supplierSearch}%' ESCAPE '!' OR 
                    ${colSupplierInfo} LIKE '%${supplierSearch}%' ESCAPE '!' `;
  }
  query += `ORDER BY ${colSupplierName} ASC`;
  return query;
};
// 3.UPDATE
export const queryUpdateSupplier = (
  supplierId,
  supplierName,
  supplierInfo,
  supplierImg
) => {
  let query = `UPDATE ${tableName}
               SET ${colSupplierName} = '${supplierName}',
                   ${colSupplierInfo} = '${supplierInfo}'`;
  // with image
  if (supplierImg !== "") {
    query += `,
              ${colSupplierImg}  = '${supplierImg}'`;
  }
  query += `WHERE ${colSupplierId} = ${supplierId}`;
  return query;
};
// 4.DELETE
export const queryDeleteSupplier = (supplierId) => {
  return `DELETE 
          FROM ${tableName}
          WHERE ${colSupplierId} = ${supplierId} `;
};
// SELECT
//     Inventory.InventoryProductId,
//     Product.ProductName,
//     Category.CategoryName,
//     Supplier.SupplierName,
//     SUM(Inventory.InventoryProductQty) AS TotalQuantity,
//     MAX(Inventory.InventoryDate) AS LatestInventoryDate
// FROM Inventory
// LEFT JOIN Product ON Inventory.InventoryProductId = Product.ProductId
// LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
// LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId
// GROUP BY Inventory.InventoryProductId, Product.ProductName, Category.CategoryName, Supplier.SupplierName
// ORDER BY LatestInventoryDate DESC
// LIMIT 2
// OFFSET 0;

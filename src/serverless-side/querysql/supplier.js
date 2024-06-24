// create-table
export const createTable = () => {
  return `CREATE 
            TABLE Supplier (
            SupplierId INTEGER PRIMARY KEY AUTOINCREMENT, 
            SupplierDate TEXT DEFAULT (datetime('now','localtime')),
            SupplierName VARCHAR(255), 
            SupplierInfo TEXT,
            SupplierImg BLOB);`;
};
// SuplierProductId
// init table & col
const tableName = `Supplier`;
const colSupplierId = `SupplierId`;
const colSupplierName = `SupplierName`;
const colSupplierInfo = `SupplierInfo`;
const colSupplierImg = `SupplierImg`;

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
  let query = `SELECT *
               FROM ${tableName} `;
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
  let query = `SELECT COUNT(${colSupplierId}) AS TOTAL_ROW
               FROM ${tableName} `;
  // with feature search
  if (supplierSearch !== "") {
    query += `WHERE ${colSupplierName} LIKE '%${supplierSearch}%' ESCAPE '!' OR 
                    ${colSupplierInfo} LIKE '%${supplierSearch}%' ESCAPE '!'`;
  }
  return query;
};
export const queryGetListSupplier = (supplierSearch) => {
  let query = `SELECT ${colSupplierId}, ${colSupplierName} 
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

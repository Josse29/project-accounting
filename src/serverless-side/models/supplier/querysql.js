// 1.CREATE
export const queryInsertSupplier = (supplierName, supplierInfo, imgbase64) => {
  let query = `INSERT 
               INTO Supplier 
               (SupplierName, SupplierInfo, SupplierImg) 
               VALUES 
               ('${supplierName}', '${supplierInfo}', '${imgbase64}')`;
  return query;
};
// 2.READ
export const queryGetSupplier = (
  supplierSearch,
  supplierLimit,
  supplierStartOffset
) => {
  let query = `SELECT Supplier.SupplierId,
                      Supplier.SupplierDate,
                      Supplier.SupplierName,
                      Supplier.SupplierImg,
                      Supplier.SupplierInfo, `;
  // query group concate with product productlist
  query += `(SELECT GROUP_CONCAT(Product.ProductName) FROM Product
            WHERE Product.ProductSupplierId = Supplier.SupplierId)
            AS SupplierProductList 
            FROM Supplier `;
  // with feature search
  if (supplierSearch !== "") {
    query += `WHERE SupplierName LIKE '%${supplierSearch}%' ESCAPE '!' OR
                    SupplierInfo LIKE '%${supplierSearch}%' ESCAPE '!' `;
  }
  query += `ORDER BY SupplierName ASC
            LIMIT ${supplierLimit}
            OFFSET ${supplierStartOffset}`;
  return query;
};

export const queryTotalRowSupplier = (supplierSearch) => {
  let query = `SELECT COUNT (*) 
                 AS TOTAL_ROW
                 FROM Supplier `;
  // with feature search
  if (supplierSearch !== "") {
    query += `WHERE SupplierName LIKE '%${supplierSearch}%' ESCAPE '!' OR 
                      SupplierInfo LIKE '%${supplierSearch}%' ESCAPE '!'`;
  }
  return query;
};
export const queryGetListSupplier = (supplierSearch) => {
  let query = `SELECT 
               SupplierId, SupplierName 
               FROM Supplier `;
  // with feature search
  if (supplierSearch !== "") {
    query += `WHERE SupplierName LIKE '%${supplierSearch}%' ESCAPE '!' OR 
                      SupplierInfo LIKE '%${supplierSearch}%' ESCAPE '!' `;
  }
  query += `ORDER BY SupplierName ASC`;
  return query;
};
// 3.UPDATE
export const queryUpdateSupplier = (
  supplierId,
  supplierName,
  supplierInfo,
  imgBase64,
  supplierCancelImg
) => {
  let query = `UPDATE 
               Supplier
               SET SupplierName = '${supplierName}',
                   SupplierInfo = '${supplierInfo}', `;
  //  if remove image
  if (supplierCancelImg) {
    query += `SupplierImg = 'null' `;
  }
  // if change image
  if (!supplierCancelImg && imgBase64 !== "null") {
    query += `SupplierImg = '${imgBase64}' `;
  }
  // if it doesn't change image , do nothing
  query += `WHERE SupplierId = ${supplierId}`;
  return query;
};
// 4.DELETE
export const queryDeleteSupplier = (supplierId) => {
  return `DELETE 
            FROM Supplier
            WHERE SupplierId = ${supplierId} `;
};

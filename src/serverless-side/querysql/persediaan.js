// create-table
export const createTablePersediaan = () => {
  return `CREATE TABLE Persediaan (
            PersediaanId INTEGER PRIMARY KEY AUTOINCREMENT,
            PersediaanDDMY TEXT,
            PersediaanHMS TEXT,
            PersediaanInfo TEXT,
            PersediaanProductId INTEGER,
            PersediaanQty INTEGER,
            PersediaanRp INTEGER,
            FOREIGN KEY (PersediaanProductId) REFERENCES Product(ProductId)
          )`;
};

// init table & col
const tableName = `Persediaan`;
const colPersediaanId = `PersediaanId`;
const colPersediaanDDMY = `PersediaanDDMY`;
const colPersediaanHMS = `PersediaanHMS`;
const colPersediaanProductId = `PersediaanProductId`;
const colPersediaanQty = `PersediaanQty`;
const colPersediaanRp = `PersediaanRp`;
const colPersediaanInfo = `PersediaanInfo`;
// 1.CREATE
export const queryInsertPersediaan = (
  valPersediaanDDMY,
  valPersediaanHMS,
  valPersediaanProductId,
  valPersediaanQty,
  valPersediaanRp,
  valPersediaanInfo
) => {
  return `INSERT 
          INTO ${tableName} 
          (${colPersediaanDDMY},${colPersediaanHMS},${colPersediaanProductId},${colPersediaanQty},${colPersediaanRp},${colPersediaanInfo}) 
          VALUES 
          ('${valPersediaanDDMY}', '${valPersediaanHMS}',${valPersediaanProductId},${valPersediaanQty},${valPersediaanRp},'${valPersediaanInfo}')`;
};
// 2.READ
export const queryGetPersediaan = (
  valPersediaanSearch,
  valPersediaanLimit,
  valPersediaanOffset
) => {
  let query = `SELECT 
               Persediaan.PersediaanId,
               Persediaan.PersediaanDDMY,
               Persediaan.PersediaanHMS,
               Product.ProductName,
               Product.ProductPrice,
               Category.CategoryName,
               Supplier.SupplierName,
               Persediaan.PersediaanRp,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanInfo
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colPersediaanProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with searhing value
  if (valPersediaanSearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${valPersediaanSearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${valPersediaanSearch}%' ESCAPE '!' OR
                    Supplier.SupplierName LIKE '%${valPersediaanSearch}%' ESCAPE '!'
 `;
  }
  // with order limit offset
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC
            LIMIT ${valPersediaanLimit} 
            OFFSET ${valPersediaanOffset}`;
  return query;
};
export const queryGetPersediaanTotalRow = (valPersediaanSearch) => {
  let query = `SELECT COUNT(${colPersediaanId})
               AS TOTAL_ROW
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colPersediaanProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with searhing value
  if (valPersediaanSearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${valPersediaanSearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${valPersediaanSearch}%' ESCAPE '!' OR
                    Supplier.SupplierName LIKE '%${valPersediaanSearch}%' ESCAPE '!'
 `;
  }
  return query;
};
export const queryListPersediaan = (valPersediaanSearch) => {
  let query = `SELECT  
               Product.ProductId,
               Product.ProductName
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colPersediaanProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with searhing value
  if (valPersediaanSearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${valPersediaanSearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${valPersediaanSearch}%' ESCAPE '!' OR
                    Supplier.SupplierName LIKE '%${valPersediaanSearch}%' ESCAPE '!' `;
  }
  return query;
};
export const queryGetPersediaanProductId = (valPersediaanProductId) => {
  return `SELECT
          ${tableName}.${colPersediaanDDMY},
          ${tableName}.${colPersediaanHMS},
          ${tableName}.${colPersediaanRp},
          ${tableName}.${colPersediaanQty}
          FROM Persediaan
          WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId}
          ORDER BY ${tableName}.${colPersediaanDDMY} DESC, ${tableName}.${colPersediaanHMS} DESC `;
};
export const queryGetPersediaanQty = (valPersediaanProductId) => {
  let query = `SELECT
               SUM(Persediaan.PersediaanQty) AS TotalQty
               FROM Persediaan `;
  if (valPersediaanProductId !== "") {
    query += `WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} `;
  }
  return query;
};
export const queryGetPersediaanRpSum = (valPersediaanProductId) => {
  let query = `SELECT
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan `;
  if (valPersediaanProductId !== "") {
    query += `WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} `;
  }
  return query;
};
// for export report
export const queryGetPersediaanReport = () => {
  return `SELECT
          Persediaan.PersediaanDDMY AS Tanggal,
          Persediaan.PersediaanHMS AS Waktu, 
          Product.ProductName AS NamaProduk,
          Category.CategoryName AS Kategori, 
          Product.ProductPrice AS Harga,
          Supplier.SupplierName AS Supplier,  
          Persediaan.PersediaanQty AS TotalQty,
          Persediaan.PersediaanRp AS TotalRupiah
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
          LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId
          ORDER BY Persediaan.PersediaanId DESC`;
};
export const queryGetPersediaanProductReport = () => {
  return `SELECT
          Persediaan.PersediaanDDMY,
          Persediaan.PersediaanHMS, 
          Product.ProductName, 
          Product.ProductPrice, 
          Persediaan.PersediaanQty,
          Persediaan.PersediaanRp
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC`;
};

export const queryGetPersediaanProductGroup = () => {
  return `SELECT
          Product.ProductName,
          Product.ProductPrice,
          SUM(Persediaan.PersediaanQty) AS TotalQty,
          SUM(Persediaan.PersediaanRp) AS TotalRp
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          GROUP BY Persediaan.PersediaanProductId
          ORDER BY Product.ProductName ASC`;
};
export const queryGetPersediaanSupplierReport = () => {
  return `SELECT
          Supplier.SupplierName, 
          Product.ProductName,
          Product.ProductPrice,
          Persediaan.PersediaanQty,
          Persediaan.PersediaanRp
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId
          ORDER BY Supplier.SupplierId DESC`;
};
export const queryGetPersediaanSupplierGroup = () => {
  return `SELECT
          Supplier.SupplierName,
          SUM(Persediaan.PersediaanQty) AS TotalQty,
          SUM(Persediaan.PersediaanRp) AS TotalRp
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId
          GROUP BY Supplier.SupplierId`;
};
// export const queryGetPersediaanProductList = (valProductName) => {
//   return `SELECT
//           Persediaan.PersediaanProductId,
//           Product.ProductName,
//           Product.ProductPrice,
//           SUM(Persediaan.PersediaanQty) AS TotalQty
//           FROM Persediaan
//           LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
//           WHERE Product.ProductName LIKE '%${valProductName}%' ESCAPE '!'
//           GROUP BY Persediaan.PersediaanProductId `;
// };
// export const queryGetPersediaanProductListRow = (valProductName) => {
//   return `SELECT COUNT(*) AS TotalRow
//           FROM (SELECT
//                   Persediaan.PersediaanProductId,
//                   Product.ProductName,
//                   Product.ProductPrice,
//                 SUM(Persediaan.PersediaanQty) AS TotalQty
//                 FROM Persediaan
//                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
//                 WHERE Product.ProductName LIKE '%${valProductName}%' ESCAPE '!'
//                 GROUP BY Persediaan.PersediaanProductId )
//           AS GroupedData`;
// };
// 3.UPDATE
export const queryUpdatePersediaan = (
  valPersediaanId,
  valPersediaanDDMY,
  valPersediaanHMS,
  valPersediaanProductId,
  valPersediaanQty,
  valPersediaanRp,
  valPersediaanInfo
) => {
  console.log(`UPDATE
    ${tableName}
    SET ${colPersediaanDDMY} = '${valPersediaanDDMY}',
        ${colPersediaanHMS} = '${valPersediaanHMS}',
        ${colPersediaanProductId} = ${valPersediaanProductId},
        ${colPersediaanQty} = ${valPersediaanQty},
        ${colPersediaanRp} = ${valPersediaanRp},
        ${colPersediaanInfo} = '${valPersediaanInfo}'
    WHERE ${colPersediaanId} = ${valPersediaanId}`);
  return `UPDATE
          ${tableName}
          SET ${colPersediaanDDMY} = '${valPersediaanDDMY}',
              ${colPersediaanHMS} = '${valPersediaanHMS}',
              ${colPersediaanProductId} = ${valPersediaanProductId},
              ${colPersediaanQty} = ${valPersediaanQty},
              ${colPersediaanRp} = ${valPersediaanRp},
              ${colPersediaanInfo} = '${valPersediaanInfo}'
          WHERE ${colPersediaanId} = ${valPersediaanId}`;
};
// 4.DELETE
export const queryDeletePersediaan = (valPersediaanId) => {
  return `DELETE
          FROM ${tableName}
          WHERE ${colPersediaanId} = ${valPersediaanId}`;
};

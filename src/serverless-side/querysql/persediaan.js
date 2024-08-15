// create-table
export const createTablePersediaan = () => {
  return `CREATE TABLE Persediaan (
          PersediaanId INTEGER PRIMARY KEY AUTOINCREMENT,
          PersediaanDDMY TEXT,
          PersediaanHMS TEXT,
          PersediaanInfo TEXT,
          PersediaanQty INTEGER,
          PersediaanRp INTEGER,
          PersediaanProductId INTEGER,
          PersediaanPersonId INTEGER,
          FOREIGN KEY (PersediaanProductId) REFERENCES Product(ProductId)
          FOREIGN KEY (PersediaanPersonId) REFERENCES User(UserId)
          )`;
};

// schema persediaan
const tableName = `Persediaan`;
const colPersediaanId = `PersediaanId`;
const colPersediaanDDMY = `PersediaanDDMY`;
const colPersediaanHMS = `PersediaanHMS`;
const colPersediaanProductId = `PersediaanProductId`;
const colPersediaanQty = `PersediaanQty`;
const colPersediaanRp = `PersediaanRp`;
const colPersediaanPersonId = `PersediaanPersonId`;
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
  let query = `INSERT 
               INTO ${tableName} 
               (${colPersediaanDDMY},${colPersediaanHMS},${colPersediaanProductId},${colPersediaanQty},${colPersediaanRp},${colPersediaanInfo}) 
               VALUES 
               ('${valPersediaanDDMY}', '${valPersediaanHMS}',${valPersediaanProductId},${valPersediaanQty},${valPersediaanRp},'${valPersediaanInfo}')`;
  return query;
};
export const queryInsertPersediaan1 = (
  ProductYMDval,
  ProductHMSval,
  ProductIdval,
  PersediaanQtyval,
  PersediaanRpval,
  PersonIdval
) => {
  let query = `INSERT 
               INTO ${tableName} 
               (${colPersediaanDDMY}, ${colPersediaanHMS}, ${colPersediaanProductId}, ${colPersediaanQty}, ${colPersediaanRp}, ${colPersediaanPersonId}) 
               VALUES 
               ('${ProductYMDval}', '${ProductHMSval}',${ProductIdval}, ${PersediaanQtyval}, ${PersediaanRpval}, ${PersonIdval})`;
  return query;
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
               Persediaan.PersediaanProductId,
               Persediaan.PersediaanRp,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanInfo,
               Product.ProductName,
               Product.ProductPriceBeli,
               Product.ProductPriceJual,
               Category.CategoryName,
               Supplier.SupplierName
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
  // with order limit offset
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC
            LIMIT ${valPersediaanLimit} 
            OFFSET ${valPersediaanOffset}`;
  return query;
};
export const queryGetPersediaanTotalRow = (valPersediaanSearch) => {
  let query = `SELECT COUNT(Persediaan.PersediaanId)
               AS TOTAL_ROW
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colPersediaanProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  if (valPersediaanSearch !== "") {
    //  with searhing value
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
export const queryGetPersediaanReport = () => {
  return `SELECT
          Persediaan.PersediaanDDMY AS Tanggal,
          Persediaan.PersediaanHMS AS Waktu, 
          Product.ProductName AS NamaProduk,
          Category.CategoryName AS Kategori, 
          Product.ProductPriceBeli AS HargaBeli,
          Supplier.SupplierName AS Supplier,  
          Persediaan.PersediaanQty AS TotalQty,
          Persediaan.PersediaanRp AS TotalRupiah
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
          LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId
          ORDER BY Persediaan.PersediaanDDMY DESC,Persediaan.PersediaanHMS DESC `;
};
export const queryGetPersediaanDate = (startDate, endDate) => {
  let query = `SELECT 
               Persediaan.PersediaanId,
               Persediaan.PersediaanDDMY,
               Persediaan.PersediaanHMS,
               Product.ProductName,
               Product.ProductPriceBeli,
               Category.CategoryName,
               Supplier.SupplierName,
               Persediaan.PersediaanRp,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanInfo
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colPersediaanProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with valstartDate - endDate
  query += `WHERE ${tableName}.${colPersediaanDDMY} BETWEEN  '${startDate}' AND '${endDate}' `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC `;
  return query;
};

// reference product
export const queryGetPersediaanProductRow = (valPersediaanProductId) => {
  return `SELECT
          COUNT(Persediaan.PersediaanProductId) AS TotalProduct
          FROM Persediaan
          WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} `;
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
export const queryGetPersediaanProductId2 = (valPersediaanProductId) => {
  let query = `SELECT 
               Persediaan.PersediaanId,
               Persediaan.PersediaanDDMY,
               Persediaan.PersediaanHMS,
               Persediaan.PersediaanProductId,
               Product.ProductName,
               Product.ProductPriceBeli,
               Category.CategoryName,
               Supplier.SupplierName,
               Persediaan.PersediaanRp,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanInfo
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colPersediaanProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with valPersediaanProductId
  query += `WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC `;
  return query;
};
export const queryGetPersediaanDateProductId = (
  valStartDate,
  valEndDate,
  valProductId
) => {
  // table persediaan and sum persediaanqtyandtotalrp
  let query = `SELECT
               Persediaan.PersediaanId,
               Persediaan.PersediaanDDMY,
               Persediaan.PersediaanHMS,
               Persediaan.PersediaanProductId,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanRp, 
               Persediaan.PersediaanInfo, `;
  //  table product
  query += `Product.ProductName,
            Product.ProductPriceBeli, `;
  // table category
  query += `Category.CategoryName, `;
  //table supplier
  query += `Supplier.SupplierName `;
  // from table and left join
  query += `FROM Persediaan
            LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
            LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
            LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // with between date
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${valStartDate}' AND '${valEndDate}'
                  AND Persediaan.PersediaanProductId = ${valProductId} `;
  // with order persediaaddmy and date  desc
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,
               Persediaan.PersediaanHMS DESC`;
  return query;
};
export const queryGetPersediaanProductReport = () => {
  return `SELECT
          Persediaan.PersediaanDDMY,
          Persediaan.PersediaanHMS, 
          Product.ProductName, 
          Product.ProductPriceBeli AS HargaBeli,
          Persediaan.PersediaanQty,
          Persediaan.PersediaanRp
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC`;
};
export const queryGetPersediaanProductGroup = () => {
  return `SELECT
          Product.ProductName,
          Product.ProductPriceBeli,
          SUM(Persediaan.PersediaanQty) AS TotalQty,
          SUM(Persediaan.PersediaanRp) AS TotalRp
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          GROUP BY Persediaan.PersediaanProductId
          ORDER BY Product.ProductName ASC`;
};

// reference category
export const queryGetPersediaanCategoryId = (valCategoryId) => {
  let query = `SELECT 
               Persediaan.PersediaanId,
               Persediaan.PersediaanDDMY,
               Persediaan.PersediaanHMS,
               Product.ProductName,
               Product.ProductPriceBeli,
               Category.CategoryName,
               Supplier.SupplierName,
               Persediaan.PersediaanRp,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanInfo
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colPersediaanProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with valCategoryId
  query += `WHERE Category.CategoryId = ${valCategoryId} `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC `;
  return query;
};
export const queryGetPersediaanCategoryGroup = () => {
  return `SELECT
          Category.CategoryId,
          Category.CategoryName,
          SUM(Persediaan.PersediaanRp) AS TotalRp
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
          WHERE Category.CategoryId IS NOT NULL
          GROUP BY Category.CategoryId`;
};
export const queryGetPersediaanDateCategoryId = (
  valStartDate,
  valEndDate,
  valCategoryId
) => {
  let query = `SELECT
               Persediaan.PersediaanId,
               Persediaan.PersediaanDDMY,
               Persediaan.PersediaanHMS,
               Persediaan.PersediaanProductId,
               Product.ProductName,
               Product.ProductPriceBeli,
               Category.CategoryName,
               Supplier.SupplierName,
               Persediaan.PersediaanRp,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanInfo
               FROM Persediaan `;
  // with left join table 2
  query += `LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
            LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
            LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // with between date and supplier id
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${valStartDate}' AND '${valEndDate}' `;
  // with category id
  query += `AND Category.CategoryId = ${valCategoryId} `;
  // with order persediaan date desc
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,
            Persediaan.PersediaanHMS DESC`;
  return query;
};
export const queryGetPersediaanDateRpCategoryId = (
  startDate,
  endDate,
  valCategoryId
) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM ${tableName} 
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  //  with valstartDate - endDate
  query += `WHERE ${tableName}.${colPersediaanDDMY} BETWEEN '${startDate}' AND '${endDate}' `;
  // with supplier id
  query += `AND Product.ProductCategoryId = ${valCategoryId}`;
  return query;
};

// reference suppliers
export const queryGetPersediaanSupplierGroup = () => {
  return `SELECT
          Supplier.SupplierName,
          SUM(Persediaan.PersediaanQty) AS TotalQty,
          SUM(Persediaan.PersediaanRp) AS TotalRp
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId
          WHERE Supplier.SupplierId IS NOT NULL
          GROUP BY Supplier.SupplierId`;
};
export const queryGetPersediaanDateSupplierId = (
  valStartDate,
  valEndDate,
  valSupplierId
) => {
  let query = `SELECT
               Persediaan.PersediaanId,
               Persediaan.PersediaanDDMY,
               Persediaan.PersediaanHMS,
               Persediaan.PersediaanProductId,
               Product.ProductName,
               Product.ProductPriceBeli,
               Category.CategoryName,
               Supplier.SupplierName,
               Persediaan.PersediaanRp,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanInfo
               FROM Persediaan `;
  // with left join table 2
  query += `LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
            LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
            LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // with between date and supplier id
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${valStartDate}' AND '${valEndDate}'
                  AND Supplier.SupplierId = ${valSupplierId} `;
  // with order persediaan date desc
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,
            Persediaan.PersediaanHMS DESC`;
  return query;
};
export const queryGetPersediaanDateRpSupplierId = (
  startDate,
  endDate,
  valSupplierId
) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM ${tableName} 
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  //  with valstartDate - endDate
  query += `WHERE ${tableName}.${colPersediaanDDMY} BETWEEN '${startDate}' AND '${endDate}' `;
  // with supplier id
  query += `AND Product.ProductSupplierId = ${valSupplierId}`;
  return query;
};
export const queryGetPersediaanSupplierId = (valSupplierId) => {
  let query = `SELECT 
               Persediaan.PersediaanId,
               Persediaan.PersediaanDDMY,
               Persediaan.PersediaanHMS,
               Product.ProductName,
               Product.ProductPriceBeli,
               Category.CategoryName,
               Supplier.SupplierName,
               Persediaan.PersediaanRp,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanInfo
               FROM ${tableName}
               LEFT JOIN Product ON ${tableName}.${colPersediaanProductId} = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with valCategoryId
  query += `WHERE Supplier.SupplierId = ${valSupplierId} `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC `;
  return query;
};

// qty
export const queryGetPersediaanQty = (valPersediaanProductId) => {
  let query = `SELECT
               SUM(Persediaan.PersediaanQty) AS TotalQty
               FROM Persediaan `;
  if (valPersediaanProductId !== "") {
    query += `WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} `;
  }
  return query;
};
export const queryGetPersediaanQty2 = (
  valPersediaanId,
  valPersediaanProductId
) => {
  let query = `SELECT
               SUM(Persediaan.PersediaanQty) AS TotalQty
               FROM Persediaan `;
  //with persediaanproductid
  query += `WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} AND `;
  query += `Persediaan.PersediaanId != ${valPersediaanId} `;
  return query;
};
export const queryGetPersediaanDateQtyProductId = (
  valStartDate,
  valEndDate,
  valProductId
) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanQty) AS TotalQty
               FROM ${tableName} `;
  //  with valstartDate - endDate
  query += `WHERE ${tableName}.${colPersediaanDDMY} BETWEEN  '${valStartDate}' AND '${valEndDate}' `;
  // with valProductId
  query += `AND Persediaan.PersediaanProductId = ${valProductId}`;
  return query;
};

// totalrp
export const queryGetPersediaanRpSum = () => {
  let query = `SELECT
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan `;
  return query;
};
export const queryGetPersediaanRpSumProductId = (valPersediaanProductId) => {
  let query = `SELECT
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan `;
  query += `WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId}`;
  return query;
};
export const queryGetPersediaanRpSumCategoryId = (valCategoryId) => {
  let query = `SELECT
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan 
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId `;
  query += `WHERE Category.CategoryId = ${valCategoryId}`;
  return query;
};
export const queryGetPersediaanRpSumSupplierId = (valSupplierId) => {
  let query = `SELECT
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan 
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  query += `WHERE Product.ProductSupplierId = ${valSupplierId}`;
  return query;
};
export const queryGetPersediaanCategorySum = () => {
  return `SELECT
          SUM(Persediaan.PersediaanRp) AS TotalRp
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
          WHERE Category.CategoryId IS NOT NULL `;
};
export const queryGetPersediaanSupplierSum = () => {
  return `SELECT
          SUM(Persediaan.PersediaanRp) AS TotalRp
          FROM Persediaan
          LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
          LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId
          WHERE Supplier.SupplierId IS NOT NULL `;
};
export const queryGetPersediaanDateSumProduct = (
  startDate,
  endDate,
  valProductId
) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM ${tableName} `;
  //  with valstartDate - endDate
  query += `WHERE ${tableName}.${colPersediaanDDMY} BETWEEN  '${startDate}' AND '${endDate}' `;
  // with product id
  query += `AND Persediaan.PersediaanProductId = ${valProductId}`;
  return query;
};
export const queryGetPersediaanDateSUM = (startDate, endDate) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM ${tableName} `;
  //  with valstartDate - endDate
  query += `WHERE ${tableName}.${colPersediaanDDMY} BETWEEN  '${startDate}' AND '${endDate}' `;
  return query;
};

// references order and cart
export const queryGetPersediaanTotalRow1 = (searchVal) => {
  let query = `SELECT
               COUNT(*) AS TotalRow
               FROM (
                SELECT
                Product.ProductId,
                SUM(Persediaan.PersediaanQty) AS TotalQty
                FROM Persediaan
                LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!'
                GROUP BY Persediaan.PersediaanProductId
                HAVING TotalQty >= 1
              ) AS SUBSQUERY `;
  return query;
};
export const queryGetPersediaanProductGroup1 = (
  searchVal,
  limitVal,
  offsetVal
) => {
  let query = `SELECT
               Persediaan.PersediaanProductId,
               Product.ProductName,
               Product.ProductPriceJual,
               Product.ProductImage,
               SUM(Persediaan.PersediaanQty) AS TotalQty
               FROM Persediaan `;
  // left join, group, order
  query += `LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  // with search AND PRODUCT IS STILL EXIST
  if (searchVal !== "") {
    query += `WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  // with group,HAVING  order
  query += `GROUP BY Persediaan.PersediaanProductId
            HAVING TotalQty >= 1
            ORDER BY Product.ProductName ASC `;
  // offset limit, for pagination
  query += `LIMIT ${limitVal}
            OFFSET ${offsetVal}`;
  return query;
};

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
export const queryDeletePersediaanAll = () => {
  return `DELETE
          FROM ${tableName}`;
};
export const queryDeletePersediaanProductId = (valProductId) => {
  return `DELETE
          FROM Persediaan
          WHERE Persediaan.PersediaanProductId = ${valProductId}`;
};

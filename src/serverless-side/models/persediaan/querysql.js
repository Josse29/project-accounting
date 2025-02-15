// DELETE
const queryDeletePersediaan = (valPersediaanId) => {
  let query = `DELETE
                 FROM Persediaan
                 WHERE PersediaanId = ${valPersediaanId}`;
  return query;
};
const queryDeletePersediaanAll = () => {
  return `DELETE
            FROM Persediaan`;
};
const queryDeletePersediaanProductId = (valProductId) => {
  return `DELETE
            FROM Persediaan
            WHERE Persediaan.PersediaanProductId = ${valProductId}`;
};
const queryDeletePersediaanCategoryId = (categoryId) => {
  return `DELETE
            FROM Persediaan
            WHERE Persediaan.PersediaanProductId = ${categoryId}`;
};
// READ
const queryGetPersediaan = (searchVal, limitVal, offsetStartVal) => {
  let query = `SELECT 
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo,
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBuy,
                 Product.ProductPriceSell,
                 Category.CategoryName,
                 USer.UserFullname
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  //  with searhing value
  if (searchVal !== "") {
    query += `WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!' OR
                      Category.CategoryName LIKE '%${searchVal}%' ESCAPE '!' OR
                      User.UserFullname LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  // with order limit offset
  query += `ORDER BY 
              Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC
            LIMIT ${limitVal} 
            OFFSET ${offsetStartVal}`;
  return query;
};
const queryGetPersediaanCategoryId = (valCategoryId) => {
  let query = `SELECT 
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo,
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBuy,
                 Category.CategoryName,
                 User.Userfullname
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  //  with valCategoryId
  query += `WHERE Category.CategoryId = ${valCategoryId} `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC `;
  return query;
};
const queryGetPersediaanDate = (startDate, endDate) => {
  let query = `SELECT 
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo,
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBuy,
                 Category.CategoryName,
                 User.Userfullname
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  //  with valstartDate - endDate
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN  '${startDate}' AND '${endDate}' `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, 
                     Persediaan.PersediaanHMS DESC `;
  return query;
};
const queryGetPersediaanDateCategoryId = (
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
                 Product.ProductPriceBuy,
                 Category.CategoryName,
                 User.Userfullname,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo
                 FROM Persediaan `;
  // with left join table 2
  query += `LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
              LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
              LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  // with between date and supplier id
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${valStartDate}' AND '${valEndDate}' `;
  // with category id
  query += `AND Category.CategoryId = ${valCategoryId} `;
  // with order persediaan date desc
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,
              Persediaan.PersediaanHMS DESC`;
  return query;
};
const queryGetPersediaanDateProductId = (
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
              Product.ProductPriceBuy, `;
  // table category
  query += `Category.CategoryName, `;
  //table supplier
  query += `User.Userfullname `;
  // from table and left join
  query += `FROM Persediaan
              LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
              LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
              LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  // with between date
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${valStartDate}' AND '${valEndDate}'
              AND Persediaan.PersediaanProductId = ${valProductId} `;
  // with order persediaaddmy and date  desc
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,
                       Persediaan.PersediaanHMS DESC`;
  return query;
};
const queryGetPersediaanDateSupplierId = (
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
                 Product.ProductPriceBuy,
                 Category.CategoryName,
                 User.Userfullname,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo
                 FROM Persediaan `;
  // with left join table 2
  query += `LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
              LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
              LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  // with between date and supplier id
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${valStartDate}' AND '${valEndDate}'
                    AND User.UserId = ${valSupplierId} `;
  // with order persediaan date desc
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,
              Persediaan.PersediaanHMS DESC`;
  return query;
};
const queryGetPersediaanGroupCategory = (startDateVal, endDateVal) => {
  let query = `SELECT
               Category.CategoryId,
               Category.CategoryName,
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               WHERE Category.CategoryId IS NOT NULL `;
  // with between date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `AND Persediaan.PersediaanDDMY BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // grouping
  query += `GROUP BY Category.CategoryId 
            ORDER BY Category.CategoryName ASC `;
  return query;
};
const queryGetPersediaanGroupProduct = (searchVal, limitVal, offsetVal) => {
  let query = `SELECT
               Persediaan.PersediaanProductId,
               Product.ProductName,
               Product.ProductImage,
               Product.ProductPriceBuy AS PriceBuy,
               Product.ProductPriceJual AS PriceSell,
               SUM(Persediaan.PersediaanQty) AS TotalQty
               FROM Persediaan `;
  // left join, group, order
  query += `LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  // with search AND PRODUCT IS STILL EXIST
  if (searchVal !== "") {
    query += `WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  // with group,HAVING
  query += `GROUP BY Persediaan.PersediaanProductId 
            HAVING TotalQty >= 1 `;
  // offset limit, for pagination order
  query += `ORDER BY Product.ProductName ASC 
            LIMIT ${limitVal}
            OFFSET ${offsetVal}`;
  return query;
};

const queryGetPersediaanGroupProduct1 = (startDateVal, endDateVal) => {
  let query = `SELECT
                   Product.ProductName,
                   Product.ProductPriceBuy,
                   SUM(Persediaan.PersediaanQty) AS TotalQty,
                   SUM(Persediaan.PersediaanRp) AS TotalRp
                   FROM Persediaan
                   LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  // with between date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${startDateVal}' AND '${endDateVal}'`;
  }
  // order
  query += `GROUP BY Persediaan.PersediaanProductId
            ORDER BY Product.ProductName ASC`;
  return query;
};
const queryGetPersediaanGroupSupplier = (startDateVal, endDateVal) => {
  let query = `SELECT
               User.Userfullname,
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
               LEFT JOIN User ON Product.ProductSupplierId = User.UserId 
               WHERE User.UserId IS NOT NULL `;
  if (startDateVal !== "" && endDateVal !== "") {
    query += `AND Persediaan.PersediaanDDMY BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // group
  query += `GROUP BY User.UserId 
            ORDER BY User.Userfullname ASC `;
  return query;
};
const queryGetPersediaanPagination = (searchVal) => {
  let query = `SELECT COUNT(*)
                 AS TOTAL_ROW
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  if (searchVal !== "") {
    //  with searhing value
    query += `WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${searchVal}%' ESCAPE '!' OR
                    USer.UserFullname LIKE '%${searchVal}%' ESCAPE '!'
   `;
  }
  return query;
};
const queryGetPersediaanPagination1 = (searchVal) => {
  let query = `SELECT
               COUNT(*) AS TOTAL_ROW 
               FROM `;
  // subquery
  query += `(
              SELECT
              Product.ProductId,
              SUM(Persediaan.PersediaanQty) AS TotalQty
              FROM Persediaan
                LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!'
                GROUP BY Persediaan.PersediaanProductId
                HAVING TotalQty >= 1
            ) AS SUBSQUERY`;
  return query;
};
const queryGetPersediaanProductId = (valPersediaanProductId) => {
  const query = `SELECT
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanQty
                 FROM Persediaan
                 WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId}
                 ORDER BY Persediaan.PersediaanDDMY DESC, 
                Persediaan.PersediaanHMS DESC `;
  return query;
};
const queryGetPersediaanProductId1 = (valPersediaanProductId) => {
  let query = `SELECT 
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo,
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBuy,
                 Category.CategoryName,
                 User.Userfullname
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  //  with valPersediaanProductId
  query += `WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC `;
  return query;
};
const queryGetPersediaanProductRow = (valPersediaanProductId) => {
  let query = `SELECT
                 COUNT(Persediaan.PersediaanProductId) AS TotalRow
                 FROM Persediaan
                 WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} `;
  return query;
};
const queryGetPersediaanQty2 = (valPersediaanId, valPersediaanProductId) => {
  let query = `SELECT
                 SUM(Persediaan.PersediaanQty) AS TotalQty
                 FROM Persediaan `;
  //with persediaanproductid
  query += `WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} AND `;
  query += `Persediaan.PersediaanId != ${valPersediaanId} `;
  return query;
};
const queryGetPersediaanReport = (startDateVal, endDateVal) => {
  let query = `SELECT
               Persediaan.PersediaanDDMY AS Tanggal,
               Persediaan.PersediaanHMS AS Waktu, 
               Product.ProductName AS NamaProduk,
               Category.CategoryName AS Kategori, 
               Product.ProductPriceBuy AS HargaBeli,
               User.Userfullname AS Supplier,  
               Persediaan.PersediaanQty AS TotalQty,
               Persediaan.PersediaanRp AS TotalRupiah
               FROM Persediaan
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  // with date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // with order by
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,Persediaan.PersediaanHMS DESC `;
  return query;
};

const queryGetPersediaanReport1 = (startDateVal, endDateVal) => {
  let query = `SELECT
               Persediaan.PersediaanDDMY,
               Persediaan.PersediaanHMS, 
               Product.ProductName, 
               Product.ProductPriceBuy AS HargaBeli,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanRp
               FROM Persediaan
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  // with between date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${startDateVal}' AND '${endDateVal}'`;
  }
  // order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC`;
  return query;
};
const queryGetPersediaanSumPrice = () => {
  let query = `SELECT
               SUM(PersediaanRp) AS TotalRp
               FROM Persediaan `;
  return query;
};
const queryGetPersediaanSumPriceCategoryId = (valCategoryId) => {
  let query = `SELECT
                 SUM(Persediaan.PersediaanRp) AS TotalRp
                 FROM Persediaan 
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId `;
  query += `WHERE Category.CategoryId = ${valCategoryId}`;
  return query;
};
const queryGetPersediaanSumPriceDate = (startDate, endDate) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan `;
  //  with valstartDate - endDate
  if (startDate !== "" && endDate !== "") {
    query += `WHERE Persediaan.PersediaanDDMY BETWEEN  '${startDate}' AND '${endDate}' `;
  }
  return query;
};
const queryGetPersediaanSumPriceDateCategoryId = (
  startDate,
  endDate,
  valCategoryId
) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan 
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  //  with valstartDate - endDate
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${startDate}' AND '${endDate}' `;
  // with supplier id
  query += `AND Product.ProductCategoryId = ${valCategoryId}`;
  return query;
};
const queryGetPersediaanSumPriceDateSupplierId = (
  startDate,
  endDate,
  valSupplierId
) => {
  let query = `SELECT 
                 SUM(Persediaan.PersediaanRp) AS TotalRp
                 FROM Persediaan 
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  //  with valstartDate - endDate
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${startDate}' AND '${endDate}' `;
  // with supplier id
  query += `AND Product.ProductSupplierId = ${valSupplierId}`;
  return query;
};
const queryGetPersediaanSumPriceSupplierId = (supplierIdVal) => {
  const query = `SELECT
                 SUM(Persediaan.PersediaanRp) AS TotalRp
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN User ON Product.ProductSupplierId = User.UserId
                 WHERE User.UserId IS NOT NULL 
                       AND User.UserId = ${supplierIdVal}`;
  return query;
};
const queryGetPersediaanSumQty = (valPersediaanProductId) => {
  let query = `SELECT
               PersediaanProductId,
               COALESCE(SUM(PersediaanQty), 0) AS TotalQty
               FROM Persediaan `;
  if (valPersediaanProductId !== "") {
    query += `WHERE PersediaanProductId = ${valPersediaanProductId} `;
  }
  return query;
};
const queryGetPersediaanSumQtyDateProductId = (
  valStartDate,
  valEndDate,
  valProductId
) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanQty) AS TotalQty
               FROM Persediaan `;
  //  with valstartDate - endDate
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN  '${valStartDate}' AND '${valEndDate}' `;
  // with valProductId
  query += `AND Persediaan.PersediaanProductId = ${valProductId}`;
  return query;
};
const queryGetPersediaanSupplierId = (valSupplierId) => {
  let query = `SELECT 
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo,
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBuy,
                 Category.CategoryName,
                 User.Userfullname
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  //  with supplier id
  query += `WHERE User.UserId = ${valSupplierId} `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC `;
  return query;
};
// CREATE
const queryInsertPersediaan = (
  valPersediaanDDMY,
  valPersediaanHMS,
  valPersediaanProductId,
  valPersediaanQty,
  valPersediaanRp,
  valPersediaanInfo
) => {
  let query = `
  INSERT 
  INTO Persediaan
  (PersediaanDDMY,PersediaanHMS,PersediaanProductId,PersediaanQty,PersediaanRp,PersediaanInfo)
  VALUES 
  ('${valPersediaanDDMY}', '${valPersediaanHMS}','${valPersediaanProductId}','${valPersediaanQty}','${valPersediaanRp}','${valPersediaanInfo}')
  `;
  return query;
};
const queryInsertPersediaan1 = (req) => {
  const {
    PersediaanYMDVal,
    PersediaanHMSVal,
    PersediaanQtyVal,
    PersediaanTotalVal,
    PersediaanInfoVal,
    PersediaanProductIdVal,
    PersediaanPersonIdVal,
  } = req;
  let query = `
  INSERT 
  INTO Persediaan 
  (PersediaanDDMY, PersediaanHMS, PersediaanQty, PersediaanRp, PersediaanInfo, PersediaanProductId,PersediaanPersonId) 
  VALUES
  ('${PersediaanYMDVal}', '${PersediaanHMSVal}',${PersediaanQtyVal}, ${PersediaanTotalVal}, '${PersediaanInfoVal}', ${PersediaanProductIdVal},
  ${PersediaanPersonIdVal})
  `;
  return query;
};
// 3.UPDATE
const queryUpdatePersediaan = (
  valPersediaanId,
  valPersediaanDDMY,
  valPersediaanHMS,
  valPersediaanProductId,
  valPersediaanQty,
  valPersediaanRp,
  valPersediaanInfo
) => {
  return `UPDATE
            Persediaan
            SET PersediaanDDMY = '${valPersediaanDDMY}',
                PersediaanHMS = '${valPersediaanHMS}',
                PersediaanProductId = ${valPersediaanProductId},
                PersediaanQty = ${valPersediaanQty},
                PersediaanRp = ${valPersediaanRp},
                PersediaanInfo = '${valPersediaanInfo}'
            WHERE PersediaanId = ${valPersediaanId}`;
};

export {
  queryDeletePersediaan,
  queryDeletePersediaanAll,
  queryDeletePersediaanProductId,
  queryGetPersediaan,
  queryGetPersediaanCategoryId,
  queryGetPersediaanDate,
  queryGetPersediaanDateCategoryId,
  queryGetPersediaanDateProductId,
  queryGetPersediaanDateSupplierId,
  queryGetPersediaanGroupCategory,
  queryGetPersediaanGroupProduct,
  queryGetPersediaanGroupProduct1,
  queryGetPersediaanGroupSupplier,
  queryGetPersediaanPagination,
  queryGetPersediaanPagination1,
  queryGetPersediaanProductId,
  queryGetPersediaanProductId1,
  queryGetPersediaanProductRow,
  queryGetPersediaanQty2,
  queryGetPersediaanReport,
  queryGetPersediaanReport1,
  queryGetPersediaanSumPrice,
  queryGetPersediaanSumPriceCategoryId,
  queryGetPersediaanSumPriceDate,
  queryGetPersediaanSumPriceDateCategoryId,
  queryGetPersediaanSumPriceDateSupplierId,
  queryGetPersediaanSumPriceSupplierId,
  queryGetPersediaanSumQty,
  queryGetPersediaanSumQtyDateProductId,
  queryGetPersediaanSupplierId,
  queryInsertPersediaan,
  queryInsertPersediaan1,
  queryUpdatePersediaan,
};

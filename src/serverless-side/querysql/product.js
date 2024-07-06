// create-table
export const createTable = () => {
  return `CREATE TABLE Product (
            ProductId INTEGER PRIMARY KEY AUTOINCREMENT,
            ProductName VARCHAR(255),
            ProductImage BLOB,
            ProductInfo TEXT,
            ProductPrice REAL,
            ProductCategoryId INTEGER, 
            ProductSupplierId INTEGER,
            FOREIGN KEY (ProductCategoryId) REFERENCES Category(CategoryId)
            FOREIGN KEY (ProductSupplierId) REFERENCES Supplier(SupplierId)
            );`;
};

// init table & column
const tableName = `Product`;
const colProductId = `ProductId`;
const colProductName = `ProductName`;
const colProductCategoryId = `ProductCategoryId`;
const colProductPrice = `ProductPrice`;
const colProductInfo = `ProductInfo`;
const colProductImg = `ProductImage`;
const colSupplierId = `ProductSupplierId`;

// 1.CREATE
export const queryinsertProducts = (
  productName,
  productPrice,
  productInfo,
  productImg,
  productCategoryId,
  productSupplierId
) => {
  return `INSERT 
          INTO ${tableName} 
          (${colProductName}, ${colProductPrice}, ${colProductInfo}, ${colProductImg}, ${colProductCategoryId}, ${colSupplierId}) 
          VALUES 
          ('${productName}', ${productPrice}, '${productInfo}', '${productImg}', ${productCategoryId}, ${productSupplierId})`;
};
// 2.READ
export const queryGetProducts = (
  productSearch,
  productLimit,
  productOffset
) => {
  let query = `SELECT *
               FROM ${tableName}
               LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
               LEFT JOIN Supplier ON ${tableName}.${colSupplierId} = Supplier.SupplierId `;
  //  with search value
  if (productSearch !== "") {
    query += `WHERE ${tableName}.ProductName LIKE '%${productSearch}%' ESCAPE '!' OR
                    ${tableName}.ProductPrice LIKE '%${productSearch}%' ESCAPE '!' OR
                    ${tableName}.ProductInfo LIKE '%${productSearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${productSearch}%' ESCAPE '!' OR 
                    Supplier.SupplierName LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  // witth order limit offset
  query += `ORDER BY ${tableName}.${colProductName} ASC
            LIMIT ${productLimit} 
            OFFSET ${productOffset}`;
  return query;
};
export const queryGetListProduct = (productSearch) => {
  let query = `SELECT 
               ${tableName}.${colProductId},
               ${tableName}.${colProductName},
               ${tableName}.${colProductPrice}
               FROM ${tableName}
               LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
               LEFT JOIN Supplier ON ${tableName}.${colSupplierId} = Supplier.SupplierId `;
  //  with search value
  if (productSearch !== "") {
    query += `WHERE ${tableName}.${colProductName} LIKE '%${productSearch}%' ESCAPE '!' OR
                    ${tableName}.${colProductPrice} LIKE '%${productSearch}%' ESCAPE '!' OR
                    ${tableName}.${colProductInfo} LIKE '%${productSearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${productSearch}%' ESCAPE '!' OR 
                    Supplier.SupplierName LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  query += `ORDER BY ${tableName}.${colProductName} ASC `;
  return query;
};
export const queryTotalRowProducts = (productSearch) => {
  let query = `SELECT COUNT(${colProductId}) 
               AS TOTAL_ROW
               FROM ${tableName}
               LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
               LEFT JOIN Supplier ON ${tableName}.${colSupplierId} = Supplier.SupplierId `;
  // with search value product
  if (productSearch !== "") {
    query += `WHERE ${tableName}.${colProductName} LIKE '%${productSearch}%' ESCAPE '!' OR 
                    ${tableName}.${colProductPrice} LIKE '%${productSearch}%' ESCAPE '!' OR 
                    ${tableName}.${colProductInfo} LIKE '%${productSearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${productSearch}%' ESCAPE '!' OR 
                    Supplier.SupplierName LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  return query;
};

// 3.UPDATE
export const queryUpdateProduct = (
  productId,
  productName,
  productPrice,
  productInfo,
  productImg,
  productCategoryId,
  productSupplierId
) => {
  let query = `UPDATE ${tableName}
               SET ${colProductName} = '${productName}',
                   ${colProductCategoryId} = ${productCategoryId},
                   ${colProductPrice} = '${productPrice}',
                   ${colProductInfo} = '${productInfo}',
                   ${colSupplierId} = ${productSupplierId} `;
  //with image
  if (productImg !== "") {
    query += `,
              ${colProductImg} = '${productImg}' `;
  }
  query += `WHERE ${colProductId} = ${productId} `;
  return query;
};
// 4. DELETE
export const queryDeleteProductId = (id) => {
  return `DELETE 
          FROM ${tableName} 
          WHERE ${colProductId} = ${id} `;
};

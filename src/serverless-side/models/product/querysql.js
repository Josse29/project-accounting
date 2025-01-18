// 1.CREATE
const queryinsertProducts = (
  productName,
  productPriceBuy,
  productPriceSell,
  productInfo,
  productCategoryId,
  productSupplierId,
  imgBase64
) => {
  let query = `
  INSERT 
  INTO Product 
  (ProductName, ProductPriceBuy, ProductPriceSell, ProductInfo, ProductCategoryId, ProductSupplierId, ProductImage) 
  VALUES
  ('${productName}', ${productPriceBuy}, ${productPriceSell}, '${productInfo}', ${productCategoryId}, ${productSupplierId},'${imgBase64}')
  `;
  return query;
};
// 2.READ
const queryGetProducts = (productSearch, productLimit, productOffset) => {
  let query = `SELECT
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceBuy,
               Product.ProductPriceSell,
               Product.ProductInfo,
               Product.ProductImage,
               Product.ProductCategoryId,
               Category.CategoryId,
               Category.CategoryName,
               Product.ProductSupplierId,
               User.UserId,
               User.UserFullname
               FROM Product
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  //  with search value
  if (productSearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${productSearch}%' ESCAPE '!' OR
                    Product.ProductPriceBuy LIKE '%${productSearch}%' ESCAPE '!' OR
                    Product.ProductPriceSell LIKE '%${productSearch}%' ESCAPE '!' OR
                    Product.ProductInfo LIKE '%${productSearch}%' ESCAPE '!' OR
                    Category.CategoryName LIKE '%${productSearch}%' ESCAPE '!' OR 
                    User.UserFullname LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  // witth order limit offset
  query += `ORDER BY Product.ProductName ASC
            LIMIT ${productLimit} 
            OFFSET ${productOffset}`;
  return query;
};
const queryGetListProduct = (productSearch) => {
  let query = `SELECT 
               Product.ProductId,
               Product.ProductName,
               Product.ProductPriceBuy,
               Product.ProductPriceSell
               FROM Product
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  //  with search value
  if (productSearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${productSearch}%' ESCAPE '!' OR
                      Product.ProductPriceBuy LIKE '%${productSearch}%' ESCAPE '!' OR
                      Product.ProductInfo LIKE '%${productSearch}%' ESCAPE '!' OR
                      Category.CategoryName LIKE '%${productSearch}%' ESCAPE '!' OR 
                      User.UserFullname LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  query += `ORDER BY Product.ProductName ASC `;
  return query;
};
const queryTotalRowProducts = (productSearch) => {
  let query = `SELECT COUNT(*) 
                 AS TOTAL_ROW
                 FROM Product
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN User ON Product.ProductSupplierId = User.UserId `;
  // with search value product
  if (productSearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${productSearch}%' ESCAPE '!' OR 
                      Product.ProductPriceBuy LIKE '%${productSearch}%' ESCAPE '!' OR 
                      Product.ProductInfo LIKE '%${productSearch}%' ESCAPE '!' OR
                      Category.CategoryName LIKE '%${productSearch}%' ESCAPE '!' OR 
                      User.UserFullname LIKE '%${productSearch}%' ESCAPE '!' `;
  }
  return query;
};
const queryGetProductPDF = () => {
  let query = `SELECT * FROM Product `;
  // ascending product name
  query += `ORDER BY Product.ProductName ASC`;
  return query;
};
const queryGetProductCSV = () => {
  let query = `SELECT 
               Product.ProductName AS ProductName,
               Product.ProductPriceBuy AS ProductPriceBuy,
               Product.ProductPriceSell AS ProductPriceSell,
               Supplier.SupplierName AS SupplieName,
               Category.CategoryName AS CategoryName
               FROM Product `;
  // left join table supplier
  query += `LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // left join table Category
  query += `LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId `;
  // ascending product name
  query += `ORDER BY Product.ProductName ASC`;
  return query;
};
// 3.UPDATE
const queryUpdateProduct = (
  productId,
  productName,
  productPriceBuy,
  productPriceSell,
  productCategoryId,
  productSupplierId,
  productInfo,
  imgBase64,
  productCancelImg
) => {
  let query = `UPDATE Product
                 SET ProductName = '${productName}',
                     ProductPriceBuy = ${productPriceBuy},
                     ProductPriceSell = ${productPriceSell},
                     ProductCategoryId = ${productCategoryId},
                     ProductSupplierId = ${productSupplierId}, 
                     ProductInfo = '${productInfo}' `;
  // condition image
  //  1. if remove image
  if (productCancelImg) {
    query += `, ProductImage = 'null' `;
  }
  //  2. if change image
  if (!productCancelImg && imgBase64 !== "null") {
    query += `, ProductImage = '${imgBase64}' `;
  }
  query += `WHERE ProductId = ${productId} `;
  return query;
};
// 4. DELETE
const queryDeleteProductId = (id) => {
  return `DELETE 
            FROM Product 
            WHERE ProductId = ${id} `;
};

export {
  queryDeleteProductId,
  queryGetListProduct,
  queryGetProductCSV,
  queryGetProductPDF,
  queryGetProducts,
  queryTotalRowProducts,
  queryUpdateProduct,
  queryinsertProducts,
};

// 1.CREATE
export const queryInsertCategory = (categoryName, categoryInfo) => {
  let query = `INSERT 
               INTO Category
               (CategoryName, CategoryInfo) 
               VALUES 
               ('${categoryName}', '${categoryInfo}')`;
  return query;
};
// 2.READ
export const queryGetCategory = (
  categorySearch,
  categoryLimit,
  categoryStartOffset
) => {
  // get all columns
  let query = `SELECT * , `;
  // group concate with product to get list product
  query += `(SELECT GROUP_CONCAT(Product.ProductName) FROM Product 
             WHERE Product.ProductCategoryId = Category.CategoryId) AS CategoryProductList `;
  query += `FROM Category `;
  //  with search value
  if (categorySearch !== "") {
    query += `WHERE CategoryName LIKE '%${categorySearch}%' ESCAPE '!' OR 
                    CategoryInfo LIKE '%${categorySearch}%' ESCAPE '!' `;
  }
  //  with limit, offset, order
  query += `ORDER BY CategoryName ASC
            LIMIT ${categoryLimit} 
            OFFSET ${categoryStartOffset}`;
  return query;
};
export const queryTotalRowCategory = (categorySearch) => {
  let query = `SELECT COUNT(*) AS TOTAL_ROW
               FROM Category `;
  // with search value categories
  if (categorySearch !== "") {
    query += `WHERE CategoryName LIKE '%${categorySearch}%' ESCAPE '!' OR 
                    CategoryInfo LIKE '%${categorySearch}%' ESCAPE '!' `;
  }
  return query;
};
export const queryGetListCategory = (categorySearch) => {
  let query = `SELECT *
               FROM Category( `;
  // with search value categories
  if (categorySearch !== "") {
    query += `WHERE CategoryName LIKE '%${categorySearch}%' ESCAPE '!' OR 
                    CategoryInfo LIKE '%${categorySearch}%' ESCAPE '!' `;
  }
  //  with limit, offset, order alphabet
  query += `ORDER BY CategoryName ASC`;
  return query;
};
// 3.UPDATE
export const queryUpdateCategory = (categoryId, categoryName, categoryInfo) => {
  let query = `UPDATE 
               Category
               SET CategoryName = '${categoryName}',
                   CategoryInfo = '${categoryInfo}'
               WHERE CategoryId = '${categoryId}'`;
  return query;
};
// 4.DELETE
export const queryDeleteCategory = (categoryId) => {
  let query = `DELETE 
               FROM Category
               WHERE CategoryId = '${categoryId}'`;
  return query;
};

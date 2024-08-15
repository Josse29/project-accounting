// create-table
// CREATE TABLE Category(
//     CategoryId integer primary key autoincrement,
//     CategoryName varchar(100),
//     CategoryInfo text
// );

// schema category
const tableName = `Category`;
const colCategoryId = `CategoryId`;
const colCategoryName = `CategoryName`;
const colCategoryInfo = `CategoryInfo`;

// 1.CREATE
export const queryInsertCategory = (categoryName, categoryInfo) => {
  return `INSERT 
          INTO ${tableName} 
          (${colCategoryName}, ${colCategoryInfo}) 
          VALUES 
          ('${categoryName}', '${categoryInfo}')`;
};
// 2.READ
export const queryGetCategory = (
  categorySearch,
  categoryLimit,
  categoryStartOffset
) => {
  let query = `SELECT * ,
               (SELECT GROUP_CONCAT(Product.ProductName) FROM Product
               WHERE Product.ProductCategoryId = ${tableName}.${colCategoryId})
               FROM ${tableName} `;
  //  with search value
  if (categorySearch !== "") {
    query += `WHERE ${colCategoryName} LIKE '%${categorySearch}%' ESCAPE '!' OR 
                    ${colCategoryInfo} LIKE '%${categorySearch}%' ESCAPE '!' `;
  }
  //  with limit, offset, order
  query += `ORDER BY ${colCategoryName} ASC
            LIMIT ${categoryLimit} 
            OFFSET ${categoryStartOffset}`;
  return query;
};
export const queryTotalRowCategory = (categorySearch) => {
  let query = `SELECT COUNT(${colCategoryId}) AS TOTAL_ROW
               FROM ${tableName} `;
  // with search value categories
  if (categorySearch !== "") {
    query += `WHERE ${colCategoryName} LIKE '%${categorySearch}%' ESCAPE '!' OR 
                    ${colCategoryInfo} LIKE '%${categorySearch}%' ESCAPE '!' `;
  }
  return query;
};
export const queryGetListCategory = (categorySearch) => {
  let query = `SELECT *
               FROM ${tableName} `;
  // with search value categories
  if (categorySearch !== "") {
    query += `WHERE ${colCategoryName} LIKE '%${categorySearch}%' ESCAPE '!' OR 
                    ${colCategoryInfo} LIKE '%${categorySearch}%' ESCAPE '!' `;
  }
  //  with limit, offset, order alphabet
  query += `ORDER BY ${colCategoryName} ASC`;
  return query;
};
// 3.UPDATE
export const queryUpdateCategory = (categoryId, categoryName, categoryInfo) => {
  return `UPDATE 
          ${tableName}
          SET ${colCategoryName} = '${categoryName}',
              ${colCategoryInfo} = '${categoryInfo}'
          WHERE ${colCategoryId} = '${categoryId}'`;
};
// 4.DELETE
export const queryDeleteCategory = (categoryId) => {
  return `DELETE 
          FROM ${tableName}
          WHERE ${colCategoryId} = '${categoryId}'`;
};

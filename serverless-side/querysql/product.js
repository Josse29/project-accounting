// create-table
// CREATE TABLE Product (
//     ProductId INTEGER PRIMARY KEY AUTOINCREMENT,
//     ProductName VARCHAR(255),
//     ProductImage BLOB,
//     ProductInfo TEXT,
//     ProductPrice REAL,
//     ProductCategoryId INTEGER, 
//     ProductSupplierId INTEGER,
//     FOREIGN KEY (ProductCategoryId) REFERENCES Category(CategoryId)
//     FOREIGN KEY (ProductSupplierId) REFERENCES Supplier(SupplierId)
// );
// ALTER TABLE table_name
// ADD column_name datatype;
// init table & column
const tableName = `Product`
const colProductId = `ProductId`
const colProductName = `ProductName`
const colProductCategoryId = `ProductCategoryId`
const colProductPrice = `ProductPrice`
const colProductInfo = `ProductInfo`
const colProductImg = `ProductImage`
const colSupplierId = `ProductSupplierId`

// 1.CREATE 
export const queryinsertProducts = (productName, productPrice, productInfo, productImg, productCategoryId, productSupplierId) => {
    return `INSERT 
            INTO ${tableName} 
            (${colProductName}, ${colProductPrice}, ${colProductInfo}, ${colProductImg}, ${colProductCategoryId}, ${colSupplierId}) 
            VALUES 
            ('${productName}', '${productPrice}', '${productInfo}', '${productImg}', ${productCategoryId}, ${productSupplierId})`;
};
// 2.READ
export const queryGetProducts = (searchProduct, limitProduct, offsetProduct) => {
    let query = `SELECT *
                 FROM ${tableName}
                 LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
                 WHERE Product.ProductName LIKE '%${searchProduct}%' 
                       OR Product.ProductPrice LIKE '%${searchProduct}%' 
                       OR Product.ProductInfo LIKE '%${searchProduct}%'
                       OR Category.CategoryName LIKE '%${searchProduct}%'
                ORDER BY ${tableName}.${colProductName} ASC 
                LIMIT ${limitProduct} 
                OFFSET ${offsetProduct}`
    return query
};
// let query = `SELECT *
//              FROM ${tableName}
//              LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId `
// with search value product
// if (searchProduct != "") {
//     query += `WHERE Product.ProductName LIKE '%${searchProduct}%' 
//                         OR Product.ProductPrice LIKE '%${searchProduct}%' 
//                         OR Product.ProductInfo LIKE '%${searchProduct}%'
//                         OR Category.CategoryName LIKE '%${searchProduct}%' `;
// }
// query += `ORDER BY ${tableName}.${colProductName} ASC 
//               LIMIT ${limitProduct} 
//               OFFSET ${offsetProduct}`

// console.log('value search product ' + searchProduct)
// console.log("Generated SQL Query:", query);
// return query

// SELECT *
// FROM Product
// LEFT JOIN Category ON  Product.ProductCategoryId = Category.CategoryId
// WHERE Product.ProductName LIKE '%boi%' OR
// Product.ProductPrice LIKE '%boi%' OR
// Product.ProductInfo LIKE '%boi%' OR
// Category.CategoryName LIKE '%boi%';

export const queryGetListProduct = () => {
    return `SELECT 
            ${tableName}.${colProductName}, ${tableName}.${colProductId}
            FROM ${tableName}
            LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
            ORDER BY ${tableName}.${colProductName} ASC`;
}


export const queryTotalRowProducts = (searchProduct) => {
    // without search value product
    if (searchProduct === "") {
        return `SELECT COUNT(${colProductId}) AS TOTAL_ROW
                FROM ${tableName}`
    }
    // with search value product
    if (searchProduct !== "") {
        return `SELECT COUNT(${colProductId}) AS TOTAL_ROW
                FROM ${tableName}
                LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
                WHERE ${tableName}.${colProductName} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                      ${tableName}.${colProductPrice} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                      ${tableName}.${colProductInfo} LIKE '%${searchProduct}%' ESCAPE '!' OR
                      Category.CategoryName LIKE '%${searchProduct}%'`
    }
};
// 3.UPDATE
export const queryUpdateProduct = (productId, productName, productCategoryId, productPrice, productInfo, productImg) => {
    // with image
    if (productImg !== "") {
        return `UPDATE ${tableName}
                SET ${colProductName} = '${productName}',
                    ${colProductCategoryId} = '${productCategoryId}',
                    ${colProductPrice} = '${productPrice}',
                    ${colProductInfo} = '${productInfo}',
                    ${colProductImg} = '${productImg}'
                WHERE ${colProductId} = '${productId}'`
    }
    // without image
    if (productImg === "") {
        return `UPDATE ${tableName}
                SET ${colProductName} = '${productName}',
                    ${colProductCategoryId} = '${productCategoryId}',
                    ${colProductPrice} ='${productPrice}',
                    ${colProductInfo} = '${productInfo}'
                WHERE ${colProductId} = '${productId}'`
    }
}
// 4. DELETE
export const queryDeleteProductId = (id) => {
    return `DELETE 
            FROM ${tableName} 
            WHERE ${colProductId} = ${id} `;
};



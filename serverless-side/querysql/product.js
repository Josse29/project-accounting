// create-table
// CREATE TABLE Product (
//     ProductId INTEGER PRIMARY KEY AUTOINCREMENT,
//     ProductName VARCHAR(255),
//     ProductImage BLOB,
//     ProductInfo TEXT,
//     ProductPrice REAL,
//     ProductCategoryId INTEGER, 
//     FOREIGN KEY (ProductCategoryId) REFERENCES Category(CategoryId)
//     );

// init table & column
const tableName = `Product`
const colProductId = `ProductId`
const colProductName = `ProductName`
const colProductCategoryId = `ProductCategoryId`
const colProductPrice = `ProductPrice`
const colProductInfo = `ProductInfo`
const colProductImg = `ProductImage`


// 1.CREATE 
export const queryinsertProducts = (name, price, productInfo, image, categoryId) => {
    return `INSERT 
            INTO ${tableName} 
            (${colProductName}, ${colProductPrice}, ${colProductInfo}, ${colProductImg}, ${colProductCategoryId}) 
            VALUES 
            ('${name}', '${price}', '${productInfo}', '${image}', '${categoryId}')`;
};

// 2.READ
export const queryGetProducts = (searchProduct, limitProduct, offsetProduct) => {
    // without search value product
    if (searchProduct === "") {
        return `SELECT *
                FROM ${tableName}
                LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
                ORDER BY ${tableName}.${colProductName} ASC 
                LIMIT ${limitProduct} 
                OFFSET ${offsetProduct}`;
    }
    // with search value product
    if (searchProduct !== "") {
        return `SELECT *
                FROM ${tableName}
                LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
                WHERE ${tableName}.${colProductName} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                      ${tableName}.${colProductPrice} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                      ${tableName}.${colProductInfo} LIKE '%${searchProduct}%' ESCAPE '!' 
                ORDER BY ${tableName}.${colProductName} ASC 
                LIMIT ${limitProduct} 
                OFFSET ${offsetProduct}`;
    }
};
export const queryGetListProduct = () => {
    return `SELECT *
            FROM ${tableName}
            LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
            ORDER BY ${tableName}.${colProductName} ASC`;
}
export const queryTotalRowProducts = (searchProduct) => {
    // without search value product
    if (searchProduct === "") {
        return `SELECT COUNT(*) AS TOTAL_ROW
                FROM ${tableName}`
    }
    // with search value product
    if (searchProduct !== "") {
        return `SELECT COUNT(*) AS TOTAL_ROW
                FROM ${tableName}
                LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
                WHERE ${tableName}.${colProductName} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                      ${tableName}.${colProductPrice} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                      ${tableName}.${colProductInfo} LIKE '%${searchProduct}%' ESCAPE '!'`
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



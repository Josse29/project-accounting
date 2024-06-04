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
const colProductPrice = `ProductPrice`
const colProductInfo = `ProductInfo`
const colProductImg = `ProductImage`
const colProductCategoryId = `ProductCategoryId`

// 1.CREATE 
export const queryinsertProducts = (name, price, productInfo, image, categoryId) => {
    return `INSERT 
            INTO ${tableName} 
                (${colProductName}, ${colProductPrice}, ${colProductInfo}, ${colProductImg}, ${colProductCategoryId}) 
            VALUES 
                ('${name}', '${price}', '${productInfo}', '${image}', '${categoryId}')`;
};

// 2.READ
export const queryGetProducts = (limitProduct, offsetProduct) => {
    return `SELECT *
            FROM ${tableName}
            LEFT JOIN Category ON ${tableName}.${colProductCategoryId} = Category.CategoryId
            ORDER BY ${tableName}.${colProductId} DESC 
            LIMIT ${limitProduct} 
            OFFSET ${offsetProduct}`;
};
export const queryTotalRowProducts = `SELECT COUNT(*) AS TOTAL_ROW FROM ${tableName}`;
export const querySearchProduct = (
    limitProduct,
    offsetProduct,
    searchProduct
) => {
    return `SELECT * FROM ${tableName}
            WHERE ${colProductName} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                  ${colProductPrice} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                  ${colProductInfo} LIKE '%${searchProduct}%' ESCAPE '!' 
            ORDER BY ID ASC 
            LIMIT ${limitProduct} 
            OFFSET ${offsetProduct}`;
};
export const querySearchTotalRowProducts = (searchProduct) => {
    return `SELECT COUNT(*) AS TOTAL_ROW 
            FROM  ${tableName} 
            WHERE ${colProductName} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                  ${colProductPrice} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                  ${colProductInfo} LIKE '%${searchProduct}%' ESCAPE '!'`;
};

// 3.UPDATE
export const queryUpdateProduct = (productId, productName, productPrice, productInfo, productImg) => {
    // with image
    if (productImg !== "") {
        return `UPDATE ${tableName}
            SET ${colProductName} = '${productName}',
                ${colProductPrice} = '${productPrice}',
                ${colProductInfo} = '${productInfo}',
                ${colProductImg} = '${productImg}'
            WHERE ${colProductId} = '${productId}'`
    }
    // without image
    if (productImg === "") {
        return `UPDATE ${tableName}
            SET ${colProductName} = '${productName}',
                ${colProductPrice} = '${productPrice}',
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



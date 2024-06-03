// init table & column
const tableName = `Products`
const colProductName = `ProductName`
const colProductPrice = `ProductPrice`
const colProductInfo = `ProductInfo`
const colProductImg = `ProductImage`
const colProductCategoryId = `CategoryId`

// 1.CREATE 
export const queryinsertProducts = (name, price, productInfo, image = "null", categoryId) => {
    // without image
    if (image === "null") {
        return `INSERT 
                INTO ${tableName} 
                (${colProductName}, ${colProductPrice}, ${colProductInfo}, ${colProductCategoryId}) 
                VALUES 
                ('${name}', '${price}', '${productInfo}', '${categoryId}' )`;
    }
    // with image
    if (image !== "null") {
        return `INSERT 
                INTO ${tableName} 
                (${colProductName}, ${colProductPrice}, ${colProductInfo}, ${colProductImg}, ${colProductCategoryId}) 
                VALUES ('${name}', '${price}', '${productInfo}', '${image}', '${categoryId}')`;
    }
};
// 2.READ

export const queryGetProductsJoin = () => {
    return `SELECT *
            from Products
            JOIN categories
            ON Products.CategoryId = categories.id `

}
export const queryGetProducts = (limitProduct, offsetProduct) => {
    return `SELECT * 
            FROM ${tableName} 
            ORDER BY ID DESC 
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

// 4. DELETE
export const queryDeleteProductId = (id) => {
    return `DELETE 
            FROM ${tableName} 
            WHERE id = ${id} `;
};



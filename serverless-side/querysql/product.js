const tableName = `Products`
const productName = `ProductName`
const productPrice = `ProductPrice`
const productInfo = `ProductInfo`
const productImg = `ProductImage`
const categoryId = `CategoryId`
// 1.CREATE 
export const queryinsertProducts = (name, price, keterangan, image = "") => {
    // without image
    if (image === "") {
        return `INSERT INTO ${tableName} (${productName}, ${productPrice}, ${productInfo}) 
                VALUES ('${name}','${price}','${keterangan}')`;
    }
    // with image
    if (image !== "") {
        return `INSERT INTO ${tableName} (${productName}, ${productPrice}, ${productInfo}, ${productImg}) 
                VALUES ('${name}','${price}','${keterangan}','${image}')`;
    }
};
// 2.READ
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
            WHERE ${productName} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                  ${productPrice} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                  ${productInfo} LIKE '%${searchProduct}%' ESCAPE '!' 
            ORDER BY ID ASC 
            LIMIT ${limitProduct} 
            OFFSET ${offsetProduct}`;
};
export const querySearchTotalRowProducts = (searchProduct) => {
    return `SELECT COUNT(*) AS TOTAL_ROW 
            FROM  ${tableName} 
            WHERE ${productName} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                  ${productPrice} LIKE '%${searchProduct}%' ESCAPE '!' OR 
                  ${productInfo} LIKE '%${searchProduct}%' ESCAPE '!'`;
};
// 3.UPDATE

// 4. DELETE
export const queryDeleteProductId = (id) => {
    return `DELETE 
            FROM ${tableName} 
            WHERE id = ${id} `;
};



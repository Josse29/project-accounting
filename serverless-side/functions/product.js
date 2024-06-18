import { queryDeleteProductId, queryGetListProduct, queryGetProducts, queryTotalRowProducts, queryUpdateProduct, queryinsertProducts } from "../querysql/product.js";

// 1.CREATE
export const insertProducts = (productName, productPrice, productInfo, productImg, productCategoryId, productSupplierId, callback) => {
    db.run(queryinsertProducts(productName, productPrice, productInfo, productImg, productCategoryId, productSupplierId), (err) => {
        if (!err) {
            return callback(true, `Product <b class='text-capitalize'>${name}</b> berhasil ditambahkan`);
        }
        if (err) {
            return callback(false, err);
        }
    });
};
// 2.READ
export const getProducts = (
    searchProduct,
    limitProduct,
    offsetProduct,
    callback
) => {
    const startOffsetProduct = (offsetProduct - 1) * limitProduct
    db.all(queryGetProducts(searchProduct, limitProduct, startOffsetProduct), (err, res) => {
        if (!err) {
            return callback(true, res);
        }
        if (err) {
            return callback(false, err);
        }
    });
};
export const getListProduct = (
    callback
) => {
    db.all(queryGetListProduct(), (err, res) => {
        if (!err) {
            return callback(true, res);
        }
        if (err) {
            return callback(false, err);
        }
    });

};
export const getTotalPageProduct = (limitProduct, searchVal, callback) => {
    db.each(queryTotalRowProducts(searchVal), (err, res) => {
        if (!err) {
            let lastPage;
            if (res.TOTAL_ROW % limitProduct === 0) {
                lastPage = parseInt(res.TOTAL_ROW) / parseInt(limitProduct);
            } else {
                lastPage = parseInt(parseInt(res.TOTAL_ROW) / parseInt(limitProduct)) + 1;
            }
            return callback(true, lastPage);
        }
        if (err) {
            return callback(false, err);
        }
    });

};
export const getTotalRowProduct = (searchVal, callback) => {
    db.each(queryTotalRowProducts(searchVal), (err, res) => {
        if (!err) {
            const totalProduct = parseInt(res.TOTAL_ROW);
            return callback(true, totalProduct);
        }
        if (err) {
            return callback(false, err);
        }
    });
}
// 3.UPDATE
export const updateProduct = (productId, productName, productCategoryId, productPrice, productInfo, productImg, callback) => {
    db.run(queryUpdateProduct(productId, productName, productCategoryId, productPrice, productInfo, productImg), (err) => {
        if (!err) {
            return callback(true, `Product <b class='text-capitalize'>${productName}</b> berhasil diperbaharui`)
        }
        if (err) {
            return callback(false, err)
        }
    })
}
// 4.DELETE
export const deleteProductId = (id, productName, callback) => {
    db.run(queryDeleteProductId(id), (err) => {
        if (!err) {
            return callback(true, `Product <b class='text-capitalize'>${productName}</b> berhasil dihapus`);
        }
        if (err) {
            return callback(false, err);
        }
    });
};
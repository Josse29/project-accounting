import { queryDeleteProductId, queryGetProducts, queryTotalRowProducts, queryUpdateProduct, queryinsertProducts } from "../querysql/product.js";

// 1.CREATE
export const insertProducts = (name, price, keterangan, image, categoryId, callback) => {
    db.run(queryinsertProducts(name, price, keterangan, image, categoryId), (err) => {
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
    let skipOffsetProduct = (offsetProduct - 1) * limitProduct;
    db.all(queryGetProducts(searchProduct, limitProduct, skipOffsetProduct), (err, res) => {
        if (!err) {
            return callback(true, res);
        }
        if (err) {
            return callback(false, err);
        }
    });

};
export const lastOffsetProducts = (limitProduct, searchVal, callback) => {
    db.each(queryTotalRowProducts(searchVal), (err, res) => {
        if (!err) {
            let lastOffset;
            if (res.TOTAL_ROW % limitProduct === 0) {
                lastOffset = parseInt(res.TOTAL_ROW) / parseInt(limitProduct);
            } else {
                lastOffset = parseInt(res.TOTAL_ROW / parseInt(limitProduct)) + 1;
            }
            return callback(true, lastOffset);
        }
        if (err) {
            return callback(false, err);
        }
    });

};
export const getTotalProduct = (searchVal, callback) => {
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
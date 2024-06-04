import { queryDeleteProductId, queryGetProducts, querySearchProduct, querySearchTotalRowProducts, queryTotalRowProducts, queryUpdateProduct, queryinsertProducts } from "../querysql/product.js";

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
    limitProduct,
    offsetProduct,
    searchProduct,
    callback
) => {
    let skipOffsetProduct = (offsetProduct - 1) * limitProduct;
    if (searchProduct !== "") {
        db.all(
            querySearchProduct(limitProduct, skipOffsetProduct, searchProduct),
            (err, res) => {
                if (!err) {
                    return callback(true, res);
                }
                if (err) {
                    return callback(false, err);
                }
            }
        );
    }
    if (searchProduct === "") {
        db.all(queryGetProducts(limitProduct, skipOffsetProduct), (err, res) => {
            if (!err) {
                return callback(true, res);
            }
            if (err) {
                return callback(false, err);
            }
        });
    }
};
export const lastOffsetProducts = (limitProduct, searchVal, callback) => {
    if (searchVal === "") {
        db.each(queryTotalRowProducts, (err, res) => {
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
    }
    if (searchVal !== "") {
        db.each(querySearchTotalRowProducts(searchVal), (err, res) => {
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
    }
};
// 3.UPDATE
export const updateProduct = (productId, productName, productPrice, productInfo, productImg, callback) => {
    db.run(queryUpdateProduct(productId, productName, productPrice, productInfo, productImg), (err) => {
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
            return callback(true, `Product <b class='text-capitalize'>${productName}</b> berhasil diperbaharui`);
        }
        if (err) {
            return callback(false, err);
        }
    });
};
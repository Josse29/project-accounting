import { queryGetProducts, querySearchProduct, querySearchTotalRowProducts, queryTotalRowProducts, queryinsertProducts } from "../querysql/product.js";

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
export const insertProducts = (name, price, keterangan, image, callback) => {
    db.run(queryinsertProducts(name, price, keterangan, image), (err) => {
        if (!err) {
            return callback(true, "berhasil ditambahkan");
        }
        if (err) {
            return callback(false, err);
        }
    });
};
export const deleteProductId = (id, callback) => {
    db.run(queryDeleteProductId(id), (err) => {
        if (!err) {
            return callback(true, "berhasil dihapus");
        }
        if (err) {
            return callback(false, err);
        }
    });
};
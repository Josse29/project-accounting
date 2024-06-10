import { queryDeleteSupplier, queryGetSupplier, queryInsertSupplier, queryTotalRowSupplier, queryUpdateSupplier } from "../querysql/supplier.js";


// 1.CREATE
export const createSupplier = (supplierName, supplierInfo, supplierImg, callback) => {
    db.run(queryInsertSupplier(supplierName, supplierInfo, supplierImg), (err) => {
        if (!err) {
            return callback(true, `Supplier <b class='text-capitalize'>${supplierName}</b> berhasil ditambahkan`)
        }
        if (err) {
            return callback(false, err)
        }
    });
}
// 2.READ
export const getSupplier = (callback) => {
    db.all(queryGetSupplier(), (err, res) => {
        if (!err) {
            return callback(true, res)
        }
        if (err) {
            return callback(false, err)
        }
    });
}
export const getTotalSupplier = (searchVal, callback) => {
    db.each(queryTotalRowSupplier(searchVal), (err, res) => {
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
export const updateSupplier = (supplierId, supplierName, supplierInfo, supplierImg, callback) => {
    db.run(queryUpdateSupplier(supplierId, supplierName, supplierInfo, supplierImg), (err) => {
        if (!err) {
            return callback(true, `Supplier <b>${supplierName}</b> berhasil diperbaharui`)
        }
        if (err) {
            return callback(false, err)
        }
    })
}
// 4.DELETE
export const deleteSupplier = (supplierId, supplierName, callback) => {
    db.run(queryDeleteSupplier(supplierId), (err) => {
        if (!err) {
            return callback(true, `Supplier <b class= 'text-capitalize'>${supplierName}</b> berhasil dihapus`)
        }
        if (err) {
            return callback(false, err)
        }
    });
}
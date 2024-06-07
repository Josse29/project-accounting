import { queryDeleteSupplier, queryGetSupplier, queryInsertSupplier, queryUpdateSupplier } from "../querysql/supplier.js";


// 1.CREATE
export const createSupplier = (supplierName, supplierInfo, callback) => {
    db.run(queryInsertSupplier(supplierName, supplierInfo), (err) => {
        if (!err) {
            return callback(true, `Supplier <b class='text-capitalize'>${supplierName}</b> berhasil ditambahkan`)
        }
        if (err) {
            return callback(false, `Supplier <b class='text-capitalize'>${supplierName}</b> gagal ditambahkan`)
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
// 3.UPDATE
export const updateSupplier = (supplierId, supplierName, supplierInfo, callback) => {
    db.run(queryUpdateSupplier(supplierId, supplierName, supplierInfo), (err) => {
        if (!err) {
            return callback(true, `Supplier <b>${supplierName}</b> berhasil diperbaharui`)
        }
        if (err) {
            return callback(false, `Supplier  <b>${supplierName}</b > gagal diperbaharui`)
        }
    })
}
// 4.DELETE
export const deleteSupplier = (supplierId, supplierName, callback) => {
    db.run(queryDeleteSupplier(supplierId), (err) => {
        if (!err) {
            return callback(true, `Supplier < b class= 'text-capitalize' > ${supplierName}</ > berhasil dihapus`)
        }
        if (err) {
            return callback(false, `Supplier < b class= 'text-capitalize' > ${supplierName}</ > gagal dihapus`)
        }
    });
}
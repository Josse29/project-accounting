import { queryDeleteSupplier, queryGetListSupplier, queryGetSupplier, queryInsertSupplier, queryTotalRowSupplier, queryUpdateSupplier } from "../querysql/supplier.js";


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
export const getSupplier = (supplierSearch, supplierLimit, supplierPage, callback) => {
    const supplierStartOffset = (supplierPage - 1) * supplierLimit
    db.all(queryGetSupplier(supplierSearch, supplierLimit, supplierStartOffset), (err, res) => {
        if (!err) {
            return callback(true, res)
        }
        if (err) {
            return callback(false, err)
        }
    });
}
export const getTotalRowSupplier = (supplierSearch, callback) => {
    db.each(queryTotalRowSupplier(supplierSearch), (err, res) => {
        if (!err) {
            const totalProduct = parseInt(res.TOTAL_ROW);
            return callback(true, totalProduct);
        }
        if (err) {
            return callback(false, err);
        }
    });
}
export const getTotalPageSupplier = (supplierLimit, supplierSearch, callback) => {
    db.each(queryTotalRowSupplier(supplierSearch), (err, res) => {
        if (!err) {
            let lastPage;
            if (res.TOTAL_ROW % supplierLimit === 0) {
                lastPage = parseInt(res.TOTAL_ROW) / parseInt(supplierLimit);
            }
            if (res.TOTAL_ROW % supplierLimit !== 0) {
                lastPage = parseInt(parseInt(res.TOTAL_ROW) / parseInt(supplierLimit)) + 1;
            }
            return callback(true, lastPage);
        }
        if (err) {
            return callback(false, err);
        }
    });
};
export const getListSupplier = (callback) => {
    db.all(queryGetListSupplier(), (err, res) => {
        if (!err) {
            return callback(true, res)
        }
        if (err) {
            return callback(false, err)
        }
    })
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
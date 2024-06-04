import { queryDeleteCategory, queryGetCategory, queryInsertCategory, queryUpdateCategory } from "../querysql/categories.js";

// 1.CREATE
export const createCategory = (categoryName, categoryInfo, callback) => {
    db.run(queryInsertCategory(categoryName, categoryInfo), (err) => {
        if (!err) {
            return callback(true, `Kategori <b class='text-capitalize'>${categoryName}</b> berhasil ditambahkan`)
        }
        if (err) {
            return callback(false, `Kategori <b class='text-capitalize'>${categoryName}</b> gagal ditambahkan`)
        }
    });
}
// 2.READ
export const getCategory = (callback) => {
    db.all(queryGetCategory(), (err, res) => {
        if (!err) {
            return callback(true, res)
        }
        if (err) {
            return callback(false, err)
        }
    });
}
// 3.UPDATE
export const updateCategory = (categoryId, categoryName, categoryInfo, callback) => {
    db.run(queryUpdateCategory(categoryId, categoryName, categoryInfo), (err) => {
        if (!err) {
            return callback(true, `Kategori <b>${categoryName}</b> berhasil diperbaharui`)
        }
        if (err) {
            return callback(false, `Kategori ${categoryName} gagal diperbaharui`)
        }
    })
}
// 4.DELETE
export const deleteCategory = (categoryId, categoryName, callback) => {
    db.run(queryDeleteCategory(categoryId), (err) => {
        if (!err) {
            return callback(true, `Kategori <b class='text-capitalize'>${categoryName}</b> berhasil dihapus`)
        }
        if (err) {
            return callback(false, `Kategori <b class='text-capitalize'>${categoryName}</b> gagal dihapus`)
        }
    });
}
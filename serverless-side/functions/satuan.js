import { queryDeleteSatuan, queryGetSatuan, queryInsertSatuan, queryUpdateSatuan } from "../querysql/satuan.js";

// 1.CREATE
export const createSatuan = (satuanName, satuanInfo, callback) => {
    db.run(queryInsertSatuan(satuanName, satuanInfo), (err) => {
        if (!err) {
            return callback(true, `Satuan <b class='text-capitalize'>${satuanName}</b> berhasil ditambahkan`)
        }
        if (err) {
            return callback(false, `Satuan <b class='text-capitalize'>${satuanName}</b> gagal ditambahkan`)
        }
    });
}
// 2.READ
export const getSatuan = (callback) => {
    db.all(queryGetSatuan(), (err, res) => {
        if (!err) {
            return callback(true, res)
        }
        if (err) {
            return callback(false, err)
        }
    });
}
// 3.UPDATE
export const updateSatuan = (satuanId, satuanName, satuanInfo, callback) => {
    db.run(queryUpdateSatuan(satuanId, satuanName, satuanInfo), (err) => {
        if (!err) {
            return callback(true, `Satuan <b>${satuanName}</b> berhasil diperbaharui ${satuanId}`)
        }
        if (err) {
            return callback(false, `Satuan  <b>${satuanName}</b> gagal diperbaharui`)
        }
    })
}
// 4.DELETE
export const deleteSatuan = (satuanId, satuanName, callback) => {
    db.run(queryDeleteSatuan(satuanId), (err) => {
        if (!err) {
            return callback(true, `Satuan <b class='text-capitalize'>${satuanName}</b> berhasil dihapus`)
        }
        if (err) {
            return callback(false, `Satuan <b class='text-capitalize'>${satuanName}</b> gagal dihapus`)
        }
    });
}
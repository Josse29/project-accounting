import {
  queryDeleteKas,
  queryInsertKas,
  queryReadKas,
  queryUpdateKas,
} from "../querysql/kas.js";
// create
export const insertKas = (req, res) => {
  const { valKasYMD, valKasHMS, valKasName, valKasRp, valKasInfo } = req;
  const query = queryInsertKas(
    valKasYMD,
    valKasHMS,
    valKasName,
    valKasRp,
    valKasInfo
  );
  db.run(query, (err) => {
    if (!err) {
      return res(true, "berhasil");
    }
    if (err) {
      return res(false, err);
    }
  });
};
// read
export const readKas = (callback) => {
  const query = queryReadKas();
  db.all(query, (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(true, res);
    }
  });
};
// update
export const updateKas = (kasId, callback) => {
  const query = queryUpdateKas(kasId);
  db.run(query, (err) => {
    if (!err) {
      return callback(true, "berhasil diupdate");
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// delete
export const deleteKas = (kasId, callback) => {
  const query = queryDeleteKas(kasId);
  db.run(query, (err) => {
    if (!err) {
      return callback(true, "berhasil dihapus");
    }
    if (err) {
      return callback(false, err);
    }
  });
};

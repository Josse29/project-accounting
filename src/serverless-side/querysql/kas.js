export const createTableKas = () => {
  return `CREATE TABLE Kas (
            KasId INTEGER PRIMARY KEY AUTOINCREMENT,
            KasYYYYMMDD TEXT,
            KasHMS TEXT,
            KasName TEXT,
            KasRp INTEGER,
            KasInfo TEXT
          )`;
};
// CREATE
export const queryInsertKas = (
  valKasYMD,
  valKasHMS,
  valKasName,
  valKasRp,
  valKasInfo
) => {
  let queryInsertKas = `INSERT 
                        INTO Kas (KasYYYYMMDD, KasHMS, KasName, KasRp, KasInfo) 
                        VALUES ('${valKasYMD}', '${valKasHMS}', '${valKasName}', ${valKasRp}, '${valKasInfo}')`;
  return queryInsertKas;
};
// READ
export const queryReadKas = () => {
  let queryGetKas = `SELECT * FROM KAS `;
  return queryGetKas;
};
// UPDATE
export const queryUpdateKas = (valKasId, valKasName, valKasRp) => {
  let queryUpdateKas = `UPDATE 
                        Kas
                        SET KasName = '${valKasName}',
                            KasRp = '${valKasRp}'
                        WHERE KasId = ${valKasId} `;
  return queryUpdateKas;
};
// DELETE
export const queryDeleteKas = (valKasId) => {
  let queryDeleteKas = `DELETE 
                        FROM Kas
                        WHERE KasId = '${valKasId}' `;
  return queryDeleteKas;
};

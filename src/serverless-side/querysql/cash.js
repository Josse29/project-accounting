export const createTableCash = () => {
  return `CREATE TABLE Cash (
            CashId INTEGER PRIMARY KEY AUTOINCREMENT,
            CashYYYYMMDD TEXT,
            CashHMS TEXT,
            CashName TEXT,
            CashRp INTEGER,
            CashInfo TEXT
          )`;
};
// CREATE
export const queryInsertCash = (
  CashYYYYMMDDVal,
  CashHMSVal,
  CashNameVal,
  CashRpVal,
  CashInfoVal
) => {
  let queryInsertCash = `INSERT 
                        INTO Cash (CashYYYYMMDD, CashHMS, CashName, CashRp, CashInfo) 
                        VALUES ('${CashYYYYMMDDVal}', '${CashHMSVal}', '${CashNameVal}', ${CashRpVal}, '${CashInfoVal}')`;
  return queryInsertCash;
};
// READ
export const queryReadCash = () => {
  let queryGetCash = `SELECT * FROM Cash `;
  return queryGetCash;
};
// UPDATE
export const queryUpdateCash = (
  CashNameVal,
  CashRpVal,
  CashInfoVal,
  CashIdVal
) => {
  let queryUpdateCash = `UPDATE 
                        Cash
                        SET CashName = '${CashNameVal}',
                            CashRp = '${CashRpVal}'.
                            CashInfo = '${CashInfoVal}'
                        WHERE CashId = ${CashIdVal} `;
  return queryUpdateCash;
};
// DELETE
export const queryDeleteCash = (CashIdVal) => {
  let queryDeleteCash = `DELETE 
                        FROM Cash
                        WHERE CashId = ${CashIdVal} `;
  return queryDeleteCash;
};

export const createTableAccounting = () => {
  return `CREATE TABLE Accounting (
                AccountingId INTEGER PRIMARY KEY AUTOINCREMENT,
                AccountingYMD VARCHAR(255),
                AccountingHMS VARCHAR(255),
                AccountingRef VARCHAR(255),
                AccountingName VARCHAR(255),
                AccountingPosition VARCHAR(255),
                AccountingRp INTEGER,
                AccountingImg BLOB,
                AccountingInfo TEXT
              )`;
};

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

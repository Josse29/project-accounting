export const createTableReceivable = () => {
  return `CREATE TABLE Receivable(
                ReceivableId INTEGER PRIMARY KEY AUTOINCREMENT,
                ReceivableYYYYMMDD TEXT,
                ReceivableHMS TEXT,
                ReceivableName VARCHAR(255),
                ReceivableRp INTEGER,
                ReceivableInfo TEXT,
                ReceivableUserId INTEGER, 
                FOREIGN KEY (ReceivableUserId) REFERENCES User(UserId)
              )`;
};

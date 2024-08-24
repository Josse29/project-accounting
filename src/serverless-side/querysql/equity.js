export const createTableEquity = () => {
  return `CREATE TABLE Equity(
                EquityeId INTEGER PRIMARY KEY AUTOINCREMENT,
                EquityYYYYMMDD TEXT,
                EquityHMS TEXT,
                EquityName VARCHAR(255),
                EquityRp INTEGER,
                EquityInfo TEXT
              )`;
};

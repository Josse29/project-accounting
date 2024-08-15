export const createTableBeban = () => {
  return `CREATE TABLE Beban(
              BebanId INTEGER PRIMARY KEY AUTOINCREMENT,
              BebanYYYYMMDD TEXT,
              BebanHMS TEXT,
              BebanRp INTEGER
            )`;
};

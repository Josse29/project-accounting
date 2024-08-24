export const createTableLiabilities = () => {
  return `CREATE TABLE Liabilities(
                  LiabilitiesId INTEGER PRIMARY KEY AUTOINCREMENT,
                  LiabilitiesYYYYMMDD TEXT,
                  LiabilitiesHMS TEXT,
                  LiabilitiesName VARCHAR(255),
                  LiabilitiesRp INTEGER,
                  LiabilitiesInfo TEXT,
                  LiabilitiesUserId INTEGER, 
                  FOREIGN KEY (LiabilitiesUserId) REFERENCES User(UserId)
                )`;
};

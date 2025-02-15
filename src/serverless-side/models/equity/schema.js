const equitySchema = `
CREATE TABLE IF NOT EXISTS 
Equity (
EquityId INTEGER PRIMARY KEY AUTOINCREMENT, 
EquityDate TEXT, 
EquityTime TEXT,
EqiutyName VARCHAR(255), 
EquityUserId INTEGER, 
EquityBalance INTEGER,
EquityInformation TEXT, 
FOREIGN KEY (EquityUserId) REFERENCES User(UserId)
);`;
export default equitySchema;

const equitySchema = `
CREATE 
TABLE Equity (
    EquityId INTEGER PRIMARY KEY AUTOINCREMENT,
    EquityUserId INTEGER,
    EquityBalance INTEGER, 
    EquityInformation text,
    FOREIGN KEY (EquityUserId) REFERENCES User(UserId)
);
`;

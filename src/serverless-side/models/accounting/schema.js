const AccountingSchema = `
CREATE TABLE IF NOT EXISTS
Accounting (
  AccountingId INTEGER PRIMARY KEY AUTOINCREMENT,                
  AccountingDate TEXT,                
  AccountingTime TEXT,                
  AccountingRef INTEGER,                
  AccountingName TEXT,                
  AccountingBalance INTEGER,                              
  AccountingInfo TEXT                
)
`;
export default AccountingSchema;

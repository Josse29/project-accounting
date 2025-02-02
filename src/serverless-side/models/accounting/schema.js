const AccountingSchema = `
CREATE TABLE IF NOT EXISTS
Accounting (
  AccountingId INTEGER PRIMARY KEY AUTOINCREMENT,                
  AccountingYMD VARCHAR(255),                
  AccountingHMS VARCHAR(255),                
  AccountingRef INTEGER,                
  AccountingName VARCHAR(255),                
  AccountingDebt INTEGER,                
  AccountingCredit INTEGER,                               
  AccountingImg BLOB,                
  AccountingInfo TEXT                
)
`;
export default AccountingSchema;

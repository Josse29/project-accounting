const CashSchema = `
CREATE TABLE IF NOT EXISTS   
Cash (
  CashId INTEGER PRIMARY KEY AUTOINCREMENT,                
  CashDate TEXT,                
  CashTime TEXT,                
  CashName VARCHAR(255),                
  CashBalance INTEGER,                
  CashInfo TEXT,
  CashImg BLOB                
)`;
export default CashSchema;

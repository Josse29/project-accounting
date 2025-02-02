const CashSchema = `
CREATE 
TABLE Cash (
  CashId INTEGER PRIMARY KEY AUTOINCREMENT,                
  CashDate TEXT,                
  CashTime TEXT,                
  CashName TEXT,                
  CashBalance INTEGER,                
  CashInfo TEXT,
  CashImg TEXT                
)`;
export default CashSchema;

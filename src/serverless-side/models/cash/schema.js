const CashSchema = `
CREATE 
TABLE Cash(
  CashId INTEGER PRIMARY KEY AUTOINCREMENT,                
  CashYYYYMMDD TEXT,                
  CashHMS TEXT,                
  CashName TEXT,                
  CashRp INTEGER,                
  CashInfo TEXT                
)`;
export default CashSchema;

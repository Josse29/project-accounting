// create-table
const stockSchema = `
CREATE 
TABLE IF NOT EXISTS 
Stock (
  StockId INTEGER PRIMARY KEY AUTOINCREMENT,
  StockDate TEXT,
  StockTime TEXT,
  StockActivity TEXT,
  StockProductId INTEGER,
  StockQty INTEGER,
  StockInfo TEXT
); `;
export default stockSchema;

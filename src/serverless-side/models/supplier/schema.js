// init table & col
const supplierSchema = `
CREATE 
TABLE Supplier (
  SupplierId INTEGER PRIMARY KEY AUTOINCREMENT,
  SupplierDate TEXT DEFAULT (datetime('now','localtime')),
  SupplierName VARCHAR(255),
  SupplierInfo TEXT,
  SupplierImg BLOB
  SupplierProductId TEXT
)`;
export default supplierSchema;

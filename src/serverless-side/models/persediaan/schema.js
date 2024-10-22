// create-table
const persediaanSchema = `
CREATE 
TABLE Persediaan (
  PersediaanId INTEGER PRIMARY KEY AUTOINCREMENT,
  PersediaanDDMY TEXT,
  PersediaanHMS TEXT,
  PersediaanInfo TEXT,
  PersediaanQty INTEGER,
  PersediaanRp INTEGER,
  PersediaanProductId INTEGER,
  PersediaanPersonId INTEGER,
  FOREIGN KEY (PersediaanProductId) REFERENCES Product(ProductId)
  FOREIGN KEY (PersediaanPersonId) REFERENCES User(UserId)
)`;
export default persediaanSchema;

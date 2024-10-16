export const schemaSales = () => {
  const schema = `CREATE TABLE Sales (
                    SalesId INTEGER PRIMARY KEY AUTOINCREMENT,
                    SalesYMD VARCHAR(255),
                    SalesHMS VARCHAR(255),
                    SalesProductId INTEGER,
                    SalesProductQty INTEGER,
                    SalesProductRp INTEGER,
                    SalesPersonId INTEGER,
                    SalesCustomerId INTEGER,
                    SalesStatus VARCHAR(255),
                    FOREIGN KEY (SalesProductId) REFERENCES Product(ProductId)
                    FOREIGN KEY (SalesPersonId) REFERENCES User(UserId)
                    FOREIGN KEY (SalesCustomerId) REFERENCES User(UserId)
                  );`;
  return schema;
};

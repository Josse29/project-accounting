const productSchema = `
CREATE 
TABLE Product (
  ProductId INTEGER PRIMARY KEY AUTOINCREMENT,
  ProductName VARCHAR(255),
  ProductImage BLOB,
  ProductInfo TEXT,
  ProductPriceBeli REAL,
  ProductPriceJual REAL,
  ProductCategoryId INTEGER,
  ProductSupplierId INTEGER,
  FOREIGN KEY (ProductCategoryId) REFERENCES Category(CategoryId)
  FOREIGN KEY (ProductSupplierId) REFERENCES Supplier(SupplierId)
);`;
export default productSchema;

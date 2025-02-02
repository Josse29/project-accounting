const productSchema = `
CREATE TABLE IF NOT EXISTS 
Product(
  ProductId INTEGER PRIMARY KEY AUTOINCREMENT,
  ProductName VARCHAR(255),
  ProductImage BLOB,
  ProductInfo TEXT,
  ProductPriceBuy TEXT,
  ProductPriceSell TEXT,
  ProductCategoryId INTEGER,
  ProductSupplierId INTEGER,
  FOREIGN KEY (ProductCategoryId) REFERENCES Category(CategoryId)
  FOREIGN KEY (ProductSupplierId) REFERENCES User(UserId)
);`;
export default productSchema;

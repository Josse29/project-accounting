export const queryGetProducts = (limitProduct, offsetProduct) => {
  return `SELECT * 
          FROM products 
          ORDER BY ID ASC 
          LIMIT ${limitProduct} 
          OFFSET ${offsetProduct}`;
};
export const queryinsertProducts = (name, price, keterangan) => {
  return `INSERT INTO products (name, price,keterangan) 
          VALUES ('${name}','${price}','${keterangan}')`;
};
export const queryDeleteProductId = (id) => {
  return `DELETE FROM products
          WHERE id = ${id} `;
};
export const queryTotalRowProducts = `SELECT COUNT(*) AS TOTAL_ROW FROM products`;
export const querySearchProduct = (
  limitProduct,
  offsetProduct,
  searchProduct
) => {
  return `SELECT * FROM products
          WHERE name LIKE '%${searchProduct}%' ESCAPE '!' OR 
                price LIKE '%${searchProduct}%' ESCAPE '!' OR 
                keterangan LIKE '%${searchProduct}%' ESCAPE '!' 
          ORDER BY ID ASC 
          LIMIT ${limitProduct} 
          OFFSET ${offsetProduct}`;
};
export const querySearchTotalRowProducts = (searchProduct) => {
  return `SELECT COUNT(*) AS TOTAL_ROW 
          FROM products 
          WHERE name LIKE '%${searchProduct}%' ESCAPE '!' OR 
                price LIKE '%${searchProduct}%' ESCAPE '!' OR 
                keterangan LIKE '%${searchProduct}%' ESCAPE '!'`;
};

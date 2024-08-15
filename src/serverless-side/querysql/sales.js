export const createTableSales = () => {
  return `CREATE TABLE Sales (
            SalesId INTEGER PRIMARY KEY AUTOINCREMENT,
            SalesYMD VARCHAR(255),
            SalesHMS VARCHAR(255),
            SalesProductId INTEGER,
            SalesProductQty INTEGER,
            SalesProductRp INTEGER,
            SalesPersonId INTEGER,
            SalesCustomerId INTEGER,
            FOREIGN KEY (SalesProductId) REFERENCES Product(ProductId)
            FOREIGN KEY (SalesPersonId) REFERENCES User(UserId)
            FOREIGN KEY (SalesCustomerId) REFERENCES User(UserId)
          )`;
};
// CREATE
export const queryCreateSales = (
  ymdVal,
  hmsVal,
  productIdVal,
  productQtyVal,
  productTotalVal,
  personIdVal,
  customerIdVal
) => {
  let query = `INSERT 
               INTO Sales
               (SalesYMD, SalesHMS, SalesProductId, SalesProductQty, SalesProductRp,   SalesPersonId, SalesCustomerId)
               VALUES 
               ('${ymdVal}', '${hmsVal}', ${productIdVal}, ${productQtyVal}, '${productTotalVal}', ${personIdVal}, ${customerIdVal})
               `;
  return query;
};
// READ
export const queryGetSales = () => {
  let query = `SELECT * Sales`;
  return query;
};
// UPDATE
export const queryUpdateSales = (req) => {
  const {
    ymdVal,
    hmsVal,
    rpVal,
    personIdVal,
    customerIdVal,
    productIdVal,
    salesIdVal,
  } = req;
  let query = `UPDATE 
               TABLE Sales
               SET SalesYMD = '${ymdVal}',
                   SalesHMS = '${hmsVal}',
                   SalesRp = ${rpVal},
                   SalesPersonId = ${personIdVal},
                   SalesCustomerId = '${customerIdVal}',
                   SalesProductId = ${productIdVal}
               WHERE SalesId = ${salesIdVal} `;
  return query;
};
// DELETE
export const queryDeleteSales = (req) => {
  const { salesIdVal } = req;
  let query = `DELETE FROM Sales WHERE SalesId = ${salesIdVal}`;
  return query;
};

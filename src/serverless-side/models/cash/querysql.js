// CREATE
const queryInsertCash = (
  CashDateVal,
  CashTimeVal,
  CashNameVal,
  CashBalanceVal,
  CashInfoVal,
  CashImgVal
) => {
  let query = `
  INSERT 
  INTO Cash 
  (CashDate, CashTime, CashName, CashBalance, CashInfo, CashImg)
  VALUES 
  ('${CashDateVal}', '${CashTimeVal}', '${CashNameVal}', ${CashBalanceVal}, '${CashInfoVal}', '${CashImgVal}')  
  `;
  return query;
};
// READ
const queryReadInitCash = (searchVal) => {
  let query = `SELECT COUNT(*) AS TOTAL_ROW
               FROM Cash `;
  if (searchVal !== "") {
    query += `WHERE Cash.CashName LIKE '%${searchVal}%' `;
  }
  return query;
};
const queryReadCash = (searchVal, limitVal, offsetVal) => {
  let query = `SELECT * FROM Cash `;
  // with search Value
  if (searchVal !== "") {
    query += `WHERE CashName LIKE '%${searchVal}%'`;
  }
  // with order limit offset
  query += `ORDER BY CashDate DESC, 
                     CashTime DESC
            LIMIT ${limitVal}
            OFFSET ${offsetVal}`;
  return query;
};
const queryReadByDate = (startDateVal, endDateVal) => {
  let query = `SELECT * FROM Cash `;
  // condition date
  query += `WHERE CashDate BETWEEN '${startDateVal}' AND '${endDateVal}'`;
  // with order limit offset
  query += `ORDER BY CashDate DESC, 
                     CashTime DESC`;
  return query;
};
const queryReadCash1 = (startDateVal, endDateVal) => {
  let query = `SELECT * FROM Cash `;
  // with search Value
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE CashDate BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // order date
  query += `ORDER BY CashDate DESC `;
  return query;
};
const queryReadCash2 = (startDateVal, endDateVal) => {
  let query = `SELECT
               CashDate,
               CashName,
               CashBalance
               FROM Cash `;
  // with search Value
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE CashDate BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // order date
  query += `ORDER BY CashDate DESC `;
  return query;
};
const querySumCash = () => {
  let query = `SELECT 
               COALESCE(SUM(Cash.CashBalance), 0) AS Total_Amount
               FROM Cash `;
  return query;
};
const querySumCash1 = (startDateVal, endDateVal) => {
  let query = `SELECT 
               SUM(Cash.CashBalance) AS Total_Amount
               FROM Cash `;
  query += `WHERE CashDate BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  return query;
};
// DELETE
const queryDeleteCash = (CashIdVal) => {
  let query = `DELETE 
                          FROM Cash
                          WHERE CashId = ${CashIdVal} `;
  return query;
};
export {
  queryDeleteCash,
  queryInsertCash,
  queryReadByDate,
  queryReadCash,
  queryReadCash1,
  queryReadCash2,
  queryReadInitCash,
  querySumCash,
  querySumCash1,
};

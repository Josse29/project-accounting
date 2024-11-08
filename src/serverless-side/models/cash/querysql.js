// CREATE
export const queryInsertCash = (
  CashYYYYMMDDVal,
  CashHMSVal,
  CashNameVal,
  CashRpVal,
  CashInfoVal
) => {
  let query = `INSERT 
               INTO Cash
               (CashYYYYMMDD, CashHMS, CashName, CashRp, CashInfo) 
               VALUES 
               ('${CashYYYYMMDDVal}', '${CashHMSVal}', '${CashNameVal}', ${CashRpVal}, '${CashInfoVal}')`;
  return query;
};
// READ
export const queryReadInitCash = (searchVal) => {
  let query = `SELECT COUNT(*) AS Total_Row
                 FROM Cash `;
  if (searchVal !== "") {
    query += `WHERE Cash.CashName LIKE '%${searchVal}%' `;
  }
  return query;
};
export const queryReadCash = (searchVal, limitVal, offsetVal) => {
  let query = `SELECT * FROM Cash `;
  // with search Value
  if (searchVal !== "") {
    query += `WHERE CashName LIKE '%${searchVal}%'`;
  }
  // with order limit offset
  query += `ORDER BY Cash.CashYYYYMMDD DESC, 
                     Cash.CashHMS DESC
            LIMIT ${limitVal}
            OFFSET ${offsetVal}`;
  return query;
};
export const queryReadByDate = (startDateVal, endDateVal) => {
  let query = `SELECT * FROM Cash `;
  // condition date
  query += `WHERE CashYYYYMMDD BETWEEN '${startDateVal}' AND '${endDateVal}'`;
  // with order limit offset
  query += `ORDER BY Cash.CashYYYYMMDD DESC, 
                     Cash.CashHMS DESC`;
  return query;
};
export const queryReadCash1 = (startDateVal, endDateVal) => {
  let query = `SELECT * FROM Cash `;
  // with search Value
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE CashYYYYMMDD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // order date
  query += `ORDER BY CashYYYYMMDD DESC `;
  return query;
};
export const queryReadCash2 = (startDateVal, endDateVal) => {
  let query = `SELECT
               CashYYYYMMDD,
               CashName,
               CashRp
               FROM Cash `;
  // with search Value
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE CashYYYYMMDD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // order date
  query += `ORDER BY CashYYYYMMDD DESC `;
  return query;
};
export const querySumCash = () => {
  let query = `SELECT 
               SUM(Cash.CashRp) AS Total_Amount
               FROM Cash `;
  return query;
};
export const querySumCash1 = (startDateVal, endDateVal) => {
  let query = `SELECT 
               SUM(Cash.CashRp) AS Total_Amount
               FROM Cash `;
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE CashYYYYMMDD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  return query;
};
// UPDATE
export const queryUpdateCash = (
  CashNameVal,
  CashRpVal,
  CashInfoVal,
  CashIdVal
) => {
  let queryUpdateCash = `UPDATE 
                          Cash
                          SET CashName = '${CashNameVal}',
                              CashRp = '${CashRpVal}'.
                              CashInfo = '${CashInfoVal}'
                          WHERE CashId = ${CashIdVal} `;
  return queryUpdateCash;
};
// DELETE
export const queryDeleteCash = (CashIdVal) => {
  let queryDeleteCash = `DELETE 
                          FROM Cash
                          WHERE CashId = ${CashIdVal} `;
  return queryDeleteCash;
};

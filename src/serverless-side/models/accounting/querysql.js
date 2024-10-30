export const queryCreateAccounting = (
  accountingYMDVal,
  accountingHMSVal,
  accountingRefVal,
  accountingNameVal,
  accountingPositionVal,
  accountingRpVal,
  accountingInfoVal
) => {
  let query = `INSERT INTO Accounting
               (AccountingYMD, AccountingHMS, AccountingRef, AccountingName, AccountingPosition, AccountingRp, AccountingInfo)
               VALUES
               ('${accountingYMDVal}', '${accountingHMSVal}', '${accountingRefVal}', '${accountingNameVal}', '${accountingPositionVal}', ${accountingRpVal}, '${accountingInfoVal}')`;
  return query;
};
export const queryInitAccounting = () => {
  let query = `SELECT 
               COUNT(*) AS Total_Row
               FROM Accounting `;
  return query;
};
export const queryReadAccounting = (searchVal, limitVal, startoffsetVal) => {
  let query = `SELECT * FROM Accounting `;
  query += `ORDER BY Accounting.AccountingYMD DESC, 
                     Accounting.AccountingHMS DESC, 
                     Accounting.AccountingRef ASC  
            LIMIT ${limitVal}
            OFFSET ${startoffsetVal} `;
  return query;
};
// balance sheet
export const querySumDebt = () => {
  let query = `SELECT
                 SUM(AccountingRp) AS Total_Rp 
                 FROM Accounting `;
  query += `WHERE AccountingPosition = 'debt' `;
  return query;
};
export const querySumCredit = () => {
  let query = `SELECT
               SUM(AccountingRp) AS Total_Rp 
               FROM Accounting `;
  query += `WHERE AccountingPosition = 'credit' `;
  return query;
};
export const queryReadAccounting1 = () => {
  let query = `SELECT 
               AccountingRef, 
               AccountingName, 
               AccountingPosition, 
               SUM(AccountingRp) AS TotalRp
               FROM Accounting `;
  query += `GROUP BY Accounting.AccountingRef
            ORDER BY Accounting.AccountingRef ASC `;
  return query;
};
export const queryUpdateAccounting = (req) => {
  const {
    accountingYMDVal,
    accountingHMSVal,
    accountingRefVal,
    accountingNameVal,
    accountingPositionVal,
    accountingRpVal,
    accountingInfoVal,
    accountingId,
  } = req;
  let query = `UPDATE Accounting 
                 SET AccountingYMD = '${accountingYMDVal}',
                     AccountingHMS = '${accountingHMSVal}',
                     AccountingRef = '${accountingRefVal}',
                     AccountingName = '${accountingNameVal}',
                     AccountingPosition = '${accountingPositionVal}',
                     AccountingRp = ${accountingRpVal},
                     AccountingInfo = '${accountingInfoVal}'
                 WHERE AccountingId = ${accountingId}`;
  return query;
};
export const queryDeleteAccounting = (accountingIdVal) => {
  let query = `DELETE FROM Accounting 
                 WHERE AccountingId = ${accountingIdVal}`;
  return query;
};

export const queryCreateAccounting = (
  accountingYMDVal,
  accountingHMSVal,
  accountingRefVal,
  accountingNameVal,
  accountingDebtVal,
  accountingCreditVal,
  accountingInfoVal
) => {
  let query = `INSERT INTO Accounting
               (AccountingYMD, AccountingHMS, AccountingRef, AccountingName, AccountingDebt, AccountingCredit, AccountingInfo)
               VALUES
               ('${accountingYMDVal}', '${accountingHMSVal}', ${accountingRefVal}, '${accountingNameVal}', ${accountingDebtVal}, ${accountingCreditVal}, '${accountingInfoVal}')`;
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
  query += `ORDER BY AccountingYMD DESC, 
                     AccountingHMS DESC
            LIMIT ${limitVal}
            OFFSET ${startoffsetVal} `;
  return query;
};
// balance sheet
export const querySum = () => {
  let query = `SELECT
               SUM(AccountingDebt) AS Total_Debt,
               SUM(AccountingCredit) AS Total_Credit
               FROM Accounting `;
  return query;
};
export const queryReadAccounting1 = () => {
  let query = `SELECT 
               AccountingName, 
               AccountingRef, 
               SUM(AccountingDebt) AS TotalDebt,
               SUM(AccountingCredit) AS TotalCredit
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

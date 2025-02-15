const queryCreate = (
  accountingYMDVal,
  accountingHMSVal,
  accountingRefVal,
  accountingNameVal,
  accountingDebtVal,
  accountingCreditVal,
  accountingInfoVal
) => {
  let query = `
  INSERT 
  INTO Accounting 
  (AccountingYMD, AccountingHMS, AccountingRef, AccountingName, AccountingDebt, AccountingCredit, AccountingInfo) 
  VALUES
  ('${accountingYMDVal}', '${accountingHMSVal}', '${accountingRefVal}', '${accountingNameVal}', '${accountingDebtVal}', '${accountingCreditVal}', '${accountingInfoVal}')
  `;
  return query;
};
const queryReadTotal = () => {
  let query = `SELECT 
               COUNT(*) AS TOTAL_ROW
               FROM Accounting `;
  return query;
};
const queryRead = (limitVal, startoffsetVal) => {
  let query = `SELECT * FROM Accounting `;
  query += `ORDER BY AccountingYMD DESC, 
                     AccountingHMS DESC
            LIMIT ${limitVal}
            OFFSET ${startoffsetVal} `;
  return query;
};
const queryReadDate = (startDateVal, endDateVal) => {
  let query = `SELECT * FROM Accounting `;
  query += `WHERE AccountingYMD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  query += `ORDER BY AccountingYMD DESC, 
                     AccountingHMS DESC `;
  return query;
};
// balance sheet
const queryReadSumDate = (startDateVal, endDateVal) => {
  let query = `SELECT
               SUM(AccountingDebt) AS Total_Debt,
               SUM(AccountingCredit) AS Total_Credit 
               FROM Accounting `;
  query += `WHERE AccountingYMD BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  return query;
};
const queryRead1 = () => {
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
// const queryUpdate = (req) => {
//   const {
//     accountingYMDVal,
//     accountingHMSVal,
//     accountingRefVal,
//     accountingNameVal,
//     accountingPositionVal,
//     accountingRpVal,
//     accountingInfoVal,
//     accountingId,
//   } = req;
//   let query = `UPDATE Accounting
//                  SET AccountingYMD = '${accountingYMDVal}',
//                      AccountingHMS = '${accountingHMSVal}',
//                      AccountingRef = '${accountingRefVal}',
//                      AccountingName = '${accountingNameVal}',
//                      AccountingPosition = '${accountingPositionVal}',
//                      AccountingRp = ${accountingRpVal},
//                      AccountingInfo = '${accountingInfoVal}'
//                  WHERE AccountingId = ${accountingId}`;
//   return query;
// };
// const queryDelete = (accountingIdVal) => {
//   let query = `DELETE FROM Accounting
//                WHERE AccountingId = ${accountingIdVal}`;
//   return query;
// };
export {
  queryCreate,
  queryRead,
  queryRead1,
  queryReadDate,
  queryReadTotal,
  queryReadSumDate,
  // queryUpdate,
  // queryDelete,
};

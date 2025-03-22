const queryCreate = (
  accountingDateVal,
  accountingTimeVal,
  accountingRefVal,
  accountingNameVal,
  accountingBalanceVal,
  accountingInfoVal
) => {
  let query = `
  INSERT 
  INTO Accounting 
  (AccountingDate, AccountingTime, AccountingRef, AccountingName, AccountingBalance, AccountingInfo) 
  VALUES
  ('${accountingDateVal}', '${accountingTimeVal}', '${accountingRefVal}', '${accountingNameVal}', '${accountingBalanceVal}', '${accountingInfoVal}') `;
  return query;
};
const queryReadTotal = (selectedAccount, searchVal) => {
  let query = `
  SELECT 
  COUNT(*) AS TOTAL_ROW
  FROM Accounting `;
  query += `
  WHERE `;
  if (selectedAccount === 113) {
    query += `
    AccountingRef BETWEEN "${selectedAccount}" AND "131" AND `;
  } else if (selectedAccount === 411) {
    query += `
    AccountingRef BETWEEN "${selectedAccount}" AND "413" AND `;
  } else if (selectedAccount === 511) {
    query += `
    AccountingRef BETWEEN "${selectedAccount}" AND "513" AND `;
  } else {
    query += `
    AccountingRef = "${selectedAccount}" AND `;
  }
  query += `
  AccountingName LIKE "%${searchVal.trim()}%" `;
  return query;
};
const queryRead = (selectedAccount, searchVal, limitVal, startoffsetVal) => {
  let query = `
  SELECT * 
  FROM Accounting `;
  query += `
  WHERE 
  `;
  if (selectedAccount === 113) {
    query += `
    AccountingRef BETWEEN "${selectedAccount}" AND "131" AND `;
  } else if (selectedAccount === 411) {
    query += `
    AccountingRef BETWEEN "${selectedAccount}" AND "413" AND `;
  } else if (selectedAccount === 511) {
    query += `
    AccountingRef BETWEEN "${selectedAccount}" AND "513" AND `;
  } else {
    query += `
    AccountingRef = "${selectedAccount}" AND `;
  }
  query += `
  AccountingName LIKE "%${searchVal.trim()}%" `;
  query += `
  ORDER BY AccountingDate DESC, 
           AccountingTime DESC
  LIMIT ${limitVal}
  OFFSET ${startoffsetVal}   
  `;
  return query;
};
const queryReadDate = (selectedAccount, start, end) => {
  let query = `
  SELECT 
  * 
  FROM Accounting
  `;
  query += `
  WHERE  `;
  if (selectedAccount === 113) {
    query += `
    AccountingRef BETWEEN "${selectedAccount}" AND "131" AND `;
  } else if (selectedAccount === 411) {
    query += `
    AccountingRef BETWEEN "${selectedAccount}" AND "413" AND `;
  } else if (selectedAccount === 511) {
    query += `
    AccountingRef BETWEEN "${selectedAccount}" AND "513" AND `;
  } else {
    query += `
    AccountingRef = "${selectedAccount}" AND `;
  }
  query += `AccountingDate BETWEEN '${start}' AND '${end}' `;
  query += `ORDER BY AccountingDate DESC `;
  return query;
};
const queryReadAsset = () => {
  const query = `
  SELECT 
  AccountingDate,
  AccountingTime,
  AccountingRef,
  AccountingName,
  AccountingInfo,
  COALESCE(SUM(AccountingBalance), 0) AS AssetBalance
  FROM 
  Accounting 
  WHERE AccountingRef BETWEEN 113 AND 121
  GROUP BY AccountingName
  HAVING AssetBalance > 0 
  `;
  return query;
};
const queryReadAsset1 = (startDate, endDate) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalAsset
  FROM 
  Accounting 
  WHERE 
  AccountingRef BETWEEN 113 AND 131 AND 
  AccountingDate BETWEEN "${startDate}" AND "${endDate}"
  `;
  return query;
};
const queryReadCash = () => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalCash
  FROM Accounting 
  WHERE AccountingRef = 111 
  `;
  return query;
};
const queryReadCash1 = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalCash
  FROM Accounting 
  WHERE 
  AccountingRef = 111 AND 
  AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadReceivable = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalReceivable
  FROM Accounting 
  WHERE AccountingRef = 112 AND 
        AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadReceivable1 = () => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalReceivable
  FROM Accounting 
  WHERE AccountingRef = 112
  `;
  return query;
};
const queryReadEquity = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalEquity
  FROM Accounting 
  WHERE AccountingRef = 311 AND 
        AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadLiability = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalLiability
  FROM Accounting 
  WHERE AccountingRef = 211 AND 
        AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadSales = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalSales
  FROM Accounting 
  WHERE 
  AccountingRef = 411 AND  
  AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadSalesReturn = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalSalesReturn
  FROM Accounting 
  WHERE 
  AccountingRef = 412 AND 
  AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadSalesDiscount = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalSalesDiscount
  FROM Accounting 
  WHERE 
  AccountingRef = 413 AND 
  AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadPurchase = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalPurchase
  FROM Accounting 
  WHERE 
  AccountingRef = 511 AND  
  AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadPurchaseReturn = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalPurchaseReturn
  FROM Accounting 
  WHERE 
  AccountingRef = 512 AND  
  AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadPurchaseDiscount = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalPurchaseDiscount
  FROM Accounting 
  WHERE 
  AccountingRef = 513 AND  
  AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadExpense = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalExpense
  FROM Accounting 
  WHERE 
  AccountingRef = 514 AND  
  AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
const queryReadRevenueOthers = (startDateVal, endDateVal) => {
  const query = `
  SELECT 
  COALESCE(SUM(AccountingBalance), 0) AS TotalRevenue
  FROM Accounting 
  WHERE 
  AccountingRef = 611 AND  
  AccountingDate BETWEEN "${startDateVal}" AND "${endDateVal}"
  `;
  return query;
};
// const queryDelete = (accountingIdVal) => {
//   let query = `
//   DELETE
//   FROM Accounting
//     WHERE AccountingId = ${accountingIdVal}`;
//   return query;
// };
export {
  queryCreate,
  queryRead,
  queryReadDate,
  queryReadAsset,
  queryReadAsset1,
  queryReadCash,
  queryReadCash1,
  queryReadEquity,
  queryReadExpense,
  queryReadReceivable,
  queryReadReceivable1,
  queryReadLiability,
  queryReadSales,
  queryReadSalesDiscount,
  queryReadSalesReturn,
  queryReadPurchase,
  queryReadPurchaseReturn,
  queryReadPurchaseDiscount,
  queryReadRevenueOthers,
  queryReadTotal,
  // queryDelete,
};

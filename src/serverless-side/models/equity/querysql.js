const queryCreate = (
  EquityDateVal,
  EquityTimeVal,
  EquityUserIdVal,
  EquityBalanceVal,
  EquityInformationVal
) => {
  let query = `
    INSERT 
    INTO Equity 
    (EquityDate, EquityTime, EquityUserId, EquityBalance, EquityInformation) 
    VALUES 
    ('${EquityDateVal}', '${EquityTimeVal}', '${EquityUserIdVal}','${EquityBalanceVal}', '${EquityInformationVal}')  
    `;
  return query;
};
const queryRead = (searchVal, limitVal, startOffsetVal) => {
  let query = `SELECT
               Equity.EquityId,
               Equity.EquityDate,
               Equity.EquityTime,
               Equity.EquityBalance,
               Equity.EquityInformation,
               User.UserId,
               User.UserEmail,
               User.UserFullname
               FROM Equity
               LEFT JOIN User ON Equity.EquityUserId = User.UserId `;
  //  with search value
  if (searchVal !== "") {
    query += `WHERE User.UserFullname LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  // witth order limit offset
  query += `ORDER BY Equity.EquityDate DESC, Equity.EquityTime DESC
            LIMIT ${limitVal}  
            OFFSET ${startOffsetVal}`;
  return query;
};
const queryReadTotalRow = (searchVal) => {
  let query = `SELECT COUNT(*) AS TOTAL_ROW
               FROM Equity `;
  //  left join
  query += `LEFT JOIN USER ON Equity.EquityUserId = User.UserId `;
  // with search value categories
  if (searchVal !== "") {
    query += `WHERE User.UserFullname LIKE '%${searchVal}%' ESCAPE '!' OR
                    User.UserEmail LIKE '%${searchVal}%' ESCAPE '!' OR  
                    Equity.EquityInformation LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  return query;
};
const queryReadDate = (startDateVal, endDateVal) => {
  let query = `SELECT
               Equity.EquityId,
               Equity.EquityDate,
               Equity.EquityTime,
               Equity.EquityBalance,
               Equity.EquityInformation,
               User.UserId,
               User.UserEmail,
               User.UserFullname
               FROM Equity
               LEFT JOIN User ON Equity.EquityUserId = User.UserId `;
  //  with date
  query += `WHERE Equity.EquityDate BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  // witth order
  query += `ORDER BY Equity.EquityDate DESC, Equity.EquityTime DESC `;
  return query;
};
const queryReadDateGroupUser = (startDateVal, endDateVal) => {
  let query = `SELECT
               User.UserFullname,
               COALESCE(SUM(Equity.EquityBalance), 0) AS EquityBalanceSum
               FROM Equity
               LEFT JOIN User ON Equity.EquityUserId = User.UserId `;
  //  with search date
  query += `WHERE Equity.EquityDate BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  // with group by user id
  query += `GROUP BY User.UserId `;
  // witth order
  query += `ORDER BY User.UserFullname ASC`;
  return query;
};
const queryReadDate1 = (startDateVal, endDateVal) => {
  let query = `SELECT
               Equity.EquityId AS Id,
               Equity.EquityDate AS Date,
               Equity.EquityTime AS Time,
               User.UserFullname AS Fullname,
               Equity.EquityBalance AS Balance,
               User.UserEmail AS Email,
               Equity.EquityInformation Information
               FROM Equity
               LEFT JOIN User ON Equity.EquityUserId = User.UserId `;
  //  with date
  query += `WHERE Equity.EquityDate BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  // with order
  query += `ORDER BY Equity.EquityDate DESC, Equity.EquityTime DESC `;
  return query;
};
const queryReadDate2 = (startDateVal, endDateVal) => {
  let query = `SELECT
               Equity.EquityDate,
               User.UserFullname,
               Equity.EquityBalance
               FROM Equity
               LEFT JOIN User ON Equity.EquityUserId = User.UserId `;
  //  with date
  query += `WHERE Equity.EquityDate BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  // witth order
  query += `ORDER BY Equity.EquityDate DESC, Equity.EquityTime DESC `;
  return query;
};
const queryReadSumDate = (startDateVal, endDateVal) => {
  let query = `SELECT 
               COALESCE(SUM(Equity.EquityBalance), 0) AS EquityBalanceSum
               FROM Equity `;
  //  with date
  query += `WHERE Equity.EquityDate BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  return query;
};
export {
  queryCreate,
  queryRead,
  queryReadDate,
  queryReadDate1,
  queryReadDate2,
  queryReadDateGroupUser,
  queryReadSumDate,
  queryReadTotalRow,
};

const queryCreate = (
  expenseNameVal,
  expensePriceVal,
  expenseUserIdVal,
  expenseImgVal,
  expenseInfoVal
) => {
  let query = `
    INSERT 
    INTO ExpenseList
    (ExpenseName, ExpensePrice, ExpenseUserId, ExpenseImg, ExpenseInfo)
    VALUES 
    ('${expenseNameVal}', '${expensePriceVal}', '${expenseUserIdVal}', '${expenseImgVal}', '${expenseInfoVal}')
    `;
  return query;
};
const queryRead = (searchVal, limitVal, offsetVal) => {
  let query = `
  SELECT 
  ExpenseList.ExpenseId,
  ExpenseList.ExpenseName,
  ExpenseList.ExpensePrice,
  ExpenseList.ExpenseImg,
  ExpenseList.ExpenseInfo,
  User.UserId,
  User.UserFullname,
  User.UserEmail
  FROM ExpenseList
  `;
  // left join user
  query += `
  LEFT JOIN User ON ExpenseList.ExpenseUserId = User.UserId
  `;
  // searching
  if (searchVal !== "") {
    query += `
    WHERE 
    ExpenseList.ExpenseName LIKE '%${searchVal}%' OR 
    ExpenseList.ExpenseInfo LIKE '%${searchVal}%' OR 
    User.UserEmail LIKE '%${searchVal}%' OR 
    User.UserFullname LIKE '%${searchVal}%'
    `;
  }
  // limit offset
  query += `
  ORDER BY ExpenseList.ExpenseName ASC
  LIMIT ${limitVal}
  OFFSET ${offsetVal}
  `;
  return query;
};
const queryReadList = () => {
  let query = `
  SELECT 
  ExpenseId, 
  ExpenseName,
  ExpensePrice
  FROM
  ExpenseList
  `;
  return query;
};
const queryReadTotalRow = (searchVal) => {
  let query = `
  SELECT 
  COUNT(*) AS TOTAL_ROW
  FROM ExpenseList 
  `;
  // left join user
  query += `
  LEFT JOIN User ON ExpenseList.ExpenseUserId = User.UserId
  `;
  if (searchVal !== "") {
    query += `
    WHERE
    ExpenseList.ExpenseName LIKE '%${searchVal}%' OR 
    ExpenseList.ExpenseInfo LIKE '%${searchVal}%' OR 
    User.UserEmail LIKE '%${searchVal}%' OR 
    User.UserFullname LIKE '%${searchVal}%'
  `;
  }
  return query;
};
const queryUpdate = (
  expenseIdVal,
  expenseNameVal,
  expensePriceVal,
  expenseUserIdVal,
  expenseInfoVal,
  expenseImgVal,
  expenseImgCancelVal
) => {
  let query = `
  UPDATE 
  ExpenseList
  SET
  ExpenseName = '${expenseNameVal}',
  ExpensePrice = '${expensePriceVal}',
  ExpenseUserId = '${expenseUserIdVal}',
  ExpenseInfo = '${expenseInfoVal}'
  `;
  // 1.removeImg
  if (expenseImgCancelVal) {
    query += `
    , ExpenseImg = 'null'
    `;
  }
  // 2.changeImg
  if (!expenseImgCancelVal && expenseImgVal !== "null") {
    query += `
    , ExpenseImg = '${expenseImgVal}'
    `;
  }
  query += `
  WHERE ExpenseId = '${expenseIdVal}'
  `;
  return query;
};
const queryDelete = (expenseIdVal) => {
  let query = `
  DELETE 
  FROM ExpenseList
  WHERE ExpenseId = '${expenseIdVal}' 
  `;
  return query;
};
export {
  queryCreate,
  queryRead,
  queryReadList,
  queryReadTotalRow,
  queryUpdate,
  queryDelete,
};

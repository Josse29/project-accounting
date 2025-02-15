const expenseSchema = `
CREATE TABLE IF NOT EXISTS 
ExpenseList ( 
ExpenseId INTEGER PRIMARY KEY AUTOINCREMENT, 
ExpenseName VARCHAR(255), 
ExpensePrice INTEGER, 
ExpenseUserId INTEGER, 
ExpenseImg BLOB, 
ExpenseInfo TEXT, 
FOREIGN KEY (ExpenseUserId) REFERENCES User(UserId) 
);`;
export default expenseSchema;

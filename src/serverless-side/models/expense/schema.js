const expenseSchema = `
CREATE TABLE IF NOT EXISTS 
expense (
ExpenseId INTEGER PRIMARY KEY AUTOINCREMENT,
ExpenseDate TEXT,
ExpenseTime TEXT,
ExpenseName VARCHAR(255),
ExpenseBalance INTEGER,
ExpenseInfo TEXT
);`;
export default expenseSchema;

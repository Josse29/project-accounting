export const createTableExpense = () => {
  return `CREATE TABLE Expense(
              ExpenseId INTEGER PRIMARY KEY AUTOINCREMENT,
              ExpenseYYYYMMDD TEXT,
              ExpenseHMS TEXT,
              ExpenseName VARCHAR(255),
              ExpenseRp INTEGER,
              ExpenseInfo TEXT
            )`;
};

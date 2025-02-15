const categorySchema = `
CREATE TABLE IF NOT EXISTS 
Category (
    CategoryId INTEGER PRIMARY KEY AUTOINCREMENT,
    CategoryName VARCHAR(100),
    CategoryInfo TEXT
);`;
export default categorySchema;

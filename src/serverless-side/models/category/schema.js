const categorySchema = `
CREATE TABLE Category(
    CategoryId integer primary key autoincrement,
    CategoryName varchar(100),
    CategoryInfo text
);`;
export default categorySchema;

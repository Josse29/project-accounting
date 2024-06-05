// create-table
// CREATE TABLE Category(
//     CategoryId integer primary key autoincrement,
//     CategoryName varchar(100),
//     CategoryInfo text
// );

// init table & columnn
const tableName = `Category`
const colCategoryId = `CategoryId`
const colCategoryName = `CategoryName`
const colCategoryInfo = `CategoryInfo`

// 1.CREATE 
export const queryInsertCategory = (categoryName, categoryInfo) => {
    return `INSERT 
            INTO ${tableName} 
            (${colCategoryName}, ${colCategoryInfo}) 
            VALUES 
            ('${categoryName}', '${categoryInfo}')`
}
// 2.READ
export const queryGetCategory = () => {
    return `SELECT *
            FROM ${tableName}
            ORDER BY ${colCategoryName} ASC`
}
// 3.UPDATE
export const queryUpdateCategory = (categoryId, categoryName, categoryInfo) => {
    return `UPDATE 
            ${tableName}
            SET ${colCategoryName} = '${categoryName}',
                ${colCategoryInfo} = '${categoryInfo}'
            WHERE ${colCategoryId} = '${categoryId}'`
}
// 4.DELETE 
export const queryDeleteCategory = (categoryId) => {
    return `DELETE 
            FROM ${tableName}
            WHERE ${colCategoryId} = '${categoryId}'`
}
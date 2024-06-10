// create-table
export const createTable = () => {
    return `CREATE 
            TABLE Supplier (
            SupplierId INTEGER PRIMARY KEY AUTOINCREMENT, 
            SupplierDate TEXT DEFAULT (datetime('now','localtime')),
            SupplierName VARCHAR(255), 
            SupplierInfo TEXT,
            SupplierImg BLOB);`
}
// SuplierProductId
// init table & col
const tableName = `Supplier`
const colSupplierId = `SupplierId`
const colSupplierName = `SupplierName`
const colSupplierInfo = `SupplierInfo`
const colSupplierImg = `SupplierImg`

// 1.CREATE 
export const queryInsertSupplier = (supplierName, supplierInfo, supplierImg) => {
    return `INSERT 
            INTO ${tableName} 
            (${colSupplierName}, ${colSupplierInfo}, ${colSupplierImg}) 
            VALUES 
            ('${supplierName}', '${supplierInfo}', '${supplierImg}')`
}
// 2.READ
export const queryGetSupplier = () => {
    return `SELECT *
            FROM ${tableName}
            ORDER BY ${colSupplierName} ASC`
}
export const queryTotalRowSupplier = (searchSupplier) => {
    // without search value product
    if (searchSupplier === "") {
        return `SELECT COUNT(${colSupplierId}) AS TOTAL_ROW
                FROM ${tableName}`
    }
}
// 3.UPDATE
export const queryUpdateSupplier = (supplierId, supplierName, supplierInfo, supplierImg) => {
    let query = `UPDATE ${tableName}
                 SET ${colSupplierName} = '${supplierName}',
                     ${colSupplierInfo} = '${supplierInfo}',`
    // with image
    if (supplierImg !== "") {
        query += `${colSupplierImg}  = '${supplierImg}'`
    }
    query += `WHERE ${colSupplierId} = ${supplierId}`
    return query
}
// 4.DELETE 
export const queryDeleteSupplier = (supplierId) => {
    return `DELETE 
            FROM ${tableName}
            WHERE ${colSupplierId} = '${supplierId}'`
}
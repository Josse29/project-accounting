// create-table
// CREATE TABLE Supplier (
//     SupplierId INTEGER PRIMARY KEY AUTOINCREMENT,
//     SupplierDate TEXT DEFAULT (datetime('now','localtime')),
//     SupplierName VARCHAR(255),
//     SupplierInfo TEXT,
//     SupplierImg BLOB
//     );

// init table & col
const tableName = `Supplier`
const colSupplierId = `SupplierId`
const colSupplierName = `SupplierName`
const colSupplierInfo = `SupplierInfo`

// 1.CREATE 
export const queryInsertSupplier = (supplierName, supplierInfo) => {
    return `INSERT 
            INTO ${tableName} 
            (${colSupplierName}, ${colSupplierInfo}) 
            VALUES 
            ('${supplierName}', '${supplierInfo}')`
}
// 2.READ
export const queryGetSupplier = () => {
    return `SELECT *
            FROM ${tableName}
            ORDER BY ${colSupplierName} ASC`
}
// 3.UPDATE
export const queryUpdateSupplier = (supplierId, supplierName, supplierInfo) => {
    return `UPDATE 
            ${tableName}
            SET ${colSupplierName} = '${supplierName}',
                ${colSupplierInfo} = '${supplierInfo}'
            WHERE ${colSupplierId} = '${supplierId}'`
}
// 4.DELETE 
export const queryDeleteSupplier = (supplierId) => {
    return `DELETE 
            FROM ${tableName}
            WHERE ${colSupplierId} = '${supplierId}'`
}
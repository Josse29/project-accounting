// create-table
// CREATE TABLE Satuan (
//     SatuanId INTEGER PRIMARY KEY AUTOINCREMENT,
//     SatuanName VARCHAR(255),
//     SatuanInfo TEXT
//     );

// init table & col
const tableName = `Satuan`;
const colSatuanId = `SatuanId`;
const colSatuanName = `SatuanName`;
const colSatuanInfo = `SatuanInfo`;

// 1.CREATE
export const queryInsertSatuan = (satuanName, satuanInfo) => {
  return `INSERT 
          INTO ${tableName} 
          (${colSatuanName}, ${colSatuanInfo}) 
          VALUES 
          ('${satuanName}', '${satuanInfo}')`;
};
// 2.READ
export const queryGetSatuan = () => {
  return `SELECT *
          FROM ${tableName}
          ORDER BY ${colSatuanName} ASC`;
};
export const queryTotalRowSatuan = (satuanSearch) => {
  let query = `SELECT COUNT(${colSatuanId})
               AS TOTAL_ROW
               FROM ${tableName}`;
  if (satuanSearch !== "") {
    query += `WHERE ${colSatuanName} LIKE '%${satuanSearch}%' ESCAPE '!' OR
                    ${colSatuanInfo} LIKE '%${satuanSearch}%' ESCAPE '!' `;
  }
  return query;
};
// 3.UPDATE
export const queryUpdateSatuan = (satuanId, satuanName, satuanInfo) => {
  return `UPDATE 
          ${tableName}
          SET ${colSatuanName} = '${satuanName}',
              ${colSatuanInfo} = '${satuanInfo}'
          WHERE ${colSatuanId} = ${satuanId}`;
};
// 4.DELETE
export const queryDeleteSatuan = (satuanId) => {
  return `DELETE 
          FROM ${tableName}
          WHERE ${colSatuanId} = ${satuanId}`;
};

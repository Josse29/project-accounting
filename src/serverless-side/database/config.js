const DbHandlers = (ipcMain, db) => {
  ipcMain.handle("db-all", async (event, query) => {
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  });
  ipcMain.handle("db-run", async (event, query, msg) => {
    return new Promise((resolve, reject) => {
      db.run(query, function (err) {
        if (err) reject(err);
        else resolve(msg);
      });
    });
  });
  ipcMain.handle("db-each", async (event, query, limitVal) => {
    return new Promise((resolve, reject) => {
      db.each(query, (err, res) => {
        if (!err) {
          let totalPage;
          let totalRow = parseInt(res.TOTAL_ROW);
          const isEven = totalRow % limitVal === 0;
          if (isEven) {
            totalPage = totalRow / limitVal;
          } else {
            totalPage = parseInt(totalRow / limitVal) + 1;
          }
          console.log(res);
          resolve({ totalPage, totalRow });
        }
        if (err) {
          reject(err);
        }
      });
    });
  });
  ipcMain.handle("db-each-1", async (event, query) => {
    return new Promise((resolve, reject) => {
      db.each(query, (err, res) => {
        if (!err) {
          resolve(res);
        }
        if (err) {
          reject(err);
        }
      });
    });
  });
};
export default DbHandlers;

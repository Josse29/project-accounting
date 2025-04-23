const executeCreate = (db, query) => {
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
const executeUpdate = (db, query) => {
  return new Promise((resolve, reject) => {
    db.run(query, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
const executeGet = (db, query) => {
  return new Promise((resolve, reject) => {
    db.all(query, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};
const executeGet1 = (db, query, limitVal) => {
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (!err) {
        let totalPage;
        let totalRow = parseInt(res.TOTAL_ROW);
        const isEven = totalRow % limitVal === 0;
        if (isEven) {
          totalPage = parseInt(totalRow / limitVal);
        } else {
          totalPage = parseInt(totalRow / limitVal) + 1;
        }
        resolve({ totalPage, totalRow });
      }
      if (err) {
        reject(err);
      }
    });
  });
};
const executeGet2 = (db, query) => {
  return new Promise((resolve, reject) => {
    db.each(query, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};
const executeDelete = (db, query) => {
  return new Promise((resolve, reject) => {
    db.run(query, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};
export {
  executeCreate,
  executeGet,
  executeGet1,
  executeGet2,
  executeDelete,
  executeUpdate,
};

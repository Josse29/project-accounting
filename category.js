const getCategory = (db) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Category";
    db.all(query, (err, rows) => {
      if (err) {
        reject(err); // Menangani error jika terjadi
      } else {
        resolve(rows);
      }
    });
  });
};
export default getCategory;

import { queryInsertUsers, querygetUsers } from "../query/users.js";

export const getUsers = (callback) => {
  db.all(querygetUsers, (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const insertUsers = (email, fullname, password, callback) => {
  db.run(queryInsertUsers(email, fullname, password), (err) => {
    if (!err) {
      return callback(true, "berhasil register");
    }
    if (err) {
      return callback(false, err);
    }
  });
};

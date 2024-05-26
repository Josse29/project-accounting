import { queryRegister, querygetUsers } from "../querysql/users.js";

export const register = (email, fullname, password, callback) => {
    db.run(queryRegister(email, fullname, password), (err) => {
        if (!err) {
            return callback(true, "berhasil register");
        }
        if (err) {
            return callback(false, err);
        }
    });
};
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

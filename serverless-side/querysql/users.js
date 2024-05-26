export const queryRegister = (email, fullname, password) => {
    return `INSERT INTO users(email, fullname, password) values("${email}", "${fullname}", "${password}")`;
};
export const querygetUsers = `SELECT * FROM users`;
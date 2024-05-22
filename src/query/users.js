export const querygetUsers = `SELECT * FROM users`;
export const queryInsertUsers = (email, fullname, password) => {
  return `INSERT INTO users(email, fullname, password) values("${email}", "${fullname}", "${password}")`;
};

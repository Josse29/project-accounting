// CREATE TABLE users(
//     id integer primary key autoincrement,
//     email varchar(255) not null unique, 
//     fullname varchar(255), 
//     password varchar(255), 
//     photo varchar(255), 
//     position varchar(255), 
// accept BOOLEAN DEFAULT FALSE);

export const queryRegister = (email, fullname, password) => {
    return `INSERT 
            INTO users (email, fullname, password) 
            values("${email}", "${fullname}", "${password}")`;
};
export const querygetUsers = `SELECT * FROM users`;
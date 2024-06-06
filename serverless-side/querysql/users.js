// CREATE TABLE users(
//     UserId integer primary key autoincrement,
//     UserEmail varchar(255) not null unique, 
//     UserFullname varchar(255), 
//     UserPassword varchar(255), 
//     UserPhoto varchar(255), 
//     UserPosition varchar(255), 
//     UserAccept BOOLEAN DEFAULT FALSE);

export const queryRegister = (email, fullname, password) => {
    return `INSERT 
            INTO users (email, fullname, password) 
            values("${email}", "${fullname}", "${password}")`;
};
export const querygetUsers = `SELECT * FROM users`;
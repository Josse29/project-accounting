const schema = `
CREATE TABLE User ( 
  UserId INTEGER PRIMARY KEY AUTOINCREMENT,
  UserEmail VARCHAR(255) NOT NULL UNIQUE,
  UserFullname VARCHAR(255),
  UserPassword VARCHAR(255),
  UserImg BLOB,
  UserPosition VARCHAR(255),
  UserInfo TEXT
)`;
export default schema;

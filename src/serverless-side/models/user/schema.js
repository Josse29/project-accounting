const UserSchema = `
CREATE 
TABLE IF NOT EXISTS  
User ( 
  UserId INTEGER PRIMARY KEY AUTOINCREMENT,
  UserName VARCHAR(255),
  UserEmail VARCHAR(255),
  UserFullname VARCHAR(255),
  UserPassword VARCHAR(255) DEFAULT NULL,
  UserImg BLOB,
  UserPosition VARCHAR(255),
  UserInfo TEXT
)`;
export default UserSchema;

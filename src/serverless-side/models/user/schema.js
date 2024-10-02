export const createTableUser = () => {
  const schema = `CREATE TABLE User ( 
                    UserId INTEGER primary key autoincrement,
                    UserEmail VARCHAR(255) not null unique,
                    UserFullname VARCHAR(255),
                    UserPassword VARCHAR(255),
                    UserImg BLOB,
                    UserPosition VARCHAR(255)
                  )`;
  return schema;
};

const assetListSchema = `
CREATE 
TABLE IF NOT EXISTS 
AssetList (
AssetId INTEGER PRIMARY KEY AUTOINCREMENT,
AssetName VARCHAR(255),
AssetPrice INTEGER,
AssetImg BLOB,
AssetUserId INTEGER,
AssetInfo TEXT,
FOREIGN KEY (AssetUserId) REFERENCES User(UserId)
);`;
export default assetListSchema;
// CREATE
// TABLE IF NOT EXISTS
// AssetName (
//     AssetId INTEGER PRIMARY KEY AUTOINCREMENT,
//     AssetName VARCHAR(255),
//     AssetBalance INTEGER,
//     AssetImg BLOB,
//     AssetInfo TEXT
// );

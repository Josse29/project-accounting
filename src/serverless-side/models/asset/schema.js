const assetSchema = `
CREATE TABLE IF NOT EXISTS 
Asset (
AssetId INTEGER PRIMARY KEY AUTOINCREMENT,
AssetDate TEXT,
AssetTime TEXT,
AssetName VARCHAR(255),
AssetBalance INTEGER,
AssetInfo TEXT
);`;
export default assetSchema;

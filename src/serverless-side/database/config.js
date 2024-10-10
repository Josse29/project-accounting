const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/serverless-side/database/myapps.db");
export default db;

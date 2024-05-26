const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./serverless-side/database/myapps.db")
module.exports = db
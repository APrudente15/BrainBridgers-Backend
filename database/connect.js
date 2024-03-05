const { Pool } = require("pg");

const db = new Pool({
    connectionString: process.env['DATABASE_URL']
})

console.log("DB connection established.")

module.exports = db;
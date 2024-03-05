const fs = require('fs');
require('dotenv').config();

const db = require("./connect");

const sql = fs.readFileSync('./database/seed.sql').toString();

db.query(sql)
    .then(data => {
        console.log(data);
        console.log("Set-up complete.");
    })
    .catch(error => console.log(error))
    .finally(() => db.end());
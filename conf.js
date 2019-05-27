const mysql = require('mysql')
const connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'monkichi662',
    database: 'wilders',
})

module.exports = connection
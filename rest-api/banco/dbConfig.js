const mysql = require('mysql');

const connection = mysql.createPool({
    host: 'localhost',
    port: 33068,
    user: 'root',
    password: 'root',
    database: 'db_portfolio',
});

module.exports = connection;
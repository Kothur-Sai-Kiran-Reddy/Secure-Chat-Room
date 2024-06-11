const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "SaiLok@0209",
    database: 'secure_chat_room.sql'
});

const db = pool.promise();

module.exports = db;

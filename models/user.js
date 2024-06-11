const db = require('../config/database');

const User = {
  create: (userData, callback) => {
    const query = 'INSERT INTO users SET ?';
    db.query(query, userData, callback);
  },
  findByUserId: (userId, callback) => {
    const query = 'SELECT * FROM users WHERE userId = ?';
    db.query(query, [userId], callback);
  }
};

module.exports = User;

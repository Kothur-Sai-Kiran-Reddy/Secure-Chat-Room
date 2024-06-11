const db = require('../config/database');

const FriendRequest = {
  create: (requestData, callback) => {
    const query = 'INSERT INTO friend_requests SET ?';
    db.query(query, requestData, callback);
  },
  findByUserId: (userId, callback) => {
    const query = 'SELECT * FROM friend_requests WHERE receiverId = ? OR senderId = ?';
    db.query(query, [userId, userId], callback);
  },
  updateStatus: (id, status, callback) => {
    const query = 'UPDATE friend_requests SET status = ? WHERE id = ?';
    db.query(query, [status, id], callback);
  }
};

module.exports = FriendRequest;

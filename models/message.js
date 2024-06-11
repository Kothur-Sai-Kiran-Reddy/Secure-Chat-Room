const db = require('../config/database');

const Message = {
  create: (messageData, callback) => {
    const query = 'INSERT INTO messages SET ?';
    db.query(query, messageData, callback);
  },
  findByChatRoomId: (chatRoomId, callback) => {
    const query = 'SELECT * FROM messages WHERE chatRoomId = ? ORDER BY sentAt';
    db.query(query, [chatRoomId], callback);
  }
};

module.exports = Message;

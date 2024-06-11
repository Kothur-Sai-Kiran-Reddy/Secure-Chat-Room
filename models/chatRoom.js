const db = require('../config/database');

const ChatRoom = {
  create: (roomData, callback) => {
    const query = 'INSERT INTO chat_rooms SET ?';
    db.query(query, roomData, callback);
  },
  findByRoomId: (roomId, callback) => {
    const query = 'SELECT * FROM chat_rooms WHERE roomId = ?';
    db.query(query, [roomId], callback);
  },
  addParticipant: (roomId, userId, callback) => {
    const query = 'INSERT INTO chat_room_participants (chatRoomId, userId) VALUES (?, ?)';
    db.query(query, [roomId, userId], callback);
  },
  getParticipants: (roomId, callback) => {
    const query = 'SELECT * FROM chat_room_participants WHERE chatRoomId = ?';
    db.query(query, [roomId], callback);
  }
};

module.exports = ChatRoom;

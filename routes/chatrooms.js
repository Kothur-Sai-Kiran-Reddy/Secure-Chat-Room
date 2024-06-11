const express = require('express');
const { check, validationResult } = require('express-validator');
const ChatRoom = require('../models/chatRoom');
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/chatrooms', authMiddleware, [
  check('roomId').not().isEmpty(),
  check('name').not().isEmpty(),
  check('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { roomId, name, password } = req.body;
  const userId = req.user.userId;
  try {
    User.findByUserId(userId, (err, userResults) => {
      if (err || userResults.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }
      const user = userResults[0];
      if (!user.isPrime) {
        return res.status(403).json({ error: 'Only prime members can create chat rooms' });
      }
      const newChatRoom = { roomId, createdBy: user.id, name, password };
      ChatRoom.create(newChatRoom, (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Server error' });
        }
        res.json({ message: 'Chat room created successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/joinroom', authMiddleware, [
  check('roomId').not().isEmpty(),
  check('password').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { roomId, password } = req.body;
  const userId = req.user.userId;
  try {
    ChatRoom.findByRoomId(roomId, (err, roomResults) => {
      if (err || roomResults.length === 0) {
        return res.status(400).json({ error: 'Room not found' });
      }
      const chatRoom = roomResults[0];
      if (chatRoom.password !== password) {
        return res.status(400).json({ error: 'Incorrect password' });
      }
      ChatRoom.getParticipants(chatRoom.id, (err, participants) => {
        if (err) {
          return res.status(500).json({ error: 'Server error' });
        }
        if (participants.length >= chatRoom.maxCapacity) {
          return res.status(400).json({ error: 'Chat room is full' });
        }
        User.findByUserId(userId, (err, userResults) => {
          if (err || userResults.length === 0) {
            return res.status(400).json({ error: 'User not found' });
          }
          const user = userResults[0];
          if (!user.isPrime && participants.length > 0) {
            if (user.availCoins < 150) {
              return res.status(400).json({ error: 'Insufficient coins' });
            }
            user.availCoins -= 150;
          }
          ChatRoom.addParticipant(chatRoom.id, user.id, (err, results) => {
            if (err) {
              return res.status(500).json({ error: 'Server error' });
            }
            res.json({ message: 'Joined chat room successfully' });
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

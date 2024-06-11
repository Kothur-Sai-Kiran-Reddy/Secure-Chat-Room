const express = require('express');
const FriendRequest = require('../models/friendRequest');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/friend-requests', authMiddleware, async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.userId;
  try {
    const newFriendRequest = { senderId, receiverId };
    FriendRequest.create(newFriendRequest, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      res.json({ message: 'Friend request sent' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/friend-requests', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  try {
    FriendRequest.findByUserId(userId, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/friend-requests/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    FriendRequest.updateStatus(id, status, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      res.json({ message: 'Friend request status updated' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

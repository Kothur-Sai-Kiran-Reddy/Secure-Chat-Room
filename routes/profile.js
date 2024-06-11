const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  try {
    User.findByUserId(userId, (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }
      const user = results[0];
      res.json({
        userId: user.userId,
        name: user.name,
        phone: user.phone,
        availCoins: user.availCoins,
        isPrime: user.isPrime
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

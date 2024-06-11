const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/database');

// User registration
router.post('/register', async (req, res) => {
    const { userId, deviceId, name, phone, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (userId, deviceId, name, phone, password) VALUES (?, ?, ?, ?, ?)', [userId, deviceId, name, phone, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE userId = ?', [userId]);
        const user = rows[0];
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});

module.exports = router;

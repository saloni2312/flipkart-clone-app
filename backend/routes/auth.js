const express = require('express');
const db = require('../db');
const router = express.Router();

// Simple JWT-less auth for the clone (storing user in local storage on frontend)
// In a real app, use bcrypt and JWT.

// POST /api/auth/register
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });

    try {
        const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, password);
        const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(result.lastInsertRowid);
        res.json({ success: true, user });
    } catch (e) {
        if (e.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Registration failed' });
    }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare('SELECT id, name, email FROM users WHERE email = ? AND password = ?').get(email, password);

    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

module.exports = router;

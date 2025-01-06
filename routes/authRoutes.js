const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', async (req, res) => {
    const db = req.app.locals.db;
    await register(req, res, db);
});

router.post('/login', async (req, res) => {
    const db = req.app.locals.db;
    await login(req, res, db);
});

module.exports = router;

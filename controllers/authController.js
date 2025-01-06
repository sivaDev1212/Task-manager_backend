const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = '11422';

exports.register = async (req, res, db) => {
    const { email, password } = req.body;
    // console.log('register',req.body);
    

    try {
        console.log("db",db);
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [
            email,
            hashedPassword,
        ]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.login = async (req, res, db) => {
    const { email, password } = req.body;

    try {
        const [user] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (user.length === 0) return res.status(404).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ user_id: user[0].user_id, email: user[0].email }, JWT_SECRET, {
            expiresIn: '1h',
        });
        // console.log('id',user);
        
        res.json({ token, id: user[0].user_id });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

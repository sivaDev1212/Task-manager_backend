const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = 5500;

app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
(async () => {
    const db = await connectDB();
    app.locals.db = db; // Attach DB instance to the app
})();

// Routes
app.use('/auth', authRoutes);
app.use('/api', itemRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

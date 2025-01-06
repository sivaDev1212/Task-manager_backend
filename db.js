const mysql = require('mysql2/promise');
require('dotenv').config();

const connectDB = async () => {
    try {
        
        const connection = await mysql.createPool({
            host: process.env.DB_HOST, // Replace with your DB host
            user: process.env.DB_USER,      // Replace with your DB user
            password: process.env.DB_PASSWORD,      // Replace with your DB password
            database: process.env.DB_NAME, // Replace with your DB name
            port: process.env.DB_PORT
        });
        // console.log('MySQL connected successfully',connection);
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

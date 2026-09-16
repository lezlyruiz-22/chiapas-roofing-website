const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true })); // Lets server read standard form data
app.use(express.json()); // Lets server read JSON data

// 1. Connect to your MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4763MatheyRd', // <-- Put your MySQL password here!
    database: 'form_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database!');
    
    // 2. Automatically create the table if it doesn't exist yet
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS leads (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            email VARCHAR(100),
            phone VARCHAR(20),
            source VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    db.query(createTableQuery, (err) => {
        if (err) console.error('Error creating table:', err);
    });
});

// 3. Create the route to handle form submissions
app.post('/submit-lead', (req, require, res) => {
    const { firstName, lastName, email, phone, source } = req.body;
    
    const insertQuery = `INSERT INTO leads (first_name, last_name, email, phone, source) VALUES (?, ?, ?, ?, ?)`;
    
    db.query(insertQuery, [firstName, lastName, email, phone, source], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving to database.');
        }
        res.send('Success! Your estimate request has been logged.');
    });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Create a MySQL connection pool using your Aiven DATABASE_URL
const pool = mysql.createPool(process.env.DATABASE_URL);

// Initialize table on startup with all 5 form fields
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS estimate_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(50),
        source VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('MySQL Database connected and table verified.');
  } catch (err) {
    console.error('Database setup error:', err);
  }
}
initDb();

// Endpoint handling form submissions from index.js
app.post('/api/submit', async (req, res) => {
  const { firstName, lastName, email, phone, source } = req.body;
  
  try {
    await pool.execute(
      'INSERT INTO estimate_submissions (first_name, last_name, email, phone, source) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone, source]
    );
    res.status(200).json({ message: 'Submitted successfully!' });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Database error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
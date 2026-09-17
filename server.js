const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Create a MySQL connection pool using your Aiven DATABASE_URL
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize table on startup
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('MySQL Database connected and table verified.');
  } catch (err) {
    console.error('Database setup error:', err);
  }
}
initDb();

app.post('/api/submit', async (req, res) => {
  const { name, email } = req.body;
  
  try {
    await pool.execute(
      'INSERT INTO submissions (name, email) VALUES (?, ?)',
      [name, email]
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
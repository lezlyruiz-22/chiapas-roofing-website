const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).catch(err => console.error('Database setup error:', err));

app.post('/api/submit', async (req, res) => {
  const { name, email } = req.body;
  
  try {
    await pool.query(
      'INSERT INTO submissions (name, email) VALUES ($1, $2)',
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
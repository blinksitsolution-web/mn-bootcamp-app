
require('dotenv').config();

const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(express.json({ limit: '10kb' }));

// Database initialization
db.serialize(() => {
  db.run(
    `CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error('Database initialization failed:', err);
        process.exit(1);
      }

      db.run(
        'INSERT INTO users (id, name, email) VALUES (?, ?, ?)',
        [1, 'ama', 'ama@example.com']
      );

      db.run(
        'INSERT INTO users (id, name, email) VALUES (?, ?, ?)',
        [2, 'kofi', 'kofi@example.com']
      );
    }
  );
});

// User endpoint
app.get('/user', (req, res) => {
  const name = String(req.query.name || '');

  if (!/^[a-z]{1,20}$/i.test(name)) {
    return res.status(400).json({
      error: 'Invalid name'
    });
  }

  db.all(
    'SELECT id, name, email FROM users WHERE name = ?',
    [name],
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);

        return res.status(500).json({
          error: 'Internal server error'
        });
      }

      res.json(rows);
    }
  );
});

// Search endpoint - JSON response prevents HTML injection
app.get('/search', (req, res) => {
  const query = String(req.query.q || '');

  res.json({
    results: `Results for ${query}`
  });
});

// Settings endpoint - allowlisted properties
app.get('/settings', (req, res) => {
  let data;

  try {
    data = JSON.parse(req.query.data || '{}');
  } catch {
    return res.status(400).json({
      error: 'Invalid JSON'
    });
  }

  if (
    !data ||
    typeof data !== 'object' ||
    Array.isArray(data)
  ) {
    return res.status(400).json({
      error: 'Invalid settings object'
    });
  }

  const allowedThemes = ['light', 'dark'];

  res.json({
    theme: allowedThemes.includes(data.theme)
      ? data.theme
      : 'light'
  });
});

// Start application
app.listen(3000, '127.0.0.1', () => {
  console.log('Server running on http://localhost:3000');
});

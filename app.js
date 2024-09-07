// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000;

// MySQL connection configuration
const dbConfig = {
  host: 'database-1.crwwqk02ennr.ap-south-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'EAN90jI8FLMwi5i3',
  database: 'test_db'
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Use cors middleware
app.use(cors());

// Function to check database connection
const checkDbConnection = (callback) => {
  connection.connect((err) => {
    if (err) {
      callback(err);
    } else {
      connection.query('SELECT 1 + 1 AS result', (error, results) => {
        // connection.end(); // Close the connection
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    }
  });
};

// Define an API endpoint to check DB connection
app.get('/api/check-db', (req, res) => {
  checkDbConnection((err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Database connection failed', error: err.message });
    } else {
      res.status(200).json({ success: true, message: 'RDS MySQL Database is connected', result: results[0].result });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

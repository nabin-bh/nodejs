const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_crud',
    port: '8889'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Create a new record
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            res.sendStatus(500);
        } else {
            res.status(201).json({ id: result.insertId, name, email });
        }
    });
});

// Get all records
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving users:', err);
            res.sendStatus(500);
        } else {
            res.json(result);
        }
    });
});

// Get a single record by ID
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error retrieving user:', err);
            res.sendStatus(500);
        } else if (result.length === 0) {
            res.sendStatus(404);
        } else {
            res.json(result[0]);
        }
    });
});

// Update a record by ID
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.sendStatus(500);
        } else if (result.affectedRows === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    });
});

// Delete a record by ID
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.sendStatus(500);
        } else if (result.affectedRows === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

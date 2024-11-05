// ייבוא המודולים הדרושים
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// יצירת מופע של האפליקציה
const app = express();
const PORT = process.env.PORT || 5000;

// אפשר CORS
app.use(cors());
app.use(express.json());

// יצירת חיבור למסד הנתונים MySQL
const connection = mysql.createConnection({
    
host: 'localhost', // כתובת השרת (לרוב 'localhost' אם אתה מריץ את זה במחשב המקומי)
port: 3306,
user: 'root', // שם המשתמש שלך ב-MySQL
    password: '123456', // הסיסמה שלך
    database: 'synagogue' // שם מסד הנתונים שלך
});

// חיבור למסד הנתונים
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

// יצירת API לקבלת רשימת חברים
app.get('/friends_manager', (req, res) => {
    connection.query('SELECT * FROM synagogue.community_members;', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching members' });
        }
        console.log(results);
        
        send.json(results);

    });
});

// יצירת API להוספת חבר חדש
app.post('/api/members', (req, res) => {
    const { first_name, last_name, phone, email, address, password, is_admin } = req.body;

    const sql = 'INSERT INTO community_members (first_name, last_name, phone, email, address, password, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [first_name, last_name, phone, email, address, password, is_admin || false];

    connection.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error adding member' });
        }
        res.status(201).json({ id: result.insertId, first_name, last_name });
    });
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

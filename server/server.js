// ייבוא המודולים הדרושים
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const connection= require("./config/configDB");

// יצירת מופע של האפליקציה
const app = express();
const PORT = process.env.PORT || 5000;

// אפשר CORS
app.use(cors());
app.use(express.json());

// // יצירת חיבור למסד הנתונים MySQL
// const connection = mysql.createConnection({
// host: 'localhost', // כתובת השרת (לרוב 'localhost' אם אתה מריץ את זה במחשב המקומי)
// port: 3306,
// user: 'root', // שם המשתמש שלך ב-MySQL
// password: '123456', // הסיסמה שלך
// database: 'synagogue' // שם מסד הנתונים שלך
// });

// חיבור למסד הנתונים
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

//  לקבלת רשימת חברים
app.get('/friends-manager', (req, res) => {
    const sql = 'SELECT * FROM synagogue.community_members2';
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching members' });
        }
        res.send(results);
    });
});
// עדכון הרשאת משתמש
app.put('/friends-manager/:id', (req, res) => {
    const { id } = req.params;
    const { is_admin } = req.body;
    const sql = 'UPDATE community_members SET is_admin = ? WHERE id = ?';
    const values = [is_admin, id];
    connection.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating admin status' });
        }
        res.status(200).json({ message: 'Admin status updated successfully' });
    });
})


// יצירת API להוספת חבר חדש
app.post('/api/members', (req, res) => {
    const { first_name, last_name, phone, email, address, password, is_admin } = req.body;

    const sql = 'INSERT INTO community_members2 (first_name, last_name, phone, email, address, password, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [first_name, last_name, phone, email, address, password, is_admin || false];

    connection.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error adding member' });
        }
        res.status(201).json({ id: result.insertId, first_name, last_name });
    });
});

const appTimes = require("./route/times");
app.use("/shabbatTimes/", appTimes);

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

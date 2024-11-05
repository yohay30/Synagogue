const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', // או ה-IP של השרת אם הוא לא מקומי
    user: 'your_username', // שם המשתמש שלך ב-MySQL
    password: 'your_password', // הסיסמה שלך
    database: 'your_database' // שם מסד הנתונים שיצרת
});

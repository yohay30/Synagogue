const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost', // כתובת השרת (לרוב 'localhost' אם אתה מריץ את זה במחשב המקומי)
    port: 3306,
    user: 'root', // שם המשתמש שלך ב-MySQL
    password: '123456', // הסיסמה שלך
    database: 'synagogue' // שם מסד הנתונים שלך
    });
    module.exports = connection;
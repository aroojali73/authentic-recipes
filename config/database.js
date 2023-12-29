const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Salmankhan18!',
    database: 'authentic_recipes'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Make the db connection available throughout your app
module.exports = db;

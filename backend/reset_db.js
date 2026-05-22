const mysql = require('mysql2/promise');
require('dotenv').config();

async function resetDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        });

        console.log(`Dropping database '${process.env.DB_NAME}'...`);
        await connection.query(`DROP DATABASE IF EXISTS \`${process.env.DB_NAME}\`;`);

        console.log(`Creating database '${process.env.DB_NAME}'...`);
        await connection.query(`CREATE DATABASE \`${process.env.DB_NAME}\`;`);

        console.log('Database reset successfully.');
        await connection.end();
    } catch (err) {
        console.error('Error resetting database:', err);
    }
}

resetDB();

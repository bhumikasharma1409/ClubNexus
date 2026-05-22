const mysql = require('mysql2/promise');

async function test(password) {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: password
        });
        console.log(`Success with password: '${password}'`);
        await connection.end();
        return true;
    } catch (err) {
        // console.log(`Failed with password: '${password}' - ${err.message}`);
        return false;
    }
}

(async () => {
    console.log('Testing connection with common passwords...');

    if (await test('')) {
        console.log('\n>>> FOUND: Your database has NO PASSWORD. Please set DB_PASS= in your .env file.');
        return;
    }

    if (await test('root')) {
        console.log('\n>>> FOUND: Your database password is "root". Please set DB_PASS=root in your .env file.');
        return;
    }

    if (await test('password')) {
        console.log('\n>>> FOUND: Your database password is "password". Please set DB_PASS=password in your .env file.');
        return;
    }

    if (await test('bhanvi')) {
        console.log('\n>>> FOUND: Your database password is "bhanvi". Please set DB_PASS=bhanvi in your .env file.');
        return;
    }

    console.log('\n>>> Could not automatically detect the password. Please check what password you use to log in to MySQL Workbench.');
})();

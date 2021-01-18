const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'C@d-3824414',
    database: 'school',
    port: 3306
};

const connection = mysql.createPool(config);

/* connection.connect(err => {
    err ? console.error(err) : console.log('Conexion exitosa')
}) */

module.exports = connection;


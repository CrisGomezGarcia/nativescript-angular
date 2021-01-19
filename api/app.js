const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    connection = require('./database/index');

const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

let router = express.Router();
app.use(router);

router.get('/', (req, res) => {
    res.send("Hola, mundo!")
})

// Método para obtener todos los usuarios existentes en la base de datos
app.get('/students', (req, res) => {
    connection.query('SELECT * FROM students',
        (err, data, fields) => {
            if (err) {
                console.error(err);
            } else {
                res.json(data);
            }
        })
});

// Método para obtener un solo rgistro de tipo usuario de la base de datos que coincida con la cláusula where
app.get('/students/:matricule', (req, res) => {
    let matricule = req.params.matricule;
    connection.query('SELECT * FROM students WHERE matricule = ?',
        [matricule],
        (err, result, fields) => {
            if (err) {
                res.json({ "error": true });
                console.error(err);
            } else {
                res.json(result);
                /* console.info(result); */
            }
        });
});

// Método para hacer el logueo de un usuario y guardar su token
app.post('/students/login', (req, res) => {
    const matricule = req.body.matricule;
    const password = req.body.password;
    let data = "";
    let success = false;
    connection.query('SELECT matricule FROM students_session WHERE matricule = ? AND password = MD5(?)',
        [matricule, password],
        (err, result) => {
            if (err) {
                res.json({ "error": true });
                console.error(err);
            } else {
                if (result.length > 0) {
                    data = result;
                    success = true;
                } else {
                    data = null;
                    success = false;
                }

                res.json({
                    "data": {
                        "fields": data,
                        "success": success
                    }
                });
            }
        });
});

// Método para insertar un nuevo registro de tipo usuario en la tabla de la base de datos
app.post('/students', (req, res) => {
    const matricule = req.body.matricule;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const country = req.body.country;
    connection.query('INSERT INTO students(matricule, name, lastname, age, country) VALUES(?, ?, ?, ?, ?)',
        [matricule, name, lastname, parseInt(age), country],
        (err, result) => {
            if (err) {
                res.json({ "error": true });
                console.error(err);
            } else {
                /* console.info(result); */
                res.json({ "error": false });
            }
        });
});

// Método para eliminar un registro de la tabla de la base de datos
app.delete('/students/:matricule', (req, res) => {
    const matricule = req.params.matricule;
    connection.query('DELETE FROM students WHERE matricule = ?',
        [matricule],
        (err, result) => {
            if (err) {
                res.json({ "error": true });
                console.error(err);
            } else {
                res.json({ "error": false });
                /* console.info(result); */
            }
        });
});

// Método para actualizar los datos de un registro en la base de datos
app.put('/students', (req, res) => {
    const matricule = req.body.matricule;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const country = req.body.country;
    connection.query('UPDATE students SET name = ?, lastname = ?, age = ?, country = ? WHERE matricule = ?',
        [name, lastname, age, country, matricule],
        (err, result) => {
            if (err) {
                res.json({ "error": true });
                console.error(err);
            } else {
                res.json({ "error": false });
            }
        });
});


// Método que abre el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('El servidor de Nodejs está corriendo en http://localhost:3000');
});


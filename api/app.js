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


/* <------------------------------------------------------ Métodos de consulta ------------------------------------------------------> */
// #region

// Método para hacer el logueo de un usuario y guardar su matrícula y su tipo de sesión
app.post('/sessions/login', (req, res) => {
    const MATRICULE = req.body.matricule;
    const PASSWORD = req.body.password;
    let data = "";
    let success = false;
    connection.query('CALL select_sessions_login(?, ?)',
        [MATRICULE, PASSWORD],
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

// Método para obtener todos los registros que sean de la clasificacion ALUMNO de la tabla personal_information
app.get('/information/students', (req, res) => {
    connection.query('CALL select_personalInformation_students()',
        (err, data, fields) => {
            if (err) {
                console.error(err);
            } else {
                res.json(data);
            }
        })
});

// Método para obtener un solo rgistro de tipo usuario de la base de datos que coincida con la cláusula where
app.get('/information/students/:matricule', (req, res) => {
    let MATRICULE = req.params.matricule;
    connection.query('CALL select_personalInformation_studentsWmatricule(?)',
        [MATRICULE],
        (err, result, fields) => {
            if (err) {
                res.json({ "error": true });
                console.error(err);
            } else {
                res.json(result);
            }
        });
});

//#endregion

/* <------------------------------------------------------ Métodos de inserción ------------------------------------------------------> */
// #region

// Método para insertar un nuevo registro en la tabla personal_information
app.post('/information/insert', (req, res) => {
    const MATRICULE = req.body.matricule;
    const NAME = req.body.name;
    const LASTNAME = req.body.lastname;
    const AGE = req.body.age;
    const COUNTRY = req.body.country;
    const CLASIFICATION = req.body.clasification;
    // connection.query('INSERT INTO students(matricule, name, lastname, age, country) VALUES(?, ?, ?, ?, ?)',
    connection.query('CALL insert_personalInformation(?, ?, ?, ?, ?, ?)',
        [MATRICULE, NAME, LASTNAME, parseInt(AGE), COUNTRY, CLASIFICATION],
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

// Método para insertar un nuevo registro en la tabla clasification
app.post('/clasification/insert', (req, res) => {
    const ID = req.body.id;
    const DESCRIPTION = req.body.description;
    connection.query('CALL insert_clasification(?, ?)',
        [ID, DESCRIPTION],
        (err, result) => {
            if (err) {
                res.json({ "error": true });
            } else {
                res.json({ "error": false });
            }
        });
});

// Método para insertar un nuevo registro en la tabla sessions_type
app.post('/sessionstype/insert', (req, res) => {
    const ID = req.body.id;
    const NAME = req.body.name;
    const DESCRIPTION = req.body.description;
    connection.query('CALL insert_sessionsType(?, ?, ?)',
        [ID, NAME, DESCRIPTION],
        (err, result) => {
            if (err) {
                res.json({ "error": true });
            } else {
                res.json({ "error": false });
            }
        })
});

// Método para insertar un nuevo registro en la tabla sessions
app.post('/sessions/insert', (req, res) => {
    const MATRICULE = req.body.matricule;
    const PASSWORD = req.body.password;
    const SESSIONTYPE = req.body.sessiontype;
    connection.query('CALL insert_sessions(?, ?, ?)',
        [MATRICULE, PASSWORD, SESSIONTYPE],
        (err, result) => {
            if (err) {
                res.json({ "error": true });
            } else {
                res.json({ "error": false });
            }
        })
})

// #endregion

/* <------------------------------------------------------ Métodos de actualización ------------------------------------------------------> */
//#region 

// Método para actualizar los datos de un registro en la tabla personal_information
app.put('/information/update', (req, res) => {
    const MATRICULE = req.body.matricule;
    const NAME = req.body.name;
    const LASTNAME = req.body.lastname;
    const AGE = req.body.age;
    const COUNTRY = req.body.country;
    const CLASIFICATION = req.body.clasification;
    connection.query('CALL update_personalInformation(?, ?, ?, ?, ?, ?)',
        [MATRICULE, NAME, LASTNAME, AGE, COUNTRY, CLASIFICATION],
        (err, result) => {
            if (err) {
                res.json({ "error": true });
                console.error(err);
            } else {
                res.json({ "error": false });
            }
        });
});

//#endregion

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





// Método que abre el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('El servidor de Nodejs está corriendo en http://localhost:3000');
});


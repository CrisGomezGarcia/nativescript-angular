const { Key } = require('protractor');

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    connection = require('./database/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

let router = express.Router();
app.use(router);

router.get('/', (req, res) => {
    res.send("Hola, mundo!")
})



/* <------------------------------------------------------ Métodos de inserción ------------------------------------------------------> */
// #region

// Método para insertar un nuevo registro en la tabla "personal_information"
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

// Método para insertar un nuevo registro en la tabla "clasification"
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

// Método para insertar un nuevo registro en la tabla "sessions_type"
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

// Método para insertar un nuevo registro en la tabla "sessions"
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
});

// Método para insertar un nuevo registro en la tabla "courses"
app.post('/courses/insert', (req, res) => {
    const ID = req.body.id;
    const NAME = req.body.name;
    const DESCRIPTION = req.body.description;
    connection.query('CALL insert_courses(?, ?, ?)',
        [ID, NAME, DESCRIPTION],
        (err, result) => {
            if (err) {
                res.json({ "error": true });
            } else {
                res.json({ "error": false });
            }
        });
});

// Método para insertar un nuevo registro en la tabla "students_has_courses"
app.post('/hascourses/insert', (req, res) => {
    const MATRICULE = req.body.matricule;
    const COURSE = req.body.course;
    connection.query('CALL insert_studentsHasCourses(?, ?)',
        [MATRICULE, COURSE],
        (err, result) => {
            if (err) {
                res.json({ "matricule": MATRICULE, "error": true });
            } else {
                res.json({ "matricule": MATRICULE, "error": false });
            }
        });
});

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

/* <------------------------------------------------------ Métodos de consulta ------------------------------------------------------> */
// #region

// Método para hacer el logueo de un usuario
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

// Método para obtener todos los registros que sean de la clasificació 'ALUMNO' pero que no están inscritos en algún curso
app.get('/information/students/withoutcourses', (req, res) => {
    connection.query('CALL select_studentsHasCourses_noStudents()',
        (err, data, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
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
        });
});

// Método para obtener un solo registro de tipo usuario de la base de datos que coincida con la cláusula where
app.get('/information/students/:matricule', verifyToken, (req, res) => {
    const MATRICULE = req.params.matricule;
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

// Método para obtener todos los registros de la tabla courses
app.get('/courses', (req, res) => {
    connection.query('CALL select_courses()',
        (err, data, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
});

app.get('/courses/:id', (req, res) => {
    const ID = req.params.id;
    connection.query('CALL select_courses_id(?)',
        [ID],
        (err, result, fields) => {
            if (err) {
                res.json({ "error": true });
                console.log(err);
            } else {
                res.json(result);
            }
        });
})

// Método para obtener los registros de los alumnos inscritos en un curos específico
app.get('/courses/students/:id', verifyToken, (req, res) => {
    const ID = req.params.id;
    connection.query('CALL select_studentsHasCourses_students(?)',
        [ID],
        (err, result, fields) => {
            if (err) {
                console.log(err);
                res.json({ "error": true })
            } else {
                res.json(result);
            }
        });
})

//#endregion


/* <------------------------------------------------------ Métodos de eliminación ------------------------------------------------------> */
//#region
// Método para eliminar un registro de la tabla de la base de datos
app.delete('/information/delete/:matricule', (req, res) => {
    const MATRICULE = req.params.matricule;
    connection.query('CALL delete_personalInformation(?)',
        [MATRICULE],
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

//#endregion



// Método que abre el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('El servidor de Nodejs está corriendo en http://localhost:3000');
});


function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    const matricule = req.headers.authorization.split(' ')[1];
    console.log(matricule);
    if (matricule === null) {
        return res.status(401).send('Unauthorized request');
    }

    next();
}


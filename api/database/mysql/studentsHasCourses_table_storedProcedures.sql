#STORED PROCEDURES PARA REALIZAR OPERACIONES EN LA TABLA students_has_courses

#STORED PROCEDURE PARA CONSULTAR LOS REGISTROS DE LOS ALUMNOS QUE PERTENECEN A UN CURSO ESPECIFICO
DELIMITER $$
	CREATE PROCEDURE select_studentsHasCourses_students(
		IN _ID VARCHAR(10)
    )
	BEGIN
		SELECT 
			personal_information.matricule,
            personal_information.name,
            personal_information.lastname,
            personal_information.age
		FROM
			personal_information JOIN students_has_courses 
		ON personal_information.matricule = students_has_courses.matricule
		JOIN courses
		ON students_has_courses.course = courses.id
        WHERE 
			personal_information.clasification = 'ALUM'
		AND
			courses.id = _ID;
	END$$
DELIMITER $$

#STORED PROCEDURE PARA CONSULTAR A LOS ALUMNOS QUE NO PERTENECEN A NINGÚN CURSO
DELIMITER $$
	CREATE PROCEDURE select_studentsHasCourses_noStudents()
    BEGIN
		SELECT
			personal_information.matricule,
            personal_information.name,
            personal_information.lastname,
			personal_information.age,
            personal_information.clasification
		FROM personal_information LEFT JOIN students_has_courses
		ON personal_information.matricule = students_has_courses.matricule
		WHERE clasification = 'ALUM' AND students_has_courses.id IS NULL;
    END$$
DELIMITER $$

#STORED PROCUEDURE PARA INSERTAR UN REGISTRO EN LA TABLA
DELIMITER $$
	CREATE PROCEDURE insert_studentsHasCourses(
		IN _MATRICULE VARCHAR(10),
        IN _COURSE VARCHAR(10)
	)
    BEGIN
		INSERT INTO students_has_courses(matricule, course)
        VALUES(_MATRICULE, _COURSE);
    END$$
DELIMITER $$

####################################################################################################
#INSERCIONES

#CONSULTAS
CALL select_studentsHasCourses_noStudents();
SELECT * FROM students_has_courses;

delete from students_has_courses;

use school;

select * from personal_information;

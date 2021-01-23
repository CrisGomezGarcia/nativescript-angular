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
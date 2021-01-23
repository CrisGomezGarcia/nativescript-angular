#STORED PROCEDURES PARA REALIZAR OPERACIONES A LA TABLA personal_information

#STORED PROCEDURE PARA INSERTAR UN REGISTRO
DELIMITER $$
	CREATE PROCEDURE insert_personalInformation(
		IN _MATRICULE VARCHAR(10),
		IN _NAME VARCHAR(50),
		IN _LASTNAME VARCHAR(50),
		IN _AGE INT,
		IN _COUNTRY VARCHAR(150),
		IN _CLASIFICATION VARCHAR(6)
	)
	BEGIN
		INSERT INTO personal_information(matricule, name, lastname, age, country, clasification)
		VALUES(_MATRICULE, _NAME, _LASTNAME, _AGE, _COUNTRY, _CLASIFICATION);
	END$$
DELIMITER $$

#STORED PROCEDURE PARA CONSULTAR TODOS LOS REGISTROS
DELIMITER $$
	CREATE PROCEDURE select_personalInformation()
	BEGIN
		SELECT matricule, name, lastname, age, country, clasification FROM personal_information;
	END$$
DELIMITER $$

#STORED PROCEDURE PARA ACTUALIZAR UN REGISTRO
DELIMITER $$
	CREATE PROCEDURE update_personalInformation(
		IN _MATRICULE VARCHAR(10),
		IN _NAME VARCHAR(50),
		IN _LASTNAME VARCHAR(50),
		IN _AGE INT,
		IN _COUNTRY VARCHAR(150),
		IN _CLASIFICATION VARCHAR(6)
	)
	BEGIN
		UPDATE personal_information SET 
			name = _NAME,
            lastname = _LASTNAME,
            age = _AGE,
            country = _COUNTRY,
            clasification = _CLASIFICATION
		WHERE matricule = _MATRICULE;
	END$$
DELIMITER $$

#STORED PROCEDURE PARA ELIMINAR UN REGISTRO
DELIMITER $$
	CREATE PROCEDURE delete_personalInformation(
		IN _MATRICULE VARCHAR(10)
    )
    BEGIN
		DELETE FROM personal_information WHERE matricule = _MATRICULE;
    END$$
DELIMITER $$

#STORED PROCEDURE PARA CONSULTAR LOS REGISTROS QUE TENGAN COMO CLASIFICACION "ALUMNO"
DELIMITER $$
	CREATE PROCEDURE select_personalInformation_students()
    BEGIN
		SELECT matricule, name, lastname, age, country, clasification FROM personal_information
        WHERE clasification = 'ALUM';
    END$$
DELIMITER $$

#STORED PROCEDURE PARA CONSULTAR EL REGISTRO DE UN ALUMNO CON SU MATRÍCULA
DELIMITER $$
	CREATE PROCEDURE select_personalInformation_studentsWmatricule(
		IN _MATRICULE VARCHAR(10)
    )
    BEGIN
		SELECT matricule, name, lastname, age, country, clasification FROM personal_information
        WHERE clasification = 'ALUM' AND matricule = _MATRICULE;
    END$$
DELIMITER $$
##############################################################################################################
#INSERCIONES

#CONSULTAS

call select_clasification();
CALL select_personalInformation_students();
call select_sessions();
call select_sessionsType();
call delete_personalInformation('7622497925');

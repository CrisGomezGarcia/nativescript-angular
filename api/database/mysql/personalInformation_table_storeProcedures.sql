#STORED PROCEDURES PARA REALIZAR OPERACIONES A LA TABLA personal_information

#STORE PROCEDURE PARA INSERTAR UN REGISTRO
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

#STORE PROCEDURE PARA CONSULTAR TODOS LOS REGISTROS
DELIMITER $$
	CREATE PROCEDURE select_personalInformation()
	BEGIN
		SELECT matricule, name, lastname, age, country, clasification FROM personal_information;
	END$$
DELIMITER $$

#STORE PROCEDURE PARA ACTUALIZAR UN REGISTRO
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

#STORE PROCEDURE PARA ELIMINAR UN REGISTRO
DELIMITER $$
	CREATE PROCEDURE delete_personalInformation(
		IN _MATRICULE VARCHAR(10)
    )
    BEGIN
		DELETE FROM personal_information WHERE matricule = _MATRICULE;
    END$$
DELIMITER $$

##############################################################################################################
#INSERCIONES

#CONSULTAS

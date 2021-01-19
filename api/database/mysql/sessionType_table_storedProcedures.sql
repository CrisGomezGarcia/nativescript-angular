#STORED PROCEDURES PARA REALIZAR OPERACIONES EN LA TABLA sessions_type

#STORED PROCEDURE PARA INSERTAR UN REGISTRO
DELIMITER $$
	CREATE PROCEDURE insert_sessionsType(
		IN _ID VARCHAR(10),
        IN _NAME VARCHAR(20),
        IN _DESCRIPTION VARCHAR(150)
    )
    BEGIN
		INSERT INTO sessions_type(id, name, description)
        VALUES(_ID, _NAME, _DESCRIPTION);
    END$$
DELIMITER $$

#STORED PROCEDURE PARA CONSULTAR TODOS LOS REGISTROS
DELIMITER $$
	CREATE PROCEDURE select_sessionsType()
    BEGIN
		SELECT id, name, description FROM sessions_type;
    END$$
DELIMITER $$

#STORED PROCEDURE PARA ACTUALIZAR UN REGISTRO
DELIMITER $$
	CREATE PROCEDURE update_sessionsType(
		IN _ID VARCHAR(10),
        IN _NAME VARCHAR(20),
        IN _DESCRIPTION VARCHAR(150)
    )
    BEGIN
		UPDATE sessions_type SET
            name = _NAME,
            description = _DESCRIPTION
		WHERE id = _ID;
    END$$
DELIMITER $$

#STORED PROCEDURE PARA ELIMINAR UN REGISTRO
DELIMITER $$
	CREATE PROCEDURE delete_sessionsType(
		IN _ID VARCHAR(10)
    )
    BEGIN
		DELETE FROM sessions_type WHERE id = _ID;
    END$$
DELIMITER $$

#############################################################################################################
#INSERCIONES

#CONSULTAS
CALL select_sessionsType();
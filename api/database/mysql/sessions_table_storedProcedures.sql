#STORED PROCEDURES PARA REALIZAR OPERACIONES EN LA TABLA sessions

#STORED PROCEDURE PARA INSERTAR UN REGISTRO
DELIMITER $$
	CREATE PROCEDURE insert_sessions(
		IN _MATRICULE VARCHAR(10),
        IN _PASSWORD VARCHAR(150),
        IN _SESSION_TYPE VARCHAR(10)
	)
    BEGIN
		INSERT INTO sessions(matricule, password, created_at, session_type)
        VALUES(_MATRICULE, MD5(_PASSWORD), NOW(), _SESSION_TYPE);
    END$$
DELIMITER $$

#STORED PROCEDURE PARA CONSULTAR TODOS LOS REGISTROS
DELIMITER $$
	CREATE PROCEDURE select_sessions()
    BEGIN
		SELECT id, matricule, password, created_at, session_type FROM sessions;
    END$$
DELIMITER $$

#STORED PROCEDURE PARA ACTUALIZAR UN REGISTRO
DELIMITER $$
	CREATE PROCEDURE update_sessions(
		IN _MATRICULE VARCHAR(10),
        IN _PASSWORD VARCHAR(150),
        IN _SESSION_TYPE VARCHAR(10)
    )
    BEGIN
		UPDATE sessions SET password = _PASSWORD, session_type = _SESSION_TYPE
        WHERE matricule = _MATRICULE;
    END$$
DELIMITER $$

#STORED PROCEDURE PARA ELIMINAR UN REGISTRO
DELIMITER $$
	CREATE PROCEDURE delete_sessions(
		IN _MATRICULE VARCHAR(10)
    )
    BEGIN
		DELETE FROM sessions WHERE matricule = _MATRICULE;
    END$$
DELIMITER $$

#STORED PROCEDURE PARA CONSULTAR UN REGISTRO CON MATRÍCULA Y CONTRASEÑA (LOGIN)
DELIMITER $$
	CREATE PROCEDURE select_sessions_login(
		IN _MATRICULE VARCHAR(10),
        IN _PASSWORD VARCHAR(150)
    )
    BEGIN
		SELECT matricule, session_type FROM sessions WHERE matricule = _MATRICULE AND password = MD5(_PASSWORD);
    END$$
DELIMITER $$
##############################################################################################################
#INSERCIONES

#CONSULTAS
CALL select_sessions_login('2194739254', '2194739254')
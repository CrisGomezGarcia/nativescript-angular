#STORED PROCEDURES PARA REALIZAR OPERACIONES A LA TABLA clasification

#STORE PROCEDURE PARA INSERTAR UN REGISTRO
DELIMITER $$
CREATE PROCEDURE insert_clasification(
	IN _ID VARCHAR(6),
    IN _DESCRIPTION VARCHAR(50)
)
BEGIN
	INSERT INTO clasification(id, description)
    VALUES(_ID, _DESCRIPTION);
END$$
DELIMITER $$

#STORED PROCEDURE PARA CONSULTAR TODOS LOS REGISTROS
DELIMITER $$
CREATE PROCEDURE select_clasification()
BEGIN
	SELECT id, description FROM clasification;
END$$
DELIMITER $$

#STORED PROCEDURE PARA ACTUALIZAR UN REGISTRO
DELIMITER $$
CREATE PROCEDURE update_clasification(
	IN _ID VARCHAR(6),
    IN _DESCRIPTION VARCHAR(50)
)
BEGIN
	UPDATE clasification SET description = _DESCRIPTION
    WHERE id = _ID;
END$$
DELIMITER $$

#STORED PROCEDURE PARA ELIMINAR UN REGISTRO
DELIMITER $$
CREATE PROCEDURE delete_clasification(
	IN _ID VARCHAR(6)
)
BEGIN
	DELETE FROM clasification WHERE id = _ID;
END$$
DELIMITER $$

##############################################################################################################
#INSERCIONES
CALL insert_clasification('ALUM', 'ALUMNO INSCRITO');
CALL insert_clasification('DOCE', 'DOCENTE TIEMPO COMPLETO');
CALL insert_clasification('ADMI', 'ADMINISTRADOR DEL SISTEMA');

#CONSULTAS
CALL select_clasification();

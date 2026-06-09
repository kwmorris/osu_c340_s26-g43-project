-- AI tools were not used in the development of this file

DROP PROCEDURE IF EXISTS DeleteStudent;
DELIMITER //

CREATE PROCEDURE DeleteStudent (
	IN p_deleteID INT
)
BEGIN
    DELETE FROM Students
    WHERE studentID = p_deleteID;
END //

DELIMITER ;


DROP PROCEDURE IF EXISTS CreateAssignment;
DELIMITER //

CREATE PROCEDURE CreateAssignment (
    IN p_name VARCHAR(255),
    IN p_description VARCHAR(1000),
    IN p_dueDate timestamp,
    IN p_points INT
)
BEGIN
    INSERT INTO Assignments (
        name,
        description,
        dueDate,
        points
    ) VALUES (
        p_name,
        p_description,
        p_dueDate,
        p_points
    );
END //

DELIMITER ;
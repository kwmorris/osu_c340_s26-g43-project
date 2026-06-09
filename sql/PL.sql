-- AI tools were not used in the development of this file

DROP PROCEDURE IF EXISTS DeleteStudent;
DELIMITER //

CREATE PROCEDURE DeleteStudent (
	IN p_deleteID VARCHAR(50)
)
BEGIN
    DELETE FROM Students
    WHERE studentID = p_deleteID;
END //

DELIMITER ;


DROP PROCEDURE IF EXISTS UpdateSubmission;
DELIMITER //

CREATE PROCEDURE UpdateSubmission (
    IN p_submissionID INT,
    IN p_assignmentID INT,
    IN p_studentID VARCHAR(50),
    IN p_submissionDate timestamp,
    IN p_submissionNotes VARCHAR(1000),
    IN p_staffID VARCHAR(50),
    IN p_grade DECIMAL(6,2),
    IN p_graderNotes VARCHAR(1000)
)
BEGIN
    UPDATE Submissions
    SET assignmentID = p_assignmentID,
        studentID = p_studentID,
        submissionDate = p_submissionDate,
        submissionNotes = p_submissionNotes,
        staffID = p_staffID,
        grade = p_grade,
        graderNotes = p_graderNotes
    WHERE submissionID = p_submissionID;
END //

DELIMITER ;


DROP PROCEDURE IF EXISTS CreateAssignment;
DELIMITER //

CREATE PROCEDURE CreateAssignment (
	IN p_courseID INT,
    IN p_name VARCHAR(255),
    IN p_description VARCHAR(1000),
    IN p_dueDate timestamp,
    IN p_points INT
)
BEGIN
    INSERT INTO Assignments (
		courseID,
        name,
        description,
        dueDate,
        points
    ) VALUES (
		p_courseID,
        p_name,
        p_description,
        p_dueDate,
        p_points
    );
END //

DELIMITER ;

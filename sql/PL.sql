DROP PROCEDURE IF EXISTS DeleteBenCarterSubmission;
DELIMITER //

CREATE PROCEDURE DeleteSubmission (
	IN p_deleteID INT
)
BEGIN
    DELETE FROM Submissions
    WHERE submissionID = p_deleteID;
END //

DELIMITER ;

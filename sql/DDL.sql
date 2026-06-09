-- AI tools were not used in the development of this file

DROP PROCEDURE IF EXISTS ResetAssignmentTrackerDB;
DELIMITER //

CREATE PROCEDURE ResetAssignmentTrackerDB()
BEGIN
    SET FOREIGN_KEY_CHECKS = 0;

    DROP TABLE IF EXISTS Submissions;
    DROP TABLE IF EXISTS Assignments;
    DROP TABLE IF EXISTS Courses;
    DROP TABLE IF EXISTS Staff;
    DROP TABLE IF EXISTS Students;

    CREATE TABLE Students (
        studentID varchar(50) PRIMARY KEY,
        email varchar(255) UNIQUE NOT NULL,
        firstName varchar(255) NOT NULL,
        lastName varchar(255) NOT NULL
    );

    CREATE TABLE Staff (
        staffID varchar(50) PRIMARY KEY,
        email varchar(255) NOT NULL,
        firstName varchar(255) NOT NULL,
        lastName varchar(255) NOT NULL
    );

    CREATE TABLE Courses (
        courseID int AUTO_INCREMENT PRIMARY KEY,
        courseName varchar(255) NOT NULL,
        courseCode varchar(50) UNIQUE NOT NULL,
        term varchar(50) NOT NULL
    );

    CREATE TABLE Assignments (
        assignmentID int AUTO_INCREMENT PRIMARY KEY,
        courseID int NOT NULL,
        name varchar(255) NOT NULL,
        description varchar(1000) NOT NULL,
        dueDate timestamp NOT NULL,
        points int NOT NULL,
        FOREIGN KEY (courseID) REFERENCES Courses(courseID) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE Submissions (
        submissionID int AUTO_INCREMENT PRIMARY KEY,
        assignmentID int NOT NULL,
        studentID varchar(50) NOT NULL,
        submissionDate timestamp NOT NULL,
        submissionNotes varchar(1000),
        staffID varchar(50),
        grade decimal(6,2),
        graderNotes varchar(100),
        FOREIGN KEY (assignmentID) REFERENCES Assignments(assignmentID) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (studentID) REFERENCES Students(studentID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (staffID) REFERENCES Staff(staffID) ON DELETE SET NULL ON UPDATE CASCADE
    );

    SET FOREIGN_KEY_CHECKS = 1;

    INSERT INTO Students (studentID, email, firstName, lastName)
    VALUES
    ('0096325', 'alice.nguyen@sterra.edu', 'Alice', 'Nguyen'),
    ('0095691', 'ben.carter@sterra.edu', 'Ben', 'Carter'),
    ('0094685', 'maria.lopez@sterra.edu', 'Maria', 'Lopez');

    INSERT INTO Staff (staffID, email, firstName, lastName)
    VALUES
    ('0994884', 'parker.smith@sterra.edu', 'Parker', 'Smith'),
    ('0994815', 'jordan.lee@sterra.edu', 'Jordan', 'Lee'),
    ('0994772', 'taylor.brooks@sterra.edu', 'Taylor', 'Brooks');

    INSERT INTO Courses (courseID, courseName, courseCode, term)
    VALUES
    (1, 'Introduction to Databases', 'CS340', 'Spring 2026'),
    (2, 'General Chemistry', 'CH201', 'Spring 2026'),
    (3, 'College Algebra', 'MTH111', 'Spring 2026');

    INSERT INTO Assignments (assignmentID, courseID, name, description, dueDate, points)
    VALUES
    (15, (SELECT courseID FROM Courses WHERE courseCode = 'CS340'), 'Coleridge Essay', 'Write a five-page analysis on Coleridge', '2026-04-10       23:59:00', 100),
    (172, (SELECT courseID FROM Courses WHERE courseCode = 'MTH111'), 'Algebra 2 Exam', 'Covers weeks 1-6', '2026-04-20 23:59:00', 100),
    (8, (SELECT courseID FROM Courses WHERE courseCode = 'CH201'), 'Chemistry Lab Report', 'Due Monday, partnered', '2026-05-05 23:59:00', 150);

    INSERT INTO Submissions (
        submissionID,
        assignmentID,
        studentID,
        staffID,
        submissionDate,
        submissionNotes,
        grade,
        graderNotes
    )
    VALUES
    (
        1,
        (SELECT assignmentID FROM Assignments WHERE name = 'Coleridge Essay'),
        (SELECT studentID FROM Students WHERE email = 'alice.nguyen@sterra.edu'),
        (SELECT staffID FROM Staff WHERE email = 'parker.smith@sterra.edu'),
        '2026-04-09 18:30:00',
        'Submitted',
        100.00,
        'Well organized and clearly written'
    ),
    (
        2,
        (SELECT assignmentID FROM Assignments WHERE name = 'Coleridge Essay'),
        (SELECT studentID FROM Students WHERE email = 'ben.carter@sterra.edu'),
        (SELECT staffID FROM Staff WHERE email = 'jordan.lee@sterra.edu'),
        '2026-04-10 20:15:00',
        'Submitted',
        35.50,
        'Requires resubmission'
    ),
    (
        3,
        (SELECT assignmentID FROM Assignments WHERE name = 'Algebra 2 Exam'),
        (SELECT studentID FROM Students WHERE email = 'alice.nguyen@sterra.edu'),
        NULL,
        '2026-04-19 21:45:00',
        'Submitted',
        NULL,
        NULL
    ),
    (
        4,
        (SELECT assignmentID FROM Assignments WHERE name = 'Chemistry Lab Report'),
        (SELECT studentID FROM Students WHERE email = 'maria.lopez@sterra.edu'),
        (SELECT staffID FROM Staff WHERE email = 'parker.smith@sterra.edu'),
        '2026-05-04 19:10:00',
        'Submitted',
        100.00,
        'Excellent lab work'
    );
END //

DELIMITER ;

CALL ResetAssignmentTrackerDB();

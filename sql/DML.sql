-- Students table queries

-- Select all attributes for all Students
SELECT
    studentID,
    email,
    firstName,
    lastName,
    CONCAT(lastName, ', ', firstName) AS name
FROM Students;

-- Select Student ID and 'lastName, firstName' from the Students table for dropdowns
SELECT
    studentID,
    CONCAT(lastName, ', ', firstName) AS name
FROM Students;

-- Add a new student to the Students table
INSERT INTO Students (studentID, email, firstName, lastName)
VALUES (@studentID, @email, @firstName, @lastName);

-- Update a Student record
UPDATE Students
SET
    studentID = @newStudentID,
    email = @email,
    firstName = @firstName,
    lastName = @lastName
WHERE studentID = @oldStudentID;

-- Delete a Student record
DELETE FROM Students
WHERE studentID = @studentID;


-- Courses table queries

-- Select all attributes for all Courses
SELECT
    courseID,
    courseName,
    courseCode,
    term
FROM Courses;

-- Select Course ID and course name from the Courses table for dropdowns
SELECT
    courseID,
    CONCAT(courseCode, ' - ', courseName) AS courseDisplay
FROM Courses;

-- Add a new course to the Courses table
INSERT INTO Courses (courseName, courseCode, term)
VALUES (@courseName, @courseCode, @term);

-- Update a Course record
UPDATE Courses
SET
    courseName = @courseName,
    courseCode = @courseCode,
    term = @term
WHERE courseID = @courseID;

-- Delete a Course record
DELETE FROM Courses
WHERE courseID = @courseID;


-- Staff table queries

-- Select all attributes for all Staff
SELECT
    staffID,
    email,
    firstName,
    lastName,
    CONCAT(lastName, ', ', firstName) AS name
FROM Staff;

-- Select Staff ID and 'lastName, firstName' from the Staff table for dropdowns
SELECT
    staffID,
    CONCAT(lastName, ', ', firstName) AS name
FROM Staff;

-- Add a new staff member to the Staff table
INSERT INTO Staff (staffID, email, firstName, lastName)
VALUES (@staffID, @email, @firstName, @lastName);

-- Update a Staff record
UPDATE Staff
SET
    staffID = @newStaffID,
    email = @email,
    firstName = @firstName,
    lastName = @lastName
WHERE staffID = @oldStaffID;

-- Delete a Staff record
DELETE FROM Staff
WHERE staffID = @staffID;


-- Assignments table queries

-- Select all attributes for all Assignments, using Courses join to make the course FK user friendly
SELECT
    Assignments.assignmentID,
    Assignments.courseID,
    Courses.courseCode,
    Courses.courseName,
    Assignments.name,
    Assignments.description,
    Assignments.dueDate,
    Assignments.points
FROM Assignments
INNER JOIN Courses
    ON Assignments.courseID = Courses.courseID;

-- Select Assignment ID and assignment name from the Assignments table for dropdowns
SELECT
    assignmentID,
    name
FROM Assignments;

-- Add a new assignment to the Assignments table
INSERT INTO Assignments (courseID, name, description, dueDate, points)
VALUES (@courseID, @name, @description, @dueDate, @points);

-- Update an Assignment record
UPDATE Assignments
SET
    courseID = @courseID,
    name = @name,
    description = @description,
    dueDate = @dueDate,
    points = @points
WHERE assignmentID = @assignmentID;

-- Delete an Assignment record
DELETE FROM Assignments
WHERE assignmentID = @assignmentID;


-- Submissions table queries

-- Select all attributes for all Submissions, using joins to make foreign keys user friendly
SELECT
    Submissions.submissionID,
    Submissions.assignmentID,
    Assignments.name AS assignmentName,
    Submissions.studentID,
    CONCAT(Students.firstName, ' ', Students.lastName) AS studentName,
    Submissions.submissionDate,
    Submissions.submissionNotes,
    Submissions.staffID,
    CONCAT(Staff.firstName, ' ', Staff.lastName) AS graderName,
    Submissions.grade,
    Submissions.graderNotes
FROM Submissions
LEFT JOIN Assignments
    ON Submissions.assignmentID = Assignments.assignmentID
LEFT JOIN Students
    ON Submissions.studentID = Students.studentID
LEFT JOIN Staff
    ON Submissions.staffID = Staff.staffID;

-- Select Submission ID with student and assignment names for dropdowns
SELECT
    Submissions.submissionID,
    CONCAT(Students.lastName, ', ', Students.firstName, ' - ', Assignments.name) AS submissionDisplay
FROM Submissions
LEFT JOIN Students
    ON Submissions.studentID = Students.studentID
LEFT JOIN Assignments
    ON Submissions.assignmentID = Assignments.assignmentID;

-- Add a new submission to the Submissions table
INSERT INTO Submissions (assignmentID, studentID, staffID, submissionDate, submissionNotes, grade, graderNotes)
VALUES (@assignmentID, @studentID, @staffID, @submissionDate, @submissionNotes, @grade, @graderNotes);

-- Update a Submission record
UPDATE Submissions
SET
    assignmentID = @assignmentID,
    studentID = @studentID,
    staffID = @staffID,
    submissionDate = @submissionDate,
    submissionNotes = @submissionNotes,
    grade = @grade,
    graderNotes = @graderNotes
WHERE submissionID = @submissionID;

-- Delete a Submission record
DELETE FROM Submissions
WHERE submissionID = @submissionID;

/* Citations:
  #1: Citation for the 'handleDisconnect' function: 
  Date: 08JUN2026
  Adapted from Stack Overflow
  The function and error handling code from the source have been adapated to target a different error
    and provide additional logs.
  Source URL: https://stackoverflow.com/questions/37385833/node-js-mysql-database-disconnect
  if AI tools were used
    No AI tools were used in generating this code.

  All other work is our own.
*/

import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import dotenv from 'dotenv';


// Creatation and start up of the API app
const app = express();
app.use(cors())
app.use(express.json());

const PORT = 13331;

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});


// Connection to the DB
dotenv.config()
var dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_TABLE
};

// Adapted code #1
var dbConnection;
function handleDisconnect() {
  // Prepares a connection to the mySQL DB
  dbConnection = mysql.createConnection(dbConfig);
  // Attempts to connect to the DB
  dbConnection.connect( function onConnect(err) {
    if (err) {
      console.log('error when connecting to DB:', err);
      // Retry connection after 10 seconds
      setTimeout(handleDisconnect, 10000);
    }
    console.log('DB Connected');
  });

  // Error handling after successfull connection
  dbConnection.on('error', function onError(err){
    console.log('db error', err);
    // If the error is due to a reset connect, reconnect, otherwise throw the error
    if (err.code == 'ECONNRESET') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();
// End adapted code

// Query execution to reset the DB
app.get("/reset", (req, res) => {
  console.log("Reset requested")
  const sqlQuery = "CALL ResetAssignmentTrackerDB;"
   dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

// Queries on the 'Students' table
// SELECT *
app.get("/students", (req, res) => {
  const sqlQuery = "SELECT * FROM Students;"
   dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

// DELETE student
app.delete("/students/:deleteID", (req, res) => {
  const deleteID = req.params.deleteID;
  console.log("Delete request for student:", deleteID);
  const sqlQuery = `CALL DeleteStudent(${deleteID})`;
  dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
    console.log(result);
  });
});

// Queries of the Staff table
// SELECT *
app.get("/staff", (req, res) => {
  const sqlQuery = "SELECT * FROM Staff;"
   dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

//Queries on the assignments table
//SELECT *
app.get("/assignments", (req, res) => {
  const sqlQuery = `SELECT
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
    ON Assignments.courseID = Courses.courseID;`;
   dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

// CREATE/INSERT
app.post("/assignments", (req, res) => {
  console.log("Create assignment requested.")
  console.log(req.body)
  const courseID = req.body.courseID;
  const assignmentName = req.body.name;
  const assignmentDescription = req.body.description;
  const assignmentDueDate = req.body.dueDate;
  const assignmentPoints = req.body.points;
  const callProcedure = `CALL CreateAssignment (${courseID}, "${assignmentName}", "${assignmentDescription}", "${assignmentDueDate}", ${assignmentPoints});;`
  console.log(callProcedure)
  dbConnection.query(callProcedure, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
    console.log(result);
  });
  
});

// Queries on the submissions table
// SELECT *
app.get("/submissions", (req, res) => {
  const sqlQuery =`SELECT
        Submissions.submissionID,
        Submissions.assignmentID,
        Assignments.name AS assignmentName,
        Submissions.studentID,
        CONCAT(Students.firstName, ' ', Students.lastName) AS studentName,
        Submissions.submissionDate,
        Submissions.submissionNotes,
        Submissions.staffID,
        CONCAT(Staff.firstName, ' ', Staff.lastName) AS staffName,
        Submissions.grade,
        Submissions.graderNotes
    FROM Submissions
    LEFT JOIN Assignments ON Submissions.assignmentID = Assignments.assignmentID
    LEFT JOIN Students ON Submissions.studentID = Students.studentID
    LEFT JOIN Staff ON Submissions.staffID = Staff.staffID;`;
   dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

// UPDATE
app.put("/submissions", (req,res) => {
  console.log(req.body);
  const submissionID = parseInt(req.body.submissionID);
  const assignmentID = parseInt(req.body.assignmentID);
  const studentID = `"${req.body.studentID}"`;
  const submissionDate = `"${req.body.submissionDate}"`;
  const submissionNotes = `"${req.body.submissionNotes}"`;
  const staffID = req.body.staffID != "" ? `"${req.body.staffID}"` : null;
  const grade = parseFloat(req.body.grade) == parseFloat(req.body.grade) ? parseFloat(req.body.grade) : null;
  const graderNotes = `"${req.body.graderNotes}"`;
  const sqlQuery = `CALL UpdateSubmission(
        ${submissionID},
        ${assignmentID},
        ${studentID},
        ${submissionDate},
        ${submissionNotes},
        ${staffID},
        ${grade},
        ${graderNotes}
        );`
  console.log(sqlQuery);
  dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
    console.log(result);
  });
});

//Queries on the courses table
//SELECT *
app.get("/courses", (req, res) => {
  const sqlQuery = "SELECT * FROM Courses;";
   dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});
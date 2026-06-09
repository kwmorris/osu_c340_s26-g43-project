/* Citations:
  Citation for the 'handleDisconnect' function: 
  Date: 08JUN2026
  Adapted from Stack Overflow
  The function and error handling code from the source have been adapated to target a different error
    and provide additional logs.
  Source URL: https://stackoverflow.com/questions/37385833/node-js-mysql-database-disconnect
  if AI tools were used
    No AI tools were used in generating this code.
*/

import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import dotenv from 'dotenv';


const app = express();
app.use(cors())
app.use(express.json());

const PORT = 13331;

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});

dotenv.config()
var dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_TABLE
};

var dbConnection;
function handleDisconnect() {
  // Prepares a connection to the mySQL DB
  dbConnection = mysql.createConnection(dbConfig);
  dbConnection.connect( function onConnect(err) {
    if (err) {
      console.log('error when connecting to DB:', err);
      setTimeout(handleDisconnect, 10000);
    }
    console.log('DB Connected');
  });

  dbConnection.on('error', function onError(err){
    console.log('db error', err);
    if (err.code == 'ECONNRESET') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

app.get("/reset", (req, res) => {
  console.log("Reset requested")
  const sqlQuery = "CALL ResetAssignmentTrackerDB;"
   dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.get("/students", (req, res) => {
  const sqlQuery = "SELECT * FROM Students;"
   dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

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

app.get("/staff", (req, res) => {
  const sqlQuery = "SELECT * FROM Staff;"
   dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.get("/assignments", (req, res) => {
  const sqlQuery = "SELECT * FROM Assignments;";
   dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.post("/assignments", (req, res) => {
  console.log("Create assignment requested.")
  console.log(req.body)
  const assignmentName = req.body.name;
  const assignmentDescription = req.body.description;
  const assignmentDueDate = req.body.dueDate;
  const assignmentPoints = req.body.points;
  const callProcedure = `CALL CreateAssignment ("${assignmentName}", "${assignmentDescription}", "${assignmentDueDate}", ${assignmentPoints});;`
  console.log(callProcedure)
  dbConnection.query(callProcedure, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
    console.log(result);
  });
  
});

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
        CONCAT(Staff.firstName, ' ', Staff.lastName) AS graderName,
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

app.get("/remove/submissions/:id", (req, res) => {
  const submissionID = parseInt(req.params.id);
  console.log(`Delete request for Submisison ${submissionID}`)
  const sqlQuery = `CALL DeleteSubmission(${submissionID})`
  dbConnection.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
    console.log(result);
  });
});

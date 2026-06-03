import express from 'express';
import cors from 'cors';
import mysql from 'mysql';


const app = express();
app.use(cors())
app.use(express.json());

const PORT = 13331;

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});

let con = mysql.createConnection({
  host: "classmysql.engr.oregonstate.edu",
  user: "",
  password: "",
  database: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

app.get("/reset", (req, res) => {
  const sqlQuery = "CALL ResetAssignmentTrackerDB;"
   con.query(sqlQuery, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.get("/students", (req, res) => {
  const sqlQuery = "SELECT * FROM Students;"
   con.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.get("/staff", (req, res) => {
  const sqlQuery = "SELECT * FROM Staff;"
   con.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.get("/assignments", (req, res) => {
  const sqlQuery = "SELECT * FROM Assignments;";
   con.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
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
   con.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.get("/remove/submissions/:id", (req, res) => {
  const submissionID = parseInt(req.params.id);
  console.log(`Delete request for Submisison ${submissionID}`)
  const sqlQuery = `CALL DeleteSubmission(${submissionID})`
   con.query(sqlQuery, function (err, result, fields) {
    if (err) return res.json({ error: err });
    res.json(result);
    console.log(result);
  });
});

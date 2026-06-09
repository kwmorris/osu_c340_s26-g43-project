// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

import StudentsTable from '../components/StudentsTable';
import AssignmentsTable from '../components/AssignmentsTable';
import SubmissionsTable from '../components/SubmissionsTable';
import StaffTable from '../components/StaffTable';
import CoursesTable from '../components/CoursesTable';
import ResetButton from '../components/ResetButton';

import React, { useState, useEffect } from "react";
import axios from 'axios';

const HOST = 'classwork.engr.oregonstate.edu';
const PORT = 13331;

function HomePage() {
    // State variables for the page
    const [students, setStudents] = useState([]);
    const [staff, setStaff] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [courses, setCourses] = useState([]);
    
    // Refresht the tables
    useEffect(() => {
        setTimeout(refreshTables(), 5000);
    });

    function refreshTables() {
        getStudents();
        getStaff();
        getAssignments();
        getSubmissions();
        getCourses();
    }

    // Get data for tables on the page
    function getStudents() {
    axios.get(`http://${HOST}:${PORT}/students`)
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
    };

    function getStaff() {
    axios.get(`http://${HOST}:${PORT}/staff`)
      .then(res => setStaff(res.data))
      .catch(err => console.log(err));
    };

    function getAssignments() {
    axios.get(`http://${HOST}:${PORT}/assignments`)
      .then(res => setAssignments(res.data))
      .catch(err => console.log(err));
    };

    function getSubmissions() {
    axios.get(`http://${HOST}:${PORT}/submissions`)
      .then(res => setSubmissions(res.data))
      .catch(err => console.log(err));
    };

    function getCourses() {
    axios.get(`http://${HOST}:${PORT}/courses`)
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
    };

    // Retun HTML components for the page
    return (
        <main>

            <h1>Course Overview</h1>

            <p>
                An overview of the database is displayed below.
            </p>

            <section>
                <h2>Students</h2>
                <StudentsTable students={students} />
            </section>

            <br />
            <hr />
            <br />

            <section>
                <h2>Staff</h2>
                <StaffTable staff={staff} />
            </section>

            <br />
            <hr />
            <br />

            <section>
                <h2>Assignments</h2>
                <AssignmentsTable assignments={assignments} />
            </section>

            <br />
            <hr />
            <br />

            <section>
                <h2>Submissions</h2>
                <SubmissionsTable submissions={submissions} />
            </section>

            <br />
            <hr />
            <br />

            <section>
                <h2>Courses</h2>
                <CoursesTable courses={courses} />
            </section>

            <br />
            <hr />
            <br />

            <section>
                <ResetButton />
            </section>

        </main>
    );
}

export default HomePage;
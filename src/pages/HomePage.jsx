import StudentsTable from '../components/StudentsTable';
import AssignmentsTable from '../components/AssignmentsTable';
import SubmissionsTable from '../components/SubmissionsTable';
import StaffTable from '../components/StaffTable';
import ResetButton from '../components/ResetButton';

import React, { useState, useEffect } from "react";
import axios from 'axios';

function HomePage() {
    const [students, setStudents] = useState([]);
    const [staff, setStaff] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    

    window.onload = (event) => {refreshTables()}

    function refreshTables() {
        getStudents();
        getStaff();
        getAssignments();
        getSubmissions();
    }

    const HOST = 'classwork.engr.oregonstate.edu';
    const PORT = 13331;

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
                <ResetButton />
            </section>

        </main>
    );
}

export default HomePage;
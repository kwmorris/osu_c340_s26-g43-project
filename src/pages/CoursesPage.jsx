// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

import { useState, useEffect } from 'react';
import CoursesTable from '../components/CoursesTable';
import axios from 'axios';

const HOST = 'classwork.engr.oregonstate.edu';
const PORT = 13331;

function CoursesPage() {
    // State variable fo the page
    const [courses, setCourses] = useState([]);

    // Refresh the table
    useEffect(() => {
        setTimeout(refreshTable(), 5000);
    });

    function refreshTable() {
        console.log("Refresh table")
        axios.get(`http://${HOST}:${PORT}/courses`)
            .then(res => setCourses(res.data))
            .catch(err => console.log(err));
    };

    // Return HTML components for the page
    return (
        <main>
            <h2>Courses</h2>
            <CoursesTable courses={courses} />
        </main>
    );
}

export default CoursesPage;
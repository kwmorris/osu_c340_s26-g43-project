// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

import { useState, useEffect } from 'react';
import AssignmentsTable from '../components/AssignmentsTable';
import axios from 'axios';

const HOST = 'classwork.engr.oregonstate.edu';
const PORT = 13331;

function AssignmentsPage() {
    // Blank data template
    const blankAssignment = {
        assignmentID: '',
        name: '',
        description: '',
        dueDate: '',
        points: ''
    };
    
    // State variables for the page
    const [assignments, setAssignments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newAssignment, setNewAssignment] = useState(blankAssignment);

    // Refresht the tables
    useEffect(() => {
        setTimeout(refreshTables(), 5000);
    });

    function refreshTables() {
        refreshAssignmentTable();
        axios.get(`http://${HOST}:${PORT}/courses`)
            .then(res => setCourses(res.data))
            .catch(err => console.log(err));
    }

    function refreshAssignmentTable() {
        console.log("Refresh table")
        axios.get(`http://${HOST}:${PORT}/assignments`)
            .then(res => setAssignments(res.data))
            .catch(err => console.log(err));
    };

    // Call the API to add a new entry
    function addAssignment(e) {
        e.preventDefault();
        let url = `http://${HOST}:${PORT}/assignments`
        axios.post(url, newAssignment)
            .then(res => {
                refreshAssignmentTable()
            })
            .catch(err => console.log(err));
        setNewAssignment(blankAssignment);
    }

    // Update state varible when the inputs change
    function handleNewChange(e) {
        setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
    }

    // Retun HTML components for the page
    return (
        <main>
            <h2>Assignments</h2>
            <AssignmentsTable assignments={assignments} />

            <hr />

            <h3>Add Assignment</h3>
            <form onSubmit={addAssignment}>
                <select name="courseID" value={newAssignment.courseID} onChange={handleNewChange}>
                    <option value="">Select course</option>
                    {courses.map((course) => (
                        <option key={course.courseID} value={course.courseID}>
                            {course.courseName}
                        </option>
                    ))}
                </select>
                <input name="name" placeholder="Assignment Name" value={newAssignment.name} onChange={handleNewChange} />
                <input name="description" placeholder="Description" value={newAssignment.description} onChange={handleNewChange} />
                <input name="dueDate" placeholder="Due Date" value={newAssignment.dueDate} onChange={handleNewChange} />
                <input name="points" placeholder="Points" value={newAssignment.points} onChange={handleNewChange} />
                <button type="submit">Add Assignment</button>
            </form>
        </main>
    );
}

export default AssignmentsPage;
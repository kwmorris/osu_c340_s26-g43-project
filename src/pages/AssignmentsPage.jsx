import { useState } from 'react';
import AssignmentsTable from '../components/AssignmentsTable';
import axios from 'axios';

const HOST = 'classwork.engr.oregonstate.edu';
const PORT = 13331;

function AssignmentsPage() {
    const [assignments, setAssignments] = useState([]);

    const blankAssignment = {
        assignmentID: '',
        name: '',
        description: '',
        dueDate: '',
        points: ''
    };

    window.onload = (event) => {refreshTable()}

    function refreshTable() {
        console.log("Refresh table")
        axios.get(`http://${HOST}:${PORT}/assignments`)
            .then(res => setAssignments(res.data))
            .catch(err => console.log(err));
    };

    const [newAssignment, setNewAssignment] = useState(blankAssignment);

    function handleNewChange(e) {
        setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
    }

    function addAssignment(e) {
        e.preventDefault();
        let url = `http://${HOST}:${PORT}/assignments`
        axios.post(url, newAssignment)
            .then(res => {
                refreshTable()
            })
            .catch(err => console.log(err));
        setNewAssignment(blankAssignment);
    }

    return (
        <main>
            <h2>Assignments</h2>
            <AssignmentsTable assignments={assignments} />

            <hr />

            <h3>Add Assignment</h3>
            <form onSubmit={addAssignment}>
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
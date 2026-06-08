import { useState, useEffect } from 'react';
// import assignmentsData from '../data/assignments';
import AssignmentsTable from '../components/AssignmentsTable';
import axios from 'axios';

// const HOST = 'classwork.engr.oregonstate.edu';
const HOST = 'localhost';
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

    useEffect(() => {
        console.log("Refresh Table")    
        refreshTable();
    });

    function refreshTable() {
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
            .catch(err => console.log(err))
            .then(response => {
                console.log("Post response")
                refreshTable()
            });
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

            {/* <hr />

            <h3>Update Assignment</h3>
            <form onSubmit={updateExistingAssignment}>
                <select value={selectedAssignmentID} onChange={selectAssignment}>
                    <option value="">Select an assignment</option>
                    {assignments.map((assignment) => (
                        <option key={assignment.assignmentID} value={assignment.assignmentID}>
                            {assignment.name}
                        </option>
                    ))}
                </select>

                <input name="assignmentID" placeholder="Assignment ID" value={updateAssignment.assignmentID} onChange={handleUpdateChange} />
                <input name="name" placeholder="Assignment Name" value={updateAssignment.name} onChange={handleUpdateChange} />
                <input name="description" placeholder="Description" value={updateAssignment.description} onChange={handleUpdateChange} />
                <input name="dueDate" placeholder="Due Date" value={updateAssignment.dueDate} onChange={handleUpdateChange} />
                <input name="points" placeholder="Points" value={updateAssignment.points} onChange={handleUpdateChange} />

                <button type="submit">Update Assignment</button>
            </form>

            <hr />

            <h3>Delete Assignment</h3>
            <form onSubmit={deleteAssignment}>
                <select value={deleteAssignmentID} onChange={(e) => setDeleteAssignmentID(e.target.value)}>
                    <option value="">Select an assignment</option>
                    {assignments.map((assignment) => (
                        <option key={assignment.assignmentID} value={assignment.assignmentID}>
                            {assignment.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Delete Assignment</button>
            </form> */}
        </main>
    );
}

export default AssignmentsPage;
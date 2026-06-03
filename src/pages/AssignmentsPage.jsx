import { useState } from 'react';
import assignmentsData from '../data/assignments';
import AssignmentsTable from '../components/AssignmentsTable';

function AssignmentsPage() {
    const [assignments, setAssignments] = useState(assignmentsData);

    const blankAssignment = {
        assignmentID: '',
        name: '',
        description: '',
        dueDate: '',
        points: ''
    };

    const [newAssignment, setNewAssignment] = useState(blankAssignment);
    const [updateAssignment, setUpdateAssignment] = useState(blankAssignment);
    const [selectedAssignmentID, setSelectedAssignmentID] = useState('');
    const [deleteAssignmentID, setDeleteAssignmentID] = useState('');

    function handleNewChange(e) {
        setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
    }

    function handleUpdateChange(e) {
        setUpdateAssignment({ ...updateAssignment, [e.target.name]: e.target.value });
    }

    function addAssignment(e) {
        e.preventDefault();
        setAssignments([...assignments, newAssignment]);
        setNewAssignment(blankAssignment);
    }

    function selectAssignment(e) {
        const id = e.target.value;
        setSelectedAssignmentID(id);

        const assignment = assignments.find((a) => a.assignmentID.toString() === id);
        if (assignment) {
            setUpdateAssignment(assignment);
        }
    }

    function updateExistingAssignment(e) {
        e.preventDefault();

        setAssignments(
            assignments.map((assignment) =>
                assignment.assignmentID.toString() === selectedAssignmentID
                    ? updateAssignment
                    : assignment
            )
        );
    }

    function deleteAssignment(e) {
        e.preventDefault();

        setAssignments(
            assignments.filter(
                (assignment) => assignment.assignmentID.toString() !== deleteAssignmentID
            )
        );

        setDeleteAssignmentID('');
    }

    return (
        <main>
            <h2>Assignments</h2>
            <AssignmentsTable assignments={assignments} />

            <hr />

            <h3>Add Assignment</h3>
            <form onSubmit={addAssignment}>
                <input name="assignmentID" placeholder="Assignment ID" value={newAssignment.assignmentID} onChange={handleNewChange} />
                <input name="name" placeholder="Assignment Name" value={newAssignment.name} onChange={handleNewChange} />
                <input name="description" placeholder="Description" value={newAssignment.description} onChange={handleNewChange} />
                <input name="dueDate" placeholder="Due Date" value={newAssignment.dueDate} onChange={handleNewChange} />
                <input name="points" placeholder="Points" value={newAssignment.points} onChange={handleNewChange} />
                <button type="submit">Add Assignment</button>
            </form>

            <hr />

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
            </form>
        </main>
    );
}

export default AssignmentsPage;
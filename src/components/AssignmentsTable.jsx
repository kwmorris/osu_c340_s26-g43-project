// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

import AssignmentRow from "./AssignmentRow";

function AssignmentsTable ({ assignments }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Assignment ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {assignments.map((assignment) => <AssignmentRow key={assignment.assignmentID} assignment={assignment} />)}
            </tbody>
        </table>
    );
}

export default AssignmentsTable;
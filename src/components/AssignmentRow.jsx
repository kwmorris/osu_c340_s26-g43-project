function AssignmentRow ({ assignment }) {
    return (
        <tr>
            <td>{assignment.assignmentID}</td>
            <td>{assignment.name}</td>
            <td>{assignment.description}</td>
            <td>{assignment.dueDate}</td>
            <td>{assignment.points}</td>
        </tr>
    );
}

export default AssignmentRow;
function StudentRow ({ student }) {
    return (
        <tr>
            <td>{student.studentID}</td>
            <td>{student.email}</td>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
        </tr>
    );
}

export default StudentRow;
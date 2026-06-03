import StudentRow from "./StudentRow";

function StudentsTable ({ students }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => <StudentRow key={student.studentID} student={student} />)}
            </tbody>
        </table>
    );
}

export default StudentsTable;
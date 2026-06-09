import { useState } from 'react';
import StudentsTable from '../components/StudentsTable';
import axios from 'axios';

const HOST = 'classwork.engr.oregonstate.edu';
const PORT = 13331;

function StudentsPage() {
    const [students, setStudents] = useState([]);

    const blankStudent = {
        studentID: '',
        email: '',
        firstName: '',
        lastName: ''
    };

    window.onload = (event) => {refreshTable()}

    function refreshTable() {
        console.log("Refresh table")
        axios.get(`http://${HOST}:${PORT}/students`)
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    };

    const [deleteStudentID, setDeleteStudentID] = useState('');

    function deleteStudent(e) {
        e.preventDefault();
        console.log("Delete requested for id:", deleteStudentID)
        axios.delete(`http://${HOST}:${PORT}/students/${deleteStudentID}`)
            .then((response) => {
                console.log("Delete response:", response)
                refreshTable()
            })
            .catch(err => console.log(err));

        setDeleteStudentID('');
    }

    return (
        <main>
            <h2>Students</h2>
            <StudentsTable students={students} />

            <hr />

            <h3>Delete Student</h3>
            <form onSubmit={deleteStudent}>
                <select value={deleteStudentID} onChange={(e) => setDeleteStudentID(e.target.value)}>
                    <option value="">Select a student</option>
                    {students.map((student) => (
                        <option key={student.studentID} value={student.studentID}>
                            {student.email} - {student.firstName} {student.lastName}
                        </option>
                    ))}
                </select>

                <button type="submit">Delete Student</button>
            </form>
        </main>
    );
}

export default StudentsPage;
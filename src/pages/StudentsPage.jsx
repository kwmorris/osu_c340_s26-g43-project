import { useState } from 'react';
import studentsData from '../data/students';
import StudentsTable from '../components/StudentsTable';

function StudentsPage() {
    const [students, setStudents] = useState(studentsData);

    const blankStudent = {
        studentID: '',
        email: '',
        firstName: '',
        lastName: ''
    };

    const [newStudent, setNewStudent] = useState(blankStudent);
    const [updateStudent, setUpdateStudent] = useState(blankStudent);
    const [selectedStudentID, setSelectedStudentID] = useState('');
    const [deleteStudentID, setDeleteStudentID] = useState('');

    function handleNewChange(e) {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    }

    function handleUpdateChange(e) {
        setUpdateStudent({ ...updateStudent, [e.target.name]: e.target.value });
    }

    function addStudent(e) {
        e.preventDefault();
        setStudents([...students, newStudent]);
        setNewStudent(blankStudent);
    }

    function selectStudent(e) {
        const id = e.target.value;
        setSelectedStudentID(id);

        const student = students.find((s) => s.studentID === id);
        if (student) {
            setUpdateStudent(student);
        }
    }

    function updateExistingStudent(e) {
        e.preventDefault();

        setStudents(
            students.map((student) =>
                student.studentID === selectedStudentID ? updateStudent : student
            )
        );
    }

    function deleteStudent(e) {
        e.preventDefault();
        setStudents(students.filter((student) => student.studentID !== deleteStudentID));
        setDeleteStudentID('');
    }

    return (
        <main>
            <h2>Students</h2>
            <StudentsTable students={students} />

            <hr />

            <h3>Add Student</h3>
            <form onSubmit={addStudent}>
                <input name="studentID" placeholder="Student ID" value={newStudent.studentID} onChange={handleNewChange} />
                <input name="email" placeholder="Email" value={newStudent.email} onChange={handleNewChange} />
                <input name="firstName" placeholder="First Name" value={newStudent.firstName} onChange={handleNewChange} />
                <input name="lastName" placeholder="Last Name" value={newStudent.lastName} onChange={handleNewChange} />
                <button type="submit">Add Student</button>
            </form>

            <hr />

            <h3>Update Student</h3>
            <form onSubmit={updateExistingStudent}>
                <select value={selectedStudentID} onChange={selectStudent}>
                    <option value="">Select a student</option>
                    {students.map((student) => (
                        <option key={student.studentID} value={student.studentID}>
                            {student.email} - {student.firstName} {student.lastName}
                        </option>
                    ))}
                </select>

                <input name="studentID" placeholder="Student ID" value={updateStudent.studentID} onChange={handleUpdateChange} />
                <input name="email" placeholder="Email" value={updateStudent.email} onChange={handleUpdateChange} />
                <input name="firstName" placeholder="First Name" value={updateStudent.firstName} onChange={handleUpdateChange} />
                <input name="lastName" placeholder="Last Name" value={updateStudent.lastName} onChange={handleUpdateChange} />

                <button type="submit">Update Student</button>
            </form>

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
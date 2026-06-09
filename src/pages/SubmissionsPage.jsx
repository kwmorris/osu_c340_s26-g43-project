import { useState } from 'react';
// import submissionsData from '../data/submissions';
// import studentsData from '../data/students';
// import assignmentsData from '../data/assignments';
// import staffData from '../data/staff';
import SubmissionsTable from '../components/SubmissionsTable';
import axios from 'axios';

// const HOST = 'classwork.engr.oregonstate.edu';
const HOST = 'localhost';
const PORT = 13331;

function SubmissionsPage() {
    const [submissions, setSubmissions] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [students, setStudents] = useState([]);
    const [staff, setStaff] = useState([]);

    const blankSubmission = {
        submissionID: '',
        assignmentID: '',
        assignmentName: '',
        studentID: '',
        studentName: '',
        submissionDate: '',
        submissionNotes: '',
        staffID: '',
        staffName: '',
        grade: '',
        graderNotes: ''
    };

    const blankStaff = {
        staffID: '',
        firstName: '',
        lastName: ''
    }

    window.onload = (event) => {refreshTables()}

    function refreshTables() {
        refreshSubmissionsTable();
        axios.get(`http://${HOST}:${PORT}/assignments`)
            .then(res => {
                setAssignments(res.data);
                // console.log(res.data);
            })
            .catch(err => console.log(err));
        axios.get(`http://${HOST}:${PORT}/students`)
            .then(res => {
                setStudents(res.data);
                // console.log(res.data);
            })
            .catch(err => console.log(err));
        axios.get(`http://${HOST}:${PORT}/staff`)
            .then(res => {
                var staff = res.data;
                staff.unshift(blankStaff)
                setStaff(staff);
                // console.log(staff);
            })
            .catch(err => console.log(err));
    };

    function refreshSubmissionsTable() {
        console.log("Refresh table")
        axios.get(`http://${HOST}:${PORT}/submissions`)
            .then(res => {
                setSubmissions(res.data);
                // console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    // const [newSubmission, setNewSubmission] = useState(blankSubmission);
    const [updateSubmission, setUpdateSubmission] = useState(blankSubmission);
    const [selectedSubmissionID, setSelectedSubmissionID] = useState('');
    // const [deleteSubmissionID, setDeleteSubmissionID] = useState('');

    function getStudentName(studentID) {
        const submission = submissions.find((s) => s.studentID === studentID);
        return submission ? submission.studentName : '';
    }

    function getAssignmentName(assignmentID) {
        const submission = submissions.find((s) => s.assignmentID.toString() === assignmentID.toString());
        return submission ? submission.assignmentName : '';
    }

    function getStaffName(staffID) {
        if (staffID != '') {
        const submission = submissions.find((s) => s.staffID === staffID);
        return submission ? submission.staffName : '';
        } else { return '' };
    }

    // function handleNewChange(e) {
    //     const { name, value } = e.target;

    //     if (name === 'studentID') {
    //         setNewSubmission({
    //             ...newSubmission,
    //             studentID: value,
    //             studentName: getStudentName(value)
    //         });
    //     } else if (name === 'assignmentID') {
    //         setNewSubmission({
    //             ...newSubmission,
    //             assignmentID: value,
    //             assignmentName: getAssignmentName(value)
    //         });
    //     } else if (name === 'staffID') {
    //         setNewSubmission({
    //             ...newSubmission,
    //             staffID: value,
    //             staffName: getStaffName(value)
    //         });
    //     } else {
    //         setNewSubmission({ ...newSubmission, [name]: value });
    //     }
    // }

    function handleUpdateChange(e) {
        const { name, value } = e.target;

        if (name === 'studentID') {
            setUpdateSubmission({
                ...updateSubmission,
                studentID: value,
                studentName: getStudentName(value)
            });
        } else if (name === 'assignmentID') {
            setUpdateSubmission({
                ...updateSubmission,
                assignmentID: value,
                assignmentName: getAssignmentName(value)
            });
        } else if (name === 'staffID') {
            var updateData = {
                ...updateSubmission,
                staffID: value,
                staffName: getStaffName(value)
            }
            if (value === '') {
                updateData = {
                ...updateData,
                grade: '',
                graderNotes: ''
                };
            }
            setUpdateSubmission(updateData);
            
        } else {
            setUpdateSubmission({ ...updateSubmission, [name]: value });
        }
    }

    // function addSubmission(e) {
    //     e.preventDefault();
    //     setSubmissions([...submissions, newSubmission]);
    //     setNewSubmission(blankSubmission);
    // }

    function selectSubmission(e) {
        const id = e.target.value;
        setSelectedSubmissionID(id);

        const submission = submissions.find((s) => s.submissionID.toString() === id);
        if (submission) {
            setUpdateSubmission(submission);
        }
    }

    function updateExistingSubmission(e) {
        e.preventDefault();
        console.log(updateSubmission);

        axios.put(`http://${HOST}:${PORT}/submissions`, updateSubmission)
            .then(res => {
                console.log("Put response:", res)
                refreshSubmissionsTable()
            })
            .catch(err => console.log(err));
        setUpdateSubmission(blankSubmission);
        setSelectedSubmissionID('');


        // setSubmissions(
        //     submissions.map((submission) =>
        //         submission.submissionID.toString() === selectedSubmissionID
        //             ? updateSubmission
        //             : submission
        //     )
        // );
    }

    // function deleteSubmission(e) {
    //     e.preventDefault();

    //     setSubmissions(
    //         submissions.filter(
    //             (submission) => submission.submissionID.toString() !== deleteSubmissionID
    //         )
    //     );

    //     setDeleteSubmissionID('');
    // }

    return (
        <main>
            <h2>Submissions</h2>
            <p></p>

            <SubmissionsTable submissions={submissions} />

            <hr />

            {/* <h3>Add Submission</h3>
            <form onSubmit={addSubmission}>
                <input name="submissionID" placeholder="Submission ID" value={newSubmission.submissionID} onChange={handleNewChange} />

                <select name="assignmentID" value={newSubmission.assignmentID} onChange={handleNewChange}>
                    <option value="">Select assignment</option>
                    {assignmentsData.map((assignment) => (
                        <option key={assignment.assignmentID} value={assignment.assignmentID}>
                            {assignment.name}
                        </option>
                    ))}
                </select>

                <select name="studentID" value={newSubmission.studentID} onChange={handleNewChange}>
                    <option value="">Select student</option>
                    {studentsData.map((student) => (
                        <option key={student.studentID} value={student.studentID}>
                            {student.email} - {student.firstName} {student.lastName}
                        </option>
                    ))}
                </select>

                <input name="submissionDate" placeholder="Submission Date" value={newSubmission.submissionDate} onChange={handleNewChange} />
                <input name="submissionNotes" placeholder="Submission Notes" value={newSubmission.submissionNotes} onChange={handleNewChange} />

                <select name="staffID" value={newSubmission.staffID} onChange={handleNewChange}>
                    <option value="">Select grader</option>
                    {staffData.map((staffMember) => (
                        <option key={staffMember.staffID} value={staffMember.staffID}>
                            {staffMember.firstName} {staffMember.lastName}
                        </option>
                    ))}
                </select>

                <input name="grade" placeholder="Grade" value={newSubmission.grade} onChange={handleNewChange} />
                <input name="graderNotes" placeholder="Grader Notes" value={newSubmission.graderNotes} onChange={handleNewChange} />

                <button type="submit">Add Submission</button>
            </form>

            <hr /> */}

            <h3>Update Submission</h3>
            <form onSubmit={updateExistingSubmission}>
                <select value={selectedSubmissionID} onChange={selectSubmission}>
                    <option value="">Select submission</option>
                    {submissions.map((submission) => (
                        <option key={submission.submissionID} value={submission.submissionID}>
                            #{submission.submissionID} - {submission.studentName} / {submission.assignmentName}
                        </option>
                    ))}
                </select>

                {/* <input name="submissionID" placeholder="Submission ID" value={updateSubmission.submissionID} onChange={handleUpdateChange} /> */}

                <select name="assignmentID" value={updateSubmission.assignmentID} onChange={handleUpdateChange}>
                    <option value="">Select assignment</option>
                    {assignments.map((assignment) => (
                        <option key={assignment.assignmentID} value={assignment.assignmentID}>
                            {assignment.name}
                        </option>
                    ))}
                </select>

                <select name="studentID" value={updateSubmission.studentID} onChange={handleUpdateChange}>
                    <option value="">Select student</option>
                    {students.map((student) => (
                        <option key={student.studentID} value={student.studentID}>
                            {student.email} - {student.firstName} {student.lastName}
                        </option>
                    ))}
                </select>

                <input name="submissionDate" placeholder="Submission Date" value={updateSubmission.submissionDate} onChange={handleUpdateChange} />
                <input name="submissionNotes" placeholder="Submission Notes" value={updateSubmission.submissionNotes} onChange={handleUpdateChange} />

                <select name="staffID" value={updateSubmission.staffID ?? ''} onChange={handleUpdateChange}>
                    <option value="">Select grader</option>
                    {staff.map((staffMember) => (
                        <option key={staffMember.staffID} value={staffMember.staffID}>
                            {staffMember.firstName} {staffMember.lastName}
                        </option>
                    ))}
                </select>

                <input name="grade" placeholder="Grade" value={updateSubmission.grade ?? ''} onChange={handleUpdateChange} />
                <input name="graderNotes" placeholder="Grader Notes" value={updateSubmission.graderNotes ?? ''} onChange={handleUpdateChange} />

                <button type="submit">Update Submission</button>
            </form>

            {/* <hr />

            <h3>Delete Submission</h3>
            <form onSubmit={deleteSubmission}>
                <select value={deleteSubmissionID} onChange={(e) => setDeleteSubmissionID(e.target.value)}>
                    <option value="">Select submission</option>
                    {submissions.map((submission) => (
                        <option key={submission.submissionID} value={submission.submissionID}>
                            #{submission.submissionID} - {submission.studentName} / {submission.assignmentName}
                        </option>
                    ))}
                </select>

                <button type="submit">Delete Submission</button>
            </form> */}
        </main>
    );
}

export default SubmissionsPage;
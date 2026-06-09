// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

function SubmissionRow ({ submission }) {
    return (
        <tr>
            <td>{submission.submissionID}</td>
            <td>{submission.assignmentName}</td>
            <td>{submission.studentName}</td>
            <td>{submission.submissionDate}</td>
            <td>{submission.submissionNotes}</td>
            <td>{submission.staffName}</td>
            <td>{submission.grade}</td>
            <td>{submission.graderNotes}</td>
        </tr>
    );
}

export default SubmissionRow;
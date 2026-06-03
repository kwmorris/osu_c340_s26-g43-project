import DeleteButton from "./DeleteButton";
import ResetButton from "./ResetButton";

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
            <td><DeleteButton table = { 'submissions' } id = { submission.submissionID } /></td>
        </tr>
    );
}

export default SubmissionRow;
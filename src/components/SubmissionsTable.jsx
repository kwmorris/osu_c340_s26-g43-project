import SubmissionRow from "./SubmissionRow";

function SubmissionTable ({ submissions }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Submission ID</th>
                    <th>Assignment Name</th>
                    <th>Student Name</th>
                    <th>Submission Date</th>
                    <th>Submission Notes</th>
                    <th>Grader Name</th>
                    <th>Grade</th>
                    <th>Grader Notes</th>
                    <th>Delete?</th>
                </tr>
            </thead>
            <tbody>
                {submissions.map((submission) => <SubmissionRow key={submission.submissionID} submission={submission} />)}
            </tbody>
        </table>
    );
}

export default SubmissionTable;
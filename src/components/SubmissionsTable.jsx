// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

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
                </tr>
            </thead>
            <tbody>
                {submissions.map((submission) => <SubmissionRow key={submission.submissionID} submission={submission} />)}
            </tbody>
        </table>
    );
}

export default SubmissionTable;
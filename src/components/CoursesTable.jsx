// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

import CourseRow from "./CourseRow";

function CoursesTable ({ courses }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Course ID</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Term</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course) => <CourseRow key={course.courseID} course={course} />)}
            </tbody>
        </table>
    );
}

export default CoursesTable;
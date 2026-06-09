// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

function CourseRow ({ course }) {
    return (
        <tr>
            <td>{course.courseID}</td>
            <td>{course.courseName}</td>
            <td>{course.courseCode}</td>
            <td>{course.term}</td>
        </tr>
    );
}

export default CourseRow;
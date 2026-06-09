// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

function StaffRow ({ staff }) {
    return (
        <tr>
            <td>{staff.staffID}</td>
            <td>{staff.email}</td>
            <td>{staff.firstName}</td>
            <td>{staff.lastName}</td>
        </tr>
    );
}

export default StaffRow;
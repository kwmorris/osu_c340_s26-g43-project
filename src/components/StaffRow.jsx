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
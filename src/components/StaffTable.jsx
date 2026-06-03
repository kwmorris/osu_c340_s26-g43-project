import StaffRow from "./StaffRow";

function StaffTable ({ staff }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Staff ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {staff.map((staff) => <StaffRow key={staff.staffID} staff={staff} />)}
            </tbody>
        </table>
    );
}

export default StaffTable;
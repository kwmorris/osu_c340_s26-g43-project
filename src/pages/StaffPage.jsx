import { useState } from 'react';
import staffData from '../data/staff';
import StaffTable from '../components/StaffTable';

function StaffPage() {
    const [staff, setStaff] = useState(staffData);

    const blankStaff = {
        staffID: '',
        email: '',
        firstName: '',
        lastName: ''
    };

    const [newStaff, setNewStaff] = useState(blankStaff);
    const [updateStaff, setUpdateStaff] = useState(blankStaff);
    const [selectedStaffID, setSelectedStaffID] = useState('');
    const [deleteStaffID, setDeleteStaffID] = useState('');

    function handleNewChange(e) {
        setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
    }

    function handleUpdateChange(e) {
        setUpdateStaff({ ...updateStaff, [e.target.name]: e.target.value });
    }

    function addStaff(e) {
        e.preventDefault();
        setStaff([...staff, newStaff]);
        setNewStaff(blankStaff);
    }

    function selectStaff(e) {
        const id = e.target.value;
        setSelectedStaffID(id);

        const staffMember = staff.find((s) => s.staffID === id);
        if (staffMember) {
            setUpdateStaff(staffMember);
        }
    }

    function updateExistingStaff(e) {
        e.preventDefault();

        setStaff(
            staff.map((staffMember) =>
                staffMember.staffID === selectedStaffID ? updateStaff : staffMember
            )
        );
    }

    function deleteStaff(e) {
        e.preventDefault();
        setStaff(staff.filter((staffMember) => staffMember.staffID !== deleteStaffID));
        setDeleteStaffID('');
    }

    return (
        <main>
            <h2>Staff</h2>
            <StaffTable staff={staff} />

            <hr />

            <h3>Add Staff Member</h3>
            <form onSubmit={addStaff}>
                <input name="staffID" placeholder="Staff ID" value={newStaff.staffID} onChange={handleNewChange} />
                <input name="email" placeholder="Email" value={newStaff.email} onChange={handleNewChange} />
                <input name="firstName" placeholder="First Name" value={newStaff.firstName} onChange={handleNewChange} />
                <input name="lastName" placeholder="Last Name" value={newStaff.lastName} onChange={handleNewChange} />
                <button type="submit">Add Staff</button>
            </form>

            <hr />

            <h3>Update Staff Member</h3>
            <form onSubmit={updateExistingStaff}>
                <select value={selectedStaffID} onChange={selectStaff}>
                    <option value="">Select a staff member</option>
                    {staff.map((staffMember) => (
                        <option key={staffMember.staffID} value={staffMember.staffID}>
                            {staffMember.email} - {staffMember.firstName} {staffMember.lastName}
                        </option>
                    ))}
                </select>

                <input name="staffID" placeholder="Staff ID" value={updateStaff.staffID} onChange={handleUpdateChange} />
                <input name="email" placeholder="Email" value={updateStaff.email} onChange={handleUpdateChange} />
                <input name="firstName" placeholder="First Name" value={updateStaff.firstName} onChange={handleUpdateChange} />
                <input name="lastName" placeholder="Last Name" value={updateStaff.lastName} onChange={handleUpdateChange} />

                <button type="submit">Update Staff</button>
            </form>

            <hr />

            <h3>Delete Staff Member</h3>
            <form onSubmit={deleteStaff}>
                <select value={deleteStaffID} onChange={(e) => setDeleteStaffID(e.target.value)}>
                    <option value="">Select a staff member</option>
                    {staff.map((staffMember) => (
                        <option key={staffMember.staffID} value={staffMember.staffID}>
                            {staffMember.email} - {staffMember.firstName} {staffMember.lastName}
                        </option>
                    ))}
                </select>

                <button type="submit">Delete Staff</button>
            </form>
        </main>
    );
}

export default StaffPage;
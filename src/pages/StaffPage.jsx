// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

import { useState, useEffect } from 'react';
import StaffTable from '../components/StaffTable';
import axios from 'axios';

const HOST = 'classwork.engr.oregonstate.edu';
const PORT = 13331;

function StaffPage() {
    // State variable for the page
    const [staff, setStaff] = useState([]);

    // Refresh the table
    useEffect(() => {
        setTimeout(refreshTable(), 5000);
    });

    function refreshTable() {
        console.log("Refresh table")
        axios.get(`http://${HOST}:${PORT}/staff`)
            .then(res => setStaff(res.data))
            .catch(err => console.log(err));
    };

    // Return HTML components for the page
    return (
        <main>
            <h2>Staff</h2>
            <StaffTable staff={staff} />
        </main>
    );
}

export default StaffPage;
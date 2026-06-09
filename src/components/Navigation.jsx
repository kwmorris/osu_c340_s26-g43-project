// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

import { Link } from 'react-router-dom';

function Navigation(props) {
    return (
        <nav className="App-nav">
            <Link to="/"> Course Overview | </Link>
            <Link to="/assignments"> Assignments | </Link>
            <Link to="/students"> Students | </Link>
            <Link to="/submissions"> Submissions | </Link>
            <Link to="/staff"> Staff | </Link>
            <Link to="/courses"> Courses </Link>
        </nav>
    );
}

export default Navigation;
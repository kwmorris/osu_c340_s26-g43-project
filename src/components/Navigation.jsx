import { Link } from 'react-router-dom';

function Navigation(props) {
    return (
        <nav className="App-nav">
            <Link to="/"> Course Overview |</Link>
            <Link to="/assignments"> Assignments |</Link>
            <Link to="/students"> Students |</Link>
            <Link to="/submissions"> Submissions |</Link>
            <Link to="/staff"> Staff </Link>
        </nav>
    );
}

export default Navigation;
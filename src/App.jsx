import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import assignments from './data/assignments';
import students from './data/students';
import submissions from './data/submissions';
import staff from './data/staff';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AssignmentsPage from './pages/AssignmentsPage';
import StudentsPage from './pages/StudentsPage';
import SubmissionsPage from './pages/SubmissionsPage';
import StaffPage from './pages/StaffPage';

function App() {

  return (
    <div className="app">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={ <HomePage assignments={assignments} students={students} submissions={submissions} staff={staff}  />}></Route>
          <Route path="/assignments" element={ <AssignmentsPage assignments={assignments} />}></Route>
          <Route path="/students" element={ <StudentsPage students={students} />}></Route>
          <Route path="/submissions" element={ <SubmissionsPage submissions={submissions} />}></Route>
          <Route path="/staff" element={ <StaffPage staff={staff} />}></Route>
         </Routes>
      </Router>
    </div>
  )
}

export default App

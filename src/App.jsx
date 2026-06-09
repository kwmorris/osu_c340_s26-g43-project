import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
          <Route path="/" element={ <HomePage />}></Route>
          <Route path="/assignments" element={ <AssignmentsPage />}></Route>
          <Route path="/students" element={ <StudentsPage />}></Route>
          <Route path="/submissions" element={ <SubmissionsPage />}></Route>
          <Route path="/staff" element={ <StaffPage />}></Route>
         </Routes>
      </Router>
    </div>
  )
}

export default App

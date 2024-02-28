
import './App.css';
import AllPatient from './AllPatient';
import AddPatient from './AddPatient';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
  <>
  <Router>
      <Routes>
        <Route path="/" element={ <AllPatient/>} />
        <Route path="/add" element={ <AddPatient/>} />
      </Routes>
      </Router>
     
  </>
  );
}

export default App;

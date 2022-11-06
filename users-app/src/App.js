import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './compoments/Home';
import Register from './compoments/auth/Register';
import Login from './compoments/auth/Login';
import Navbar from './compoments/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

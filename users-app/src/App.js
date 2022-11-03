import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './compoments/Home';
import Register from './compoments/auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

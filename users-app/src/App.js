import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './compoments/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
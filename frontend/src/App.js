import './App.css';
import { useState } from 'react';
import AddTodo from './components/AddTodo';
import ListTodo from './components/ListTodo';

const App = () => {
  const [todo, setTodo] = useState({
    task: '',
    isComplete: false,
  });
  return (
    <div className="App">
      <h2> Todo App </h2>
      <AddTodo todo={todo} setTodo={setTodo} />
      <ListTodo setTodo={setTodo} />
    </div>
  );
};

export default App;

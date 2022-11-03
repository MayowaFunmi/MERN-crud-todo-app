import { Alert, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { todosAdd, updateTodo } from '../features/todoSlice';

const AddTodo = ({ todo, setTodo }) => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState); // todosState from index.js file
  //console.log(todosState);
  // const [todo, setTodo] = useState({
  //   task: '',
  //   isComplete: false,
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    // to update todo
    if (todo._id) {
      dispatch(updateTodo(todo));
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };
      dispatch(todosAdd(newTodo));
    }
    //dispatch
    //alert(JSON.stringify(todo));
    //dispatch(todosAdd(todo));

    setTodo({
      task: '',
      isComplete: false,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={todo.task}
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{ margin: '0.9rem 0rem', fontFamily: "'Abel', 'sansSerif'" }}
        >
          {todosState.addTodoStatus === 'pending' ? (
            <CircularProgress size={24} color="secondary"></CircularProgress>
          ) : todo._id ? (
            'Update Task'
          ) : (
            'Add Task'
          )}
        </Button>
        {todosState.addTodoStatus === 'rejected' ? (
          <Alert severity="error">{todosState.addTodoError}</Alert>
        ) : null}
        {todosState.addTodoStatus === 'success' ? (
          <Alert severity="success">Task Added Successfully</Alert>
        ) : null}
        {todosState.updateTodoStatus === 'rejected' ? (
          <Alert severity="error">{todosState.updateTodoError}</Alert>
        ) : null}
        {todosState.updateTodoStatus === 'success' ? (
          <Alert severity="success">Task Updated Successfully</Alert>
        ) : null}
        {todosState.deleteTodoStatus === 'rejected' ? (
          <Alert severity="error">{todosState.addTodoError}</Alert>
        ) : null}
        {todosState.deleteTodoStatus === 'success' ? (
          <Alert severity="warning">Task Deleted Successfully</Alert>
        ) : null}
      </form>
    </>
  );
};

export default AddTodo;

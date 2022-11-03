import { Button, Card, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodos } from '../features/todoSlice';
import moment from 'moment';
const ListTodo = ({ setTodo }) => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState);
  const { todos } = todosState;
  //console.log(todos);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };
  return (
    <div>
      {todos && todos.length >= 2 ? (
        <h2>You have {todos && todos.length} tasks</h2>
      ) : (
        <h2>You have {todos && todos.length} task</h2>
      )}
      <div>
        {todosState.getTodoStatus === 'pending' ? <CircularProgress /> : null}
        {todos.map((todo) => (
          <Card
            variant="outlined"
            sx={{
              padding: '0.7rem',
              marginButtom: '2rem',
            }}
            key={todo._id}
          >
            <h3>{todo.task}</h3>
            <p>Added: {moment(todo.date).fromNow()}</p>
            <Button
              variant="outlined"
              size="small"
              sx={{
                fontFamily: "'Abel', 'sansSerif'",
              }}
              onClick={() => setTodo(todo)}
            >
              Update
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              sx={{
                marginLeft: '0.7rem',
                fontFamily: "'Abel', 'sansSerif'",
              }}
              onClick={() => handleDelete(todo._id)}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ListTodo;

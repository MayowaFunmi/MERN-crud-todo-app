import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/api/';
const initialState = {
  todos: [],
  addTodoStatus: '',
  addTodoError: '',
  getTodoStatus: '',
  getTodoError: '',
  updateTodoStatus: '',
  updateTodoError: '',
  deleteTodoStatus: '',
  deleteTodoError: '',
};

export const todosAdd = createAsyncThunk(
  'todos/todosAdd',
  async (todo, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL + 'todos', todo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL + 'todos');
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todo, { rejectWithValue }) => {
    try {
      const { _id, task, isComplete, date } = todo;
      const response = await axios.put(baseURL + 'todos/' + _id, {
        task,
        isComplete,
        date,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (_id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseURL + 'todos/' + _id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    [todosAdd.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: 'pending',
        addTodoError: '',
        getTodoStatus: '',
        getTodoError: '',
        updateTodoStatus: '',
        updateTodoError: '',
        deleteTodoStatus: '',
        deleteTodoError: '',
      };
    },
    [todosAdd.fulfilled]: (state, action) => {
      //state.todos.push(action.payload),
      //state.addTodoStatus ='success',
      //state.addTodoError = ""
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        addTodoStatus: 'success',
        addTodoError: '',
        getTodoStatus: '',
        getTodoError: '',
        updateTodoStatus: '',
        updateTodoError: '',
        deleteTodoStatus: '',
        deleteTodoError: '',
      };
    },
    [todosAdd.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: 'rejected',
        addTodoError: action.payload,
        getTodoStatus: '',
        getTodoError: '',
        updateTodoStatus: '',
        updateTodoError: '',
        deleteTodoStatus: '',
        deleteTodoError: '',
      };
    },

    [getTodos.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: '',
        addTodoError: '',
        getTodoStatus: 'pending',
        getTodoError: '',
        updateTodoStatus: '',
        updateTodoError: '',
        deleteTodoStatus: '',
        deleteTodoError: '',
      };
    },
    [getTodos.fulfilled]: (state, action) => {
      return {
        ...state,
        todos: action.payload,
        addTodoStatus: '',
        addTodoError: '',
        getTodoStatus: 'success',
        getTodoError: '',
        updateTodoStatus: '',
        updateTodoError: '',
        deleteTodoStatus: '',
        deleteTodoError: '',
      };
    },
    [getTodos.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: '',
        addTodoError: '',
        getTodoStatus: 'rejected',
        getTodoError: action.payload,
        updateTodoStatus: '',
        updateTodoError: '',
        deleteTodoStatus: '',
        deleteTodoError: '',
      };
    },

    [updateTodo.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: '',
        addTodoError: '',
        getTodoStatus: '',
        getTodoError: '',
        updateTodoStatus: 'pending',
        updateTodoError: '',
        deleteTodoStatus: '',
        deleteTodoError: '',
      };
    },
    [updateTodo.fulfilled]: (state, action) => {
      const updatedTodos = state.todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        addTodoStatus: '',
        addTodoError: '',
        getTodoStatus: '',
        getTodoError: '',
        updateTodoStatus: 'success',
        updateTodoError: '',
        deleteTodoStatus: '',
        deleteTodoError: '',
      };
    },
    [updateTodo.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: '',
        addTodoError: '',
        getTodoStatus: '',
        getTodoError: '',
        updateTodoStatus: 'rejected',
        updateTodoError: 'action.payload',
        deleteTodoStatus: '',
        deleteTodoError: '',
      };
    },

    [deleteTodo.pending]: (state, action) => {
      return {
        ...state,
        addTodoStatus: '',
        addTodoError: '',
        getTodoStatus: '',
        getTodoError: '',
        updateTodoStatus: '',
        updateTodoError: '',
        deleteTodoStatus: 'pending',
        deleteTodoError: '',
      };
    },
    [deleteTodo.fulfilled]: (state, action) => {
      const currentTodos = state.todos.filter((todo) =>
        todo._id !== action.payload._id ? action.payload : todo
      );
      return {
        ...state,
        todos: currentTodos,
        addTodoStatus: '',
        addTodoError: '',
        getTodoStatus: '',
        getTodoError: '',
        updateTodoStatus: '',
        updateTodoError: '',
        deleteTodoStatus: 'success',
        deleteTodoError: '',
      };
    },
    [deleteTodo.rejected]: (state, action) => {
      return {
        ...state,
        addTodoStatus: '',
        addTodoError: '',
        getTodoStatus: '',
        getTodoError: '',
        updateTodoStatus: '',
        updateTodoError: '',
        deleteTodoStatus: 'rejected',
        deleteTodoError: 'action.payload',
      };
    },
  },
});

export default todoSlice.reducer;

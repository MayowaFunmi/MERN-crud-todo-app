import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token'),
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  _id: '',
  registerStatus: '',
  registerError: '',
  loginStatus: '',
  loginError: '',
  userLoaded: '',
};

const url = 'http://localhost:5000/api';

// create an action creator
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/register`, {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      localStorage.setItem('token', token.data);
      console.log('token = ' + token);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: 'pending' };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        return { ...state, token: action.payload };
      } else {
        return state;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;

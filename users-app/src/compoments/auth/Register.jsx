import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/authSlice';
import { StyledForm } from './StyledForm';

const Register = () => {
  const dispatch = useDispatch(); // use to values from form to the backend via registerUser function in slice
  const auth = useSelector((state) => state.auth);
  console.log('auth = ', auth); //shows initialState from authSlice
  const [user, setUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  console.log('user = ', user);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
    setUser({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <br />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />
        <input
          type="password"
          name="comfirm_password"
          placeholder="Confirm Password"
        />
        <br />
        <br />
        <button>
          {auth.registerStatus === 'pending' ? 'Sending Data ...' : 'Register'}
        </button>

        {auth.registerStatus === 'rejected' ? (
          <p className="error">{auth.registerError}</p>
        ) : null}

        {auth.registerStatus === 'success' ? (
          <p className="success">{auth.registerStatus}</p>
        ) : null}
      </StyledForm>
    </>
  );
};

export default Register;

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const route = state === 'Sign Up' ? '/register' : '/login';
      const body = state === 'Sign Up' ? { name, email, password } : { email, password };
const { data } = await axios.post(`/api/user${route}`, body);

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Something went wrong!');
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center px-4 py-8'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col gap-4 w-full max-w-md p-8 border rounded-xl text-sm text-text shadow-lg bg-white'
      >
        <h2 className='text-2xl font-semibold'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className='text-muted'>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment.
        </p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <label className='block mb-1 text-sm font-medium'>Full Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type='text'
              required
              className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>
        )}

        <div className='w-full'>
          <label className='block mb-1 text-sm font-medium'>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            required
            className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>

        <div className='w-full'>
          <label className='block mb-1 text-sm font-medium'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            required
            className='w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type='submit'
          className='bg-primary text-white w-full py-2 rounded-md text-base transition-all'
        >
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </motion.button>

        <p className='text-sm text-muted'>
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className='text-primary underline cursor-pointer'
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className='text-primary underline cursor-pointer'
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </motion.div>
    </form>
  );
};

export default Login;

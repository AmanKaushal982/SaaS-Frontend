import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getMe } from './services/authThunks.js';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);
  return <Outlet />;
}

export default App

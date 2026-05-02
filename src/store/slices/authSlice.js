import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};
const authSlice = {
    name: 'auth',
    initialState,
    reducers: {

    }
}
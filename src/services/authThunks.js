import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './axios.js';
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (formDate, thunkAPI) => {
        try {
            const response = await api.post('/auth/register', formData);
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Registration failed'
            );
        }
    }
);
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, thunkAPI) => {
        try {
            const response = await api.post('/auth/login', formData);
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Login failed'
            );
        }
    }
);
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            await api.post('/auth/logout');
            return null;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Logout failed'
            );
        }
    }
);
export const getMe = createAsyncThunk(
    'auth/getMe',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Session expired'
            );
        }
    }
);
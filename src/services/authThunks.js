import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './axios.js';
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (finalPayload, thunkAPI) => {
        try {
            const response = await api.post('/auth/register', finalPayload);
            return response.data;
        }
        catch (err) {
            const data = err.response?.data;
            return thunkAPI.rejectWithValue(
                data?.errors || data?.message || 'Registration failed'
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
            const data = err.response?.data;
            return thunkAPI.rejectWithValue(
                data?.errors || data?.message || 'Login failed'
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
            const data = err.response?.data;
            return thunkAPI.rejectWithValue(
                data?.errors || data?.message || 'Session expired'
            );
        }
    }
);
export const oauthLogin = createAsyncThunk(
    'auth/oauthLogin',
    async (formData, thunkAPI) => {
        try {
            const response = await api.post('/auth/oauth', formData);
            return response.data;
        }
        catch (err) {
            const data = err.response?.data;
            return thunkAPI.rejectWithValue(
                data?.errors || data?.message || 'OAuth login failed'
            );
        }
    }
);
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (formData, thunkAPI) => {
        try {
            const response = await api.post('/auth/forgot', formData);
            return response.data;
        }
        catch (err) {
            const data = err.response?.data;
            return thunkAPI.rejectWithValue(
                data?.errors || data?.message || 'password reset failed'
            )
        }
    }
)
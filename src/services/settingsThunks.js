import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './axios';

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (FormData, thunkAPI) => {
        try {
            const response = await api.put('/settings/profile', formData);
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to updateprofile'
            );
        }
    }
);

export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async (formData, thunkAPI) => {
        try {
            const response = await api.put('/settings/password', formData);
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to update password'
            );
        }
    }
);
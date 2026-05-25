import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './axios';

export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/admin/users');
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to fetch users'
            );
        }
    }
);

export const changeUserRole = createAsyncThunk(
    'admin/changeUserRole',
    async ({ id, role }, thunkAPI) => {
        try {
            const response = await api.put(`/admin/users/${id}/role`, { role });
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to update role'
            );
        }
    }
);
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './axios';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/tasks');
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to fetch tasks'
            );
        }
    }
);
export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData, thunkAPI) => {
        try {
            const response = await api.post('/tasks', taskData);
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to create task'
            );
        }
    }
);
export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, updates }, thunkAPI) => {
        try {
            const response = await api.put(`/tasks/${id}`, updates);
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to update task'
            );
        }
    }
);
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, thunkAPI) => {
        try {
            await api.delete(`/tasks/${id}`);
            return id;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to delete task'
            );
        }
    }
);
export const getTaskById = createAsyncThunk(
    'tasks/getTaskById',
    async (id, thunkAPI) => {
        try {
            const response = await api.get(`/tasks/${id}`);
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Failed to fetch task'
            );
        }
    }
);

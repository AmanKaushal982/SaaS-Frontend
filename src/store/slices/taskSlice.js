import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, createTask, updateTask, deleteTask, getTaskById } from '../../services/taskThunks.js';

const initialState = {
    tasks: [],
    loading: false,
    error: null,
    selectedTask: null,
    filters: {
        status: 'all',
        priority: 'all'
    }
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setStatusFilter: (state, action) => {
            state.filters.status = action.payload;
        },
        setPriorityFilter: (state, action) => {
            state.filters.priority = action.payload;
        },
        clearTaskError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload.tasks;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.tasks.unshift(action.payload.task);
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const index = state.tasks.findIndex((t) => t._id === action.payload.task._id);
            if (index !== -1) {
                state.tasks[index] = action.payload.task;
            }
            if (state.selectedtask?._id === action.payload.task._id) {
                state.selectedTask = action.payload.task;
            }
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((t) => t._id !== action.payload);
        })
        builder.addCase(getTaskById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getTaskById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTask = action.payload.task;
            })
            .addCase(getTaskById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});
export const { setStatusFilter, setPriorityFilter, clearTaskError } = taskSlice.actions;
export default taskSlice.reducer;
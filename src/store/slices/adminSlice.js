import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers, changeUserRole } from '../../services/adminThunks.js';

const initialState = {
    users: [],
    loading: false,
    error: null
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder.addCase(changeUserRole.fulfilled, (state, action) => {
            const index = state.users.findIndex(
                (u) => u._id === action.payload.user._id
            );
            if (index !== -1) {
                state.users[index] = action.payload.user;
            }
        })
    }
})
export default adminSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            authRequest: (state) => {
                state.loading = true;
                state.error = null;
            },
            authSuccess: (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            },
            authFailure: (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            },
            logout: (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
            },
            clearError: (state) => {
                state.error = null;
            }
        }
    }
);

const { authRequest, authSuccess, authFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
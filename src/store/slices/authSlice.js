import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, getMe, updateProfile, updatePassword } from '../../services/authThunks.js';

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
            // authRequest: (state) => {
            //     state.loading = true;
            //     state.error = null;
            // },
            // authSuccess: (state, action) => {
            //     state.loading = false;
            //     state.user = action.payload;
            //     state.isAuthenticated = true;
            //     state.error = null;
            // },
            // authFailure: (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            //     state.isAuthenticated = false;
            // },
            logout: (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
            },
            clearError: (state) => {
                state.error = null;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
                .addCase(registerUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                })
                .addCase(registerUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
            builder.addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
            builder.addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            builder.addCase(getMe.pending, (state) => {
                state.loading = true;
            })
                .addCase(getMe.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                })
                .addCase(getMe.rejected, (state) => {
                    state.loading = false;
                    state.user = null;
                    state.isAuthenticated = false;
                })
            builder.addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
                .addCase(updateProfile.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                })
                .addCase(updateProfile.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
            builder.addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
                .addCase(updatePassword.fulfilled, (state) => {
                    state.loading = false;
                })
                .addCase(updatePassword.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
        }
    }
);

// const { authRequest, authSuccess, authFailure, logout, clearError } = authSlice.actions;

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
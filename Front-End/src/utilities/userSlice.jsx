// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        token: null,
        userInfo: null, // Additional user information, if needed
    },
    reducers: {
        addUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        logoutUser: () => {
            return { token: null, userInfo: null };
        },
    },
});

export const { addUser, logoutUser } = user.actions;
export default user.reducer;

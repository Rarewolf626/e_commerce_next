import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TUser = {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
};

type TAuth = {
    user: TUser;
    token: string;
};

type TAuthState = {
    auth: TAuth | null;
}

const initialState: TAuthState = {
    auth: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<TAuth>) {
            state.auth = action.payload;
        },
        logout(state) {
            state.auth = null
        }
    },
});

export const { addUser, logout } = authSlice.actions;
export default authSlice;
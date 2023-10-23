import { createSlice } from "@reduxjs/toolkit";
import avatar from '/src/assets/images/mock/avatar.png';

const initialState = {
    isAuthorized: false,
    accessToken: '',
    userName: '',
    userAvatar: null,
    expire: '',
    usedCompanyCount: 0,
    companyLimit: 0,
    tariff: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn(state, action) {
            state.isAuthorized = true;
            state.accessToken = action.payload.accessToken;
            state.expire = action.payload.expire;
            state.userName = action.payload.userName || 'Алексей С.';
            state.userAvatar = action.payload.userAvatar || avatar;
        },
        logOut() {
            return  initialState
        },
        getLimits(state, action) {
            state.usedCompanyCount = action.payload.usedCompanyCount;
            state.companyLimit = action.payload.companyLimit;
            state.tariff = action.payload.tariff || (state.isAuthorized && 'beginner');
        },
    }
});

export const { logIn, logOut, getLimits } = userSlice.actions;

export default userSlice.reducer;
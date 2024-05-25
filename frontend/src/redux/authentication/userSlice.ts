import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    userId: string;
    username: string;
    email: string;
    accessToken: string;
}

const initialState : UserState = {
    userId: "",
    username: "",
    email: "",
    accessToken: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action : PayloadAction<UserState>) => {
            state.accessToken = action.payload.accessToken;
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.username = action.payload.username;
        },
        removeUserData: (state) => {
            state.accessToken = "";
            state.userId = "";
            state.email = "";
            state.username = "";
        },
    }
})

export const { setUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
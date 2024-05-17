import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUser: false,
};

export const isUserSlice = createSlice({
    name: "isUser",
    initialState,
    reducers: {
        isUserSuccess: (state, action) => {
            state.isUser = action.payload
        },
    },
});

export const { isUserSuccess} = isUserSlice.actions;

export default isUserSlice.reducer;
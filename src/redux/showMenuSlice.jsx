import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: true,
};

export const showMenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        menuSuccess: (state, action) => {
            state.menu = action.payload
        },
    },
});

export const { menuSuccess} = showMenuSlice.actions;

export default showMenuSlice.reducer;
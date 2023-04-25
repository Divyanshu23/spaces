import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        isAdmin: false,
        user: null
    },
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = action.payload
        },
        toggleAdmin: (state, action) => {
            state.isAdmin = !state.isAdmin
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const userActions = userSlice.actions
export default userSlice
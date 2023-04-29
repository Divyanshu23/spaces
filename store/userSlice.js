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
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
        addDues: (state, action) => {
            state.user.dues += action.payload
        },
        subtractDues: (state, action) => {
            state.user.dues -= action.payload
        }
    }
})

export const userActions = userSlice.actions
export default userSlice
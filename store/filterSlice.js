import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: []
    },
    reducers: {
        changeFilter: (state, action) => {
            state.filter = action.payload
        },
        clearFilter: (state, action) => {
            state.cart = []
        }
    }
})

export const filterActions = filterSlice.actions
export default filterSlice
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import filterSlice from "./filterSlice";


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        filter: filterSlice.reducer,
    }
})

export default store
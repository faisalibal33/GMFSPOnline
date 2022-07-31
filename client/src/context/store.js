import { configureStore } from "@reduxjs/toolkit";
import requestReducer from "./RequestSlice"

const store = configureStore({
    reducer: {
        request: requestReducer
    }
})

export default store
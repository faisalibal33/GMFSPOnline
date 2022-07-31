import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading: false,
    request: [],
    error: "", 
}
export const fetchRequest = createAsyncThunk("request/fetchRequest", async () => {
    return await axios.get("http://localhost:8800/api/request")
    .then(res => res.data)
})
export const updateRequest = createAsyncThunk("request/updateRequest", async (value) => {
    axios.put(`http://localhost:8800/api/request/${value.id}`, value)
    return await axios.get("http://localhost:8800/api/request").then(res => res.data)
})

const requestSlice = createSlice({
    name: "request",
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchRequest.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchRequest.fulfilled, (state, action) => {
            state.loading = false
            state.request = action.payload
            state.error = ""
        })
        builder.addCase(fetchRequest.rejected, (state, action) => {
            state.loading = false
            state.request = []
            state.error = action.error.message
        })
        builder.addCase(updateRequest.pending, state => {
            state.loading = true
        })
        builder.addCase(updateRequest.fulfilled, (state, action) => {
            state.loading = false
            state.request = action.payload
            state.error = ""
        })
        builder.addCase(updateRequest.rejected, (state, action) => {
            state.loading = false
            state.request = []
            state.error = action.error.message
        })
    }
})

export default requestSlice.reducer
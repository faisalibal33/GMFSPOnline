import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  shipping: [],
  error: "",
};
export const fetchShipping = createAsyncThunk(
  "shipping/fetchShipping",
  async () => {
    return await axios
      .get(`http://localhost:8800/api/shipping`)
      .then((res) => res.data);
  }
);

export const updateShipping = createAsyncThunk(
  "shipping/updateShipping",
  async (value) => {
    console.log(value);
    await axios.put(`http://localhost:8800/api/shipping/${value.id}`, value);
    return await axios
      .get("http://localhost:8800/api/shipping")
      .then((res) => res.data);
  }
);

export const postShipping = createAsyncThunk(
  "shipping/postShipping",
  async (value) => {
    axios.post(`http://localhost:8800/api/shipping`, value);
    return await axios
      .get("http://localhost:8800/api/shipping")
      .then((res) => res.data);
  }
);

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchShipping.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchShipping.fulfilled, (state, action) => {
      state.loading = false;
      state.shipping = action.payload;
      state.error = "";
    });
    builder.addCase(fetchShipping.rejected, (state, action) => {
      state.loading = false;
      state.shipping = [];
      state.error = action.error.message;
    });
    // builder.addCase(updateRequest.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(updateRequest.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.request = action.payload;
    //   state.error = "";
    // });
    // builder.addCase(updateRequest.rejected, (state, action) => {
    //   state.loading = false;
    //   state.request = [];
    //   state.error = action.error.message;
    // });
    builder.addCase(postShipping.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postShipping.fulfilled, (state, action) => {
      state.loading = false;
      state.shipping = action.payload;
      state.error = "";
    });
    builder.addCase(postShipping.rejected, (state, action) => {
      state.loading = false;
      state.shipping = [];
      state.error = action.error.message;
    });
  },
});

export default shippingSlice.reducer;

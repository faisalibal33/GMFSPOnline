import { configureStore } from "@reduxjs/toolkit";
import requestShipping from "./ShippingSlice";
import usersReducer from "./usersSlice";
import cycleReducer from "./cycle";

const store = configureStore({
  reducer: {
    shipping: requestShipping,
    users: usersReducer,
    cycle: cycleReducer,
  },
});

export default store;

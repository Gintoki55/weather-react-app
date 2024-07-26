import { configureStore } from "@reduxjs/toolkit";
import wheatherSlice from "../weatherApiSlice";

export const store = configureStore({
  reducer: {
    weather: wheatherSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";

//slices
import homeSlice from "../features/home/homeSlice";

const store = configureStore({
   reducer: {
      home: homeSlice,
   },
});

export { store };

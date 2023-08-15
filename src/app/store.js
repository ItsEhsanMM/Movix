import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

//slices
import homeSlice from "../features/home/homeSlice";

const store = configureStore({
   reducer: {
      home: homeSlice,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export { store };

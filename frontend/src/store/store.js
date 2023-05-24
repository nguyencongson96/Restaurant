import { configureStore } from "@reduxjs/toolkit";
import infoSlice from "./reducers/info";

const store = configureStore({
  reducer: {
    infos: infoSlice.reducer,
  },
});

export default store;

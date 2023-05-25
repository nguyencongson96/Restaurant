import { configureStore } from "@reduxjs/toolkit";
import infoSlice from "./reducers/info";
import productSlice from "./reducers/product";

const store = configureStore({
  reducer: {
    infos: infoSlice.reducer,
    products: productSlice.reducer,
  },
});

export default store;

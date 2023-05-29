import { configureStore } from "@reduxjs/toolkit";
import infoSlice from "./reducers/info";
import productSlice from "./reducers/product";
import eventSlice from "./reducers/event";
import generalSlice from "./reducers/general";
import reservationsSlice from "./reducers/reservation";

const store = configureStore({
  reducer: {
    infos: infoSlice.reducer,
    products: productSlice.reducer,
    events: eventSlice.reducer,
    reservations: reservationsSlice.reducer,
    general: generalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

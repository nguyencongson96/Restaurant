import { createSlice, current } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    resNav: { isShow: false, isSatisfyWidth: false },
  },
  reducers: {
    checkWidth: (state, action) => {
      const currentWidth = action.payload;
      state.resNav.isSatisfyWidth = currentWidth <= 768;
    },
    setShow: (state) => {
      state.resNav.isShow = !current(state).resNav.isShow;
    },
  },
});

export default generalSlice;

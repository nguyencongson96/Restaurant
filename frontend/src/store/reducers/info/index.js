import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import infoAPI from "../../../service/infoAPI";

export const getInfo = createAsyncThunk("info/getInfo", async (obj, thunkAPI) => {
  try {
    const { detail, field } = obj;
    return await infoAPI.get({ detail, field });
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

const infoSlice = createSlice({
  name: "info",
  initialState: {
    isLogIn: false,
    detail: {
      name: "",
      phone: "",
      email: "",
      description: "",
      time: [],
      location: [],
    },
  },
  reducers: {
    logIn: (state) => {
      state.isLogIn = true;
    },
    logOut: (state) => {
      state.isLogIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInfo.fulfilled, (state, action) => {
      Object.keys(current(state).detail).forEach((key) => {
        state.detail[key] = action.payload[key];
      });
    });
  },
});

export default infoSlice;

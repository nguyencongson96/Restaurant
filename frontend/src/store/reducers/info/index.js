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

export const updateInfo = createAsyncThunk("info/updateInfo", async (obj, thunkAPI) => {
  try {
    return await infoAPI.update(obj);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk("info/logIn", async (pwd, thunkAPI) => {
  try {
    return await infoAPI.logIn(pwd);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk("info/logOut", async (obj, thunkAPI) => {
  try {
    return await infoAPI.logOut();
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
      image: [],
      time: [],
      location: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfo.fulfilled, (state, action) => {
      Object.keys(current(state).detail).forEach((key) => {
        state.detail[key] = action.payload[key];
      });
    });
    builder.addCase(updateInfo.fulfilled, (state, action) => {
      Object.keys(current(state).detail).forEach((key) => {
        state.detail[key] = action.payload[key];
      });
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLogIn = true;
      localStorage.setItem("token", JSON.stringify(action.payload.accessToken));
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isLogIn = false;
      localStorage.removeItem("token");
    });
  },
});

export default infoSlice;

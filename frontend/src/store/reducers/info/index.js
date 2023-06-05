import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import infoAPI from "service/infoAPI";
import { handleNoti } from "../general";

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
  return await infoAPI.logIn(pwd);
});

export const logOut = createAsyncThunk("info/logOut", async (obj, thunkAPI) => {
  try {
    return await infoAPI.logOut();
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

const initState = {
  name: "",
  phone: "",
  email: "",
  description: "",
  image: [],
  time: [],
  location: [],
};

const infoSlice = createSlice({
  name: "info",
  initialState: {
    isLogIn: false,
    detail: initState,
    currentState: initState,
  },
  reducers: {
    updateState: (state, action) => {
      state.currentState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInfo.fulfilled, (state, action) => {
      Object.keys(current(state).detail).forEach((key) => {
        state.detail[key] = action.payload[key];
        state.currentState[key] = action.payload[key];
      });
    });
    builder.addCase(updateInfo.fulfilled, (state, action) => {
      Object.keys(current(state).detail).forEach((key) => {
        state.detail[key] = action.payload[key];
      });
      handleNoti("success", "Update Successfully");
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLogIn = true;
      localStorage.setItem("token", JSON.stringify(action.payload.accessToken));
      handleNoti("success", "Login Successfully");
    });
    builder.addCase(logIn.rejected, (state, action) => {
      handleNoti("error", JSON.parse(action.error.message));
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isLogIn = false;
      localStorage.removeItem("token");
    });
  },
});

export default infoSlice;

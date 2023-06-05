import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import reservationAPI from "service/reservationAPI";
import { handleNoti } from "../general";

export const getManyByUser = createAsyncThunk("reservation/getByUser", async (obj, thunkAPI) => {
  try {
    const { phone, field } = obj;
    return await reservationAPI.getManybyUser({ phone, field });
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const addNewByUser = createAsyncThunk("reservation/addNewByUser", async (obj) => {
  return await reservationAPI.addNewByUser(obj);
});

export const getManyByAdmin = createAsyncThunk("reservation/getManyByAdmin", async (obj, thunkAPI) => {
  try {
    return await reservationAPI.getManyByAdmin(obj);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const updateByAdmin = createAsyncThunk("reservation/updateByAdmin", async (obj, thunkAPI) => {
  try {
    return await reservationAPI.updateOneByAdmin(obj);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const getOneByAdmin = createAsyncThunk("reservation/getOneByAdmin", async (id, thunkAPI) => {
  try {
    return await reservationAPI.getOneByAdmin(id);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

const reservationsSlice = createSlice({
  name: "reservation",
  initialState: {
    isShow: false,
    list: [],
    current: {
      _id: "",
      bookingName: "",
      phone: "",
      locationId: "",
      location: "",
      numberOfPeople: "1",
      date: "",
      time: "",
    },
  },
  reducers: {
    setShow: (state) => {
      state.isShow = !current(state).isShow;
    },
    changeCurrent: (state, action) => {
      state.current = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getManyByUser.fulfilled, (state, action) => {
      const newList = action.payload.list;
      state.list = newList ? newList : [];
    });
    builder.addCase(addNewByUser.fulfilled, (state, action) => {
      handleNoti("success", "Booking successfully");
      state.isShow = false;
      state.current = {
        bookingName: "",
        phone: "",
        locationId: "",
        numberOfPeople: "1",
        date: "",
        time: "",
      };
    });
    builder.addCase(addNewByUser.rejected, (state, action) => {
      const message = Object.values(JSON.parse(action.error.message)).reduce((msg, value) => {
        msg += value += ", ";
        return msg;
      }, "");
      handleNoti("error", message);
    });
    builder.addCase(getManyByAdmin.fulfilled, (state, action) => {
      const newList = action.payload.list;
      state.list = newList ? newList : [];
    });
    builder.addCase(getManyByAdmin.rejected, (state, action) => {
      console.log(action);
      const message = Object.values(JSON.parse(action.error.message)).reduce((msg, value) => {
        msg += value += ", ";
        return msg;
      }, "");
      handleNoti("error", message);
    });
    builder.addCase(getOneByAdmin.fulfilled, (state, action) => {
      const currentState = current(state).current;
      Object.keys(currentState).forEach((key) => {
        state.current[key] = action.payload[key];
      });
    });
    builder.addCase(updateByAdmin.fulfilled, (state, action) => {
      const index = state.list.findIndex((item) => (item._id = action.payload._id));
      state.list.splice(index, 1, action.payload);
    });
  },
});

export default reservationsSlice;

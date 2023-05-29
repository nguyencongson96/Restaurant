import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import reservationAPI from "../../../service/reservationAPI";
import { toast } from "react-toastify";

const handleNoti = (status, description) => {
  setTimeout(() => {
    toast[status](description, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }, 500);
};

export const getMany = createAsyncThunk("reservation/getMany", async (obj, thunkAPI) => {
  try {
    const { phone, field } = obj;
    return await reservationAPI.getMany({ phone, field });
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const addNew = createAsyncThunk("reservation/addNew", async (obj) => {
  const res = await reservationAPI.addNew(obj);
  handleNoti("success", res.data);
  return res;
});

const reservationsSlice = createSlice({
  name: "reservation",
  initialState: {
    isShow: false,
    list: [],
    current: {
      bookingName: "",
      phone: "",
      locationId: "",
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
    builder.addCase(getMany.fulfilled, (state, action) => {
      const newList = action.payload.list;
      state.list = newList ? newList : [];
    });
    builder.addCase(addNew.fulfilled, (state, action) => {
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
    builder.addCase(addNew.rejected, (state, action) => {
      const message = Object.values(JSON.parse(action.error.message)).reduce((msg, value) => {
        msg += value += ", ";
        return msg;
      }, "");
      handleNoti("error", message);
    });
  },
});

export default reservationsSlice;

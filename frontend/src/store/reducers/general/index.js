import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import placeAPI from "../../../service/placeAPI";
import { toast } from "react-toastify";

export const handleNoti = (status, description) => {
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

export const getCityList = createAsyncThunk("general/getCityList", async (obj, thunkAPI) => {
  try {
    return await placeAPI.getCityList();
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const getDistrictList = createAsyncThunk("general/getDistrictList", async (city, thunkAPI) => {
  try {
    return await placeAPI.getDistrictList(city);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

const generalSlice = createSlice({
  name: "general",
  initialState: {
    resNav: { isShow: false, isSatisfyWidth: false },
    place: { city: [], district: [] },
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
  extraReducers: (builder) => {
    builder.addCase(getCityList.fulfilled, (state, action) => {
      state.place.city = action.payload;
    });
    builder.addCase(getDistrictList.fulfilled, (state, action) => {
      state.place.district = action.payload;
    });
  },
});

export default generalSlice;

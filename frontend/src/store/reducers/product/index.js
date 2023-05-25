import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import productAPI from "../../../service/productAPI";

export const getProduct = createAsyncThunk("product/get", async (obj, thunkAPI) => {
  try {
    const { random, field, category, page } = obj;
    return await productAPI.getMany({ random, field, category, page });
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    totalList: [],
    filter: { category: "", list: [] },
    page: "",
  },
  reducers: {
    setCategory: (state, action) => {
      const currentState = current(state);
      if (currentState.filter.category !== action.payload) {
        state.filter.category = action.payload;
        state.filter.list =
          action.payload === "all"
            ? currentState.totalList
            : state.totalList.filter((item) => item.category === action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.totalList = action.payload.list;
    });
  },
});

export default productSlice;

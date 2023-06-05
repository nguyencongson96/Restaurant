import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import productAPI from "../../../service/productAPI";
import { handleNoti } from "../general";

export const getProduct = createAsyncThunk("product/get", async (obj, thunkAPI) => {
  try {
    const { random, field, category, page } = obj;
    return await productAPI.getMany({ random, field, category, page });
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const addNewProduct = createAsyncThunk("product/addNewProduct", async (obj, thunkAPI) => {
  return await productAPI.addNew(obj);
});

export const updateProduct = createAsyncThunk("product/updateProduct", async (obj, thunkAPI) => {
  try {
    return await productAPI.updateOne(obj);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const removeProduct = createAsyncThunk("product/removeProduct", async (obj, thunkAPI) => {
  try {
    const { id } = obj;
    return Array.isArray(id) ? await productAPI.deleteMany({ id }) : await productAPI.deleteOne(id);
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
    currentState: {
      _id: "",
      name: "",
      category: "",
      price: 0,
      description: "",
      image: [""],
    },
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
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.totalList = action.payload.list;
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.totalList.push(action.payload);
      handleNoti("success", "Successful");
    });
    builder.addCase(addNewProduct.rejected, (state, action) => {
      const message = Object.values(JSON.parse(action.error.message)).reduce((msg, value) => {
        msg += value += ", ";
        return msg;
      }, "");
      handleNoti("error", message);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.totalList.findIndex((item) => item._id === action.payload._id);
      state.totalList.splice(index, 1, action.payload);
      handleNoti("success", "Update successfully");
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      const message = Object.values(JSON.parse(action.error.message)).reduce((msg, value) => {
        msg += value += ", ";
        return msg;
      }, "");
      handleNoti("error", message);
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.totalList = current(state).totalList.filter((item) => item._id !== action.payload._id);
      handleNoti("success", "Successful");
    });
    builder.addCase(removeProduct.rejected, (state, action) => {
      const message = Object.values(JSON.parse(action.error.message)).reduce((msg, value) => {
        msg += value += ", ";
        return msg;
      }, "");
      handleNoti("error", message);
    });
  },
});

export default productSlice;

import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import eventAPI from "../../../service/eventAPI";

export const getMany = createAsyncThunk("event/getMany", async (obj, thunkAPI) => {
  try {
    const { page, field } = obj;
    return await eventAPI.getMany({ page, field });
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const addNew = createAsyncThunk("event/addNew", async (obj, thunkAPI) => {
  try {
    return await eventAPI.addNew(obj);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const updateOne = createAsyncThunk("event/updateOne", async (obj, thunkAPI) => {
  try {
    const { id, ...rest } = obj;
    return await eventAPI.updateOne(id, rest);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteOne = createAsyncThunk("event/deleteOne", async (id, thunkAPI) => {
  try {
    return await eventAPI.deleteOne(id);
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

const eventSlice = createSlice({
  name: "event",
  initialState: {
    total: 1,
    list: [
      {
        id: "",
        title: "",
        category: "",
        description: "",
        location: "",
        beginAt: "",
        endAt: "",
      },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMany.fulfilled, (state, action) => {
      state.total = action.payload.total;
      state.list = action.payload.list;
    });
    builder.addCase(addNew.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    builder.addCase(updateOne.fulfilled, (state, action) => {
      const updateEvent = action.payload;
      const index = current(state).list.findIndex((item) => item.id === updateEvent._id);
      state.list.splice(index, 1, updateEvent);
    });
    builder.addCase(deleteOne.fulfilled, (state, action) => {
      const deleteEvent = action.payload;
      const index = current(state).list.findIndex((item) => item.id === deleteEvent._id);
      state.list.splice(index, 1);
    });
  },
});

export default eventSlice;

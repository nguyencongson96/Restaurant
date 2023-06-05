import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import eventAPI from "../../../service/eventAPI";
import { handleNoti } from "../general";

export const getMany = createAsyncThunk("event/getMany", async (obj, thunkAPI) => {
  try {
    const { page, field } = obj;
    return await eventAPI.getMany({ page, field });
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const getOne = createAsyncThunk("event/getOne", async (id, thunkAPI) => {
  try {
    return await eventAPI.getOne(id);
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
    const { _id, ...rest } = obj;
    return await eventAPI.updateOne(_id, rest);
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

const initState = {
  _id: "",
  title: "",
  category: "",
  description: "",
  image: [""],
  locationId: "",
  beginAt: "",
  endAt: "",
};

const eventSlice = createSlice({
  name: "event",
  initialState: {
    total: 1,
    list: [initState],
    currentState: initState,
  },
  reducers: {
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMany.fulfilled, (state, action) => {
      state.total = action.payload.total;
      state.list = action.payload.list;
    });
    builder.addCase(getOne.fulfilled, (state, action) => {
      state.currentState = action.payload;
    });
    builder.addCase(addNew.fulfilled, (state, action) => {
      state.list.push(action.payload);
      handleNoti("success", "Add Successfully");
    });
    builder.addCase(addNew.rejected, (state, action) => {
      const message = Object.values(JSON.parse(action.error.message)).reduce((msg, value) => {
        msg += value += ", ";
        return msg;
      }, "");
      handleNoti("error", message);
    });
    builder.addCase(updateOne.fulfilled, (state, action) => {
      const updateEvent = action.payload;
      const index = current(state).list.findIndex((item) => item.id === updateEvent._id);
      state.list.splice(index, 1, updateEvent);
    });
    builder.addCase(updateOne.rejected, (state, action) => {
      const message = Object.values(JSON.parse(action.error.message)).reduce((msg, value) => {
        msg += value += ", ";
        return msg;
      }, "");
      handleNoti("error", message);
    });
    builder.addCase(deleteOne.fulfilled, (state, action) => {
      const deleteEvent = action.payload;
      const index = current(state).list.findIndex((item) => item.id === deleteEvent._id);
      state.list.splice(index, 1);
      handleNoti("success", "Remove Successfully");
    });
    builder.addCase(deleteOne.rejected, (state, action) => {
      const message = Object.values(JSON.parse(action.error.message)).reduce((msg, value) => {
        msg += value += ", ";
        return msg;
      }, "");
      handleNoti("error", message);
    });
  },
});

export default eventSlice;

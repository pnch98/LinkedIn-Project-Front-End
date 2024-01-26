import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { token } from "../../token";

const initialState = {
  data: null,
  status: "idle",
  error: "",
};

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (queryParam, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${queryParam}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const fetchProfileSlice = createSlice({
  name: "fetchProfile",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const selectProfileData = (state) => state.fetchProfile.data;
export const { setData } = fetchProfileSlice.actions;
export default fetchProfileSlice.reducer;

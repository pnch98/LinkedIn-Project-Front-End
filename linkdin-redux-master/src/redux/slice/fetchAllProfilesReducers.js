import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { token } from "../../token";

const initialState = {
  data: null,
  status: "idle",
  error: "",
};

export const fetchAllProfiles = createAsyncThunk("profile/fetchAllProfiles", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/profile/`, {
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

const fetchAllProfilesSlice = createSlice({
  name: "fetchAllProfiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProfiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAllProfiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const selectAllProfilesData = (state) => state.fetchAllProfiles.data;
export default fetchAllProfilesSlice.reducer;

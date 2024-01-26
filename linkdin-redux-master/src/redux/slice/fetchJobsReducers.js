import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async ({ searchQuery, n = 1 }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      searchQuery
        ? `https://strive-benchmark.herokuapp.com/api/jobs?limit=20&offset=${20 * (n - 1)}&search=${searchQuery}`
        : `https://strive-benchmark.herokuapp.com/api/jobs?limit=20&offset=${20 * (n - 1)}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    entities: null,
    loading: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = "idle";
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;

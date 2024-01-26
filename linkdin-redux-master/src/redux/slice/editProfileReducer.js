import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { token } from "../../token";

const initialState = {
  data: null,
  status: "idle",
  error: "",
};

export const editProfile = createAsyncThunk("profile/editProfile", async (dataToEdit, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/profile/`, {
      method: "PUT",
      body: JSON.stringify(dataToEdit),
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

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {
    setEditProfile: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectEditProfileData = (state) => state.editProfile.data;
export const { setEditProfile } = editProfileSlice.actions;
export default editProfileSlice.reducer;

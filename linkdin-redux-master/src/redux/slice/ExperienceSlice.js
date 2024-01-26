import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { token } from "../../token";
const BASE_URL = "https://striveschool-api.herokuapp.com/api/profile/";

export const fetchExperiences = createAsyncThunk("experiences/fetchExperiences", async (userId, thunkAPI) => {
  try {
    const response = await fetch(`${BASE_URL}${userId}/experiences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addExperience = createAsyncThunk(
  "experiences/addExperience",
  async ({ userId, experienceData }, thunkAPI) => {
    console.log("from fetch: " + experienceData);
    console.log(typeof experienceData.startDate);
    try {
      const response = await fetch(`${BASE_URL}${userId}/experiences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experienceData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editExperience = createAsyncThunk(
  "experiences/editExperience",
  async ({ userId, expId, experienceData }, thunkAPI) => {
    console.log("expId: ", expId);
    console.log("userId: ", userId);
    console.log("experienceData: ", experienceData);
    try {
      const response = await fetch(`${BASE_URL}${userId}/experiences/${expId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experienceData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteExperience = createAsyncThunk(
  "experiences/deleteExperience",
  async ({ userId, expId }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}${userId}/experiences/${expId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Errore nella cancellazione dell'esperienza.");
      }
      return expId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const experiencesSlice = createSlice({
  name: "experiences",
  initialState: {
    items: [],
    experience: {
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setExperienceRole: (state, action) => {
      state.experience.role = action.payload;
    },
    setExperienceCompany: (state, action) => {
      state.experience.company = action.payload;
    },
    setExperienceStartDate: (state, action) => {
      state.experience.startDate = action.payload;
    },
    setExperienceEndDate: (state, action) => {
      state.experience.endDate = action.payload;
    },
    setExperienceDescription: (state, action) => {
      state.experience.description = action.payload;
    },
    setExperienceArea: (state, action) => {
      state.experience.area = action.payload;
    },
    resetExperience: (state) => {
      state.experience = {
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        area: "",
        user: "",
        image: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.items = { ...state, items: action.payload };
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editExperience.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item._id !== action.payload); // Rimuove l'esperienza dall'elenco
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllExperiencesData = (state) => state.fetchExperiences.items;
export const {
  setExperienceRole,
  setExperienceCompany,
  setExperienceArea,
  setExperienceStartDate,
  setExperienceDescription,
  setExperienceEndDate,
  resetExperience,
} = experiencesSlice.actions;
export default experiencesSlice.reducer;

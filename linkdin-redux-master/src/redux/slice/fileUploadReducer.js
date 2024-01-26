import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../token";

export const uploadFile = createAsyncThunk("fileUpload/uploadFile", async ({ file, type, id, expId }) => {
  console.log(file, type, id, expId);
  let URL;
  switch (type) {
    case "profile":
      URL = `https://striveschool-api.herokuapp.com/api/profile/${id}/picture`;
      break;
    case "experience":
      URL = `https://striveschool-api.herokuapp.com/api/profile/${id}/experiences/${expId}/picture`;
      break;
    case "post":
      URL = `https://striveschool-api.herokuapp.com/api/posts/${id}`;
      break;
    default:
      throw new Error("Invalid upload type");
  }
  console.log(URL);

  try {
    const formData = new FormData();
    formData.append(type, file); // 'image' è il nome del campo nel form data

    console.log("formData: ", formData);

    const response = await fetch(URL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default fileUploadSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenComments } from "../../tokenComments.js";

const initialState = {
  comments: [],
  singleComment: null,
  status: "idle",
};

export const fetchAllComments = createAsyncThunk("comments/fetchAllComments", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenComments}`,
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

export const fetchSingleComment = createAsyncThunk(
  "comments/fetchSingleComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenComments}`,
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
  }
);

export const deleteComment = createAsyncThunk("comments/deleteComment", async (commentId, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenComments}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return commentId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ commentId, comment, rate, elementId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenComments}`,
        },
        body: JSON.stringify({ comment, rate, elementId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ comment, rate, elementId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenComments}`,
        },
        body: JSON.stringify({ comment, rate, elementId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchCommentsSlice = createSlice({
  name: "fetchComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSingleComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleComment = action.payload;
      })
      .addCase(fetchSingleComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((comment) => comment._id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.comments = state.comments.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        );
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { actions } = fetchCommentsSlice;
export default fetchCommentsSlice.reducer;

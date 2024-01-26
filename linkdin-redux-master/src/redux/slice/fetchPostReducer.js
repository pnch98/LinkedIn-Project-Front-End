import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { token } from "../../token";

const initialState = {
	postList: null,
	status: "idle",
	error: "",
	post: {
		text: "",
	},
	myPosts: [],
};

export const fetchAllPosts = createAsyncThunk("profile/fetchAllPosts", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts`, {
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

export const addPost = createAsyncThunk("profile/addPost", async ({ dataToPost }, { rejectWithValue }) => {
	try {
		const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts/`, {
			method: "POST",
			body: JSON.stringify(dataToPost),
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

export const editPost = createAsyncThunk("profile/editPost", async ({ dataToPost, postId }, { rejectWithValue }) => {
	console.log("dataToPost", dataToPost);
	console.log("postId", postId);
	try {
		const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${postId}`, {
			method: "PUT",
			body: JSON.stringify(dataToPost),
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

export const deletePost = createAsyncThunk("profile/deletePost", async ({ postId }, { rejectWithValue }) => {
	try {
		const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${postId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return postId;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const fetchPostSlice = createSlice({
	name: "fetchPost",
	initialState,
	reducers: {
		setPostText: (state, action) => {
			state.post.text = action.payload;
		},
		resetPostText: (state, action) => {
			state.post.text = "";
		},
		addMyPost: (state, action) => {
			if (!state.myPosts.includes(action.payload)) {
				state.myPosts.push(action.payload);
			}
		},
		setUserProfilePosts: (state, action) => {
			state.userProfilePosts = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllPosts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAllPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.postList = action.payload;
			})
			.addCase(fetchAllPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(addPost.pending, (state) => {
				state.status = "loading";
			})
			.addCase(addPost.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.myPosts = [...state.myPosts, action.payload];
			})
			.addCase(addPost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(editPost.pending, (state) => {
				state.status = "loading";
			})
			.addCase(editPost.fulfilled, (state, action) => {
				state.status = "succeeded";
				const editedPostIndex = state.myPosts.findIndex((post) => post._id === action.payload._id);

				if (editedPostIndex !== -1) {
					// Replace the edited post in the array
					state.myPosts[editedPostIndex] = action.payload;
				}
			})
			.addCase(editPost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(deletePost.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.postList = state.postList.filter((post) => post._id !== action.payload); // Rimuove l'esperienza dall'elenco
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});
export const selectMyProfileData = (state) => state.fetchPost.postList;
export const { setPostText, resetPostText, addMyPost, setUserProfilePosts } = fetchPostSlice.actions;
export default fetchPostSlice.reducer;

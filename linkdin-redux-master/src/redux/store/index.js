import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fetchProfileReducer from "../slice/fetchProfileReducer";
import fetchAllProfilesReducers from "../slice/fetchAllProfilesReducers";
import editProfileReducer from "../slice/editProfileReducer";
import ExperienceSlice from "../slice/ExperienceSlice";
import fileUploadReducer from "../slice/fileUploadReducer";
import fetchPostReducer from "../slice/fetchPostReducer";
import fetchMyProfileReducer from "../slice/fetchMyProfileReducer";
import fetchJobsReducers from "../slice/fetchJobsReducers";
import commentsReducer from "../slice/fetchCommentsReducer";

const rootReducer = combineReducers({
	fetchProfile: fetchProfileReducer,
	fetchAllProfiles: fetchAllProfilesReducers,
	editProfile: editProfileReducer,
	fetchExperiences: ExperienceSlice,
	fileUpload: fileUploadReducer,
	fetchMyProfile: fetchMyProfileReducer,
	fetchPost: fetchPostReducer,
	jobs: fetchJobsReducers,
	comments: commentsReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export default store;

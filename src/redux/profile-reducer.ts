import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/profileAPI";
import { Photos, ProfileType } from "../types/types";
import { RootState } from "./redux-store";

const ADD_POST = "profileReducer/ADD-POST";
const SET_USER_PROFILE = "profileReducer/SET_USER_PROFILE";
const SET_STATUS = "profileReducer/SET_STATUS";
const SAVE_PHOTO = "profileReducer/SAVE_PHOTO";

type PostType = {
   id: number;
   message: string;
   likeCount: number;
};

const initialState = {
   posts: [
      { id: 1, message: "Hi, how are you?", likeCount: 12 },
      // { id: 2, message: "It's my first post", likeCount: 11 },
      // { id: 3, message: "Blabla", likeCount: 11 },
      // { id: 4, message: "Dada", likeCount: 11 },
   ] as PostType[],
   profile: null as ProfileType | null,
   status: "" as string,
   savePhotoIsFetching: false as boolean,
};

export type ProfileReducerType = typeof initialState;

//reducers
const profileReducer = (
   state: ProfileReducerType = initialState,
   action: ActionType
): ProfileReducerType => {
   switch (action.type) {
      case ADD_POST: {
         let newPost = {
            id: Date.now(),
            message: action.payload,
            likeCount: 0,
         };
         return {
            ...state,
            posts: [...state.posts, newPost],
         };
      }

      case SET_USER_PROFILE: {
         return {
            ...state,
            profile: action.payload,
         };
      }
      case SET_STATUS: {
         return {
            ...state,
            status: action.payload,
         };
      }
      case SAVE_PHOTO: {
         return {
            ...state,
            profile: {
               ...state.profile,
               photos: action.payload,
            } as ProfileType,
         };
      }
      default:
         return state;
   }
};

type ActionType =
   | addPostCreatorType
   | setUserProfileType
   | setStatusType
   | savePhotoType;

//action creator
type addPostCreatorType = {
   type: typeof ADD_POST;
   payload: string;
};
export const addPostCreator = (newPostText: string): addPostCreatorType => ({
   type: ADD_POST,
   payload: newPostText,
});
type setUserProfileType = {
   type: typeof SET_USER_PROFILE;
   payload: ProfileType;
};
export const setUserProfile = (profile: ProfileType): setUserProfileType => ({
   type: SET_USER_PROFILE,
   payload: profile,
});
type setStatusType = {
   type: typeof SET_STATUS;
   payload: string;
};
export const setStatus = (status: string): setStatusType => ({
   type: SET_STATUS,
   payload: status,
});
type savePhotoType = {
   type: typeof SAVE_PHOTO;
   payload: Photos;
};
export const savePhoto = (file: Photos): savePhotoType => ({
   type: SAVE_PHOTO,
   payload: file,
});

//thunk creators
type ThunkActionType = ThunkAction<
   Promise<void>,
   RootState,
   unknown,
   ActionType
>;

export const getUserProfileThunkCreator = (userId: number): ThunkActionType => {
   return async (dispatch) => {
      const res = await profileAPI.getUserProfile(userId);
      dispatch(setUserProfile(res));
   };
};

export const getStatusProfileThunkCreator = (
   userId: number
): ThunkActionType => {
   return async (dispatch) => {
      const res = await profileAPI.getStatus(userId);
      dispatch(setStatus(res));
   };
};

export const updateStatusProfileThunkCreator = (
   status: string
): ThunkActionType => {
   return async (dispatch) => {
      const res = await profileAPI.updateStatus(status);
      if (res.resultCode === 0) dispatch(setStatus(status));
   };
};

export const savePhotoProfileThunkCreator = (file: Photos): ThunkActionType => {
   return async (dispatch) => {
      const res = await profileAPI.savePhotosProfile(file);
      if (res.resultCode === 0) {
         dispatch(savePhoto(file));
      }
   };
};
export const updateProfileThunkCreator = (
   profile: ProfileType
): ThunkActionType => {
   return async (dispatch, getState) => {
      const myId = getState().auth.id as number;
      const res = await profileAPI.updateProfile(profile);
      if (res.resultCode === 0) dispatch(getUserProfileThunkCreator(myId));
   };
};

export default profileReducer;

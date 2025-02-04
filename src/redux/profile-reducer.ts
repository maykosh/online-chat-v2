import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/profileAPI";
import { Photos, ProfileType } from "../types/types";
import { InferActionType, RootState } from "./redux-store";

export type PostType = {
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
      case "profileReducer/ADD-POST": {
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

      case "profileReducer/SET_USER_PROFILE": {
         return {
            ...state,
            profile: action.payload,
         };
      }
      case "profileReducer/SET_STATUS": {
         return {
            ...state,
            status: action.payload,
         };
      }
      case "profileReducer/SAVE_PHOTO": {
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

type ActionType = InferActionType<typeof profileActions>;

//action creator
export const profileActions = {
   addPostCreator: (newPostText: string) =>
      ({
         type: "profileReducer/ADD-POST",
         payload: newPostText,
      } as const),

   setUserProfile: (profile: ProfileType) =>
      ({
         type: "profileReducer/SET_USER_PROFILE",
         payload: profile,
      } as const),

   setStatus: (status: string) =>
      ({
         type: "profileReducer/SET_STATUS",
         payload: status,
      } as const),

   savePhoto: (file: Photos) =>
      ({
         type: "profileReducer/SAVE_PHOTO",
         payload: file,
      } as const),
};
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
      dispatch(profileActions.setUserProfile(res));
   };
};

export const getStatusProfileThunkCreator = (
   userId: number
): ThunkActionType => {
   return async (dispatch) => {
      const res = await profileAPI.getStatus(userId);
      dispatch(profileActions.setStatus(res));
      
   };
};

export const updateStatusProfileThunkCreator = (
   status: string
): ThunkActionType => {
   return async (dispatch) => {
      const res = await profileAPI.updateStatus(status);
      if (res.resultCode === 0) dispatch(profileActions.setStatus(status));
   };
};

export const savePhotoProfileThunkCreator = (file: Photos): ThunkActionType => {
   return async (dispatch) => {
      const res = await profileAPI.savePhotosProfile(file);
      if (res.resultCode === 0) {
         dispatch(profileActions.savePhoto(file));
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

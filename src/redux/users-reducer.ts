import { Dispatch } from "redux";
import { userAPI } from "../api/api";
import { Item } from "../types/types";
import { updateObjectInArray } from "../utils/object-helper";
import { RootState } from "./redux-store";
import { ThunkAction } from "redux-thunk";

const FOLLOW = "usersReducer/FOLLOW";
const UNFOLLOW = "usersReducer/UNFOLLOW";
const SET_USERS = "usersReducer/SET-USERS";
const SET_CURRENT_PAGE = "usersReducer/SET-CURRENT-PAGE";
const SET_TOTAL_COUNT = "usersReducer/SET-TOTAL-COUNT";
const TOGGLE_IS_FETCHING = "usersReducer/TOGGLE-IS-FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "usersReducer/TOGGLE-FOLLOWING-PROGRESS";

const initialState = {
   users: [] as Item[],
   pageSize: 7 as number,
   totalCount: 0 as number,
   currentPage: 1 as number,
   isFetching: false as boolean,
   followingInProgress: [] as number[],
   paginatorKey: "usersComponent" as string,
};
export type UsersReducerType = typeof initialState;

const usersReducer = (
   state: UsersReducerType = initialState,
   action: ActionType
): UsersReducerType => {
   switch (action.type) {
      case FOLLOW: {
         return {
            ...state,
            users: updateObjectInArray(state.users, action.payload, "id", {
               followed: true,
            }),
         };
      }
      case UNFOLLOW: {
         return {
            ...state,
            users: updateObjectInArray(state.users, action.payload, "id", {
               followed: false,
            }),
         };
      }
      case SET_USERS: {
         return {
            ...state,
            users: [...action.payload],
         };
      }
      case SET_CURRENT_PAGE: {
         return {
            ...state,
            currentPage: action.payload,
         };
      }
      case SET_TOTAL_COUNT: {
         return {
            ...state,
            totalCount: action.payload,
         };
      }
      case TOGGLE_IS_FETCHING: {
         return {
            ...state,
            isFetching: action.payload,
         };
      }
      case TOGGLE_FOLLOWING_PROGRESS: {
         return {
            ...state,
            followingInProgress: action.payload.isFetching
               ? [...state.followingInProgress, action.payload.userId]
               : state.followingInProgress.filter(
                    (id) => id !== action.payload.userId
                 ),
         };
      }
      default:
         return state;
   }
};

//action creator
type ActionType =
   | FollowType
   | UnFollowType
   | SetUsersType
   | SetCurrentPageType
   | SetTotalCountType
   | ToggleIsFetchingType
   | ToggleFollowingProgressType;

type FollowType = {
   type: typeof FOLLOW;
   payload: number;
};
export const follow = (userId: number): FollowType => ({
   type: FOLLOW,
   payload: userId,
});
type UnFollowType = {
   type: typeof UNFOLLOW;
   payload: number;
};
export const unFollow = (userId: number): UnFollowType => ({
   type: UNFOLLOW,
   payload: userId,
});
type SetUsersType = {
   type: typeof SET_USERS;
   payload: Item[];
};
export const setUsers = (users: Item[]): SetUsersType => ({
   type: SET_USERS,
   payload: users,
});
type SetCurrentPageType = {
   type: typeof SET_CURRENT_PAGE;
   payload: number;
};
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
   type: SET_CURRENT_PAGE,
   payload: currentPage,
});
type SetTotalCountType = {
   type: typeof SET_TOTAL_COUNT;
   payload: number;
};
export const setTotalCount = (totalCount: number): SetTotalCountType => ({
   type: SET_TOTAL_COUNT,
   payload: totalCount,
});
type ToggleIsFetchingType = {
   type: typeof TOGGLE_IS_FETCHING;
   payload: boolean;
};
export const toggleIsFetching = (
   isFetching: boolean
): ToggleIsFetchingType => ({
   type: TOGGLE_IS_FETCHING,
   payload: isFetching,
});
type ToggleFollowingProgressType = {
   type: typeof TOGGLE_FOLLOWING_PROGRESS;
   payload: { isFetching: boolean; userId: number };
};
export const toggleFollowingProgress = (
   isFetching: boolean,
   userId: number
): ToggleFollowingProgressType => ({
   type: TOGGLE_FOLLOWING_PROGRESS,
   payload: { isFetching, userId },
});

// helpers
type HelperType = FollowType | UnFollowType;

const _followUnfollowFlow = async (
   dispatch: DispatchType,
   userId: number,
   apiMethod: any,
   actionCreator: (userId: number) => HelperType
) => {
   dispatch(toggleFollowingProgress(true, userId));
   const res = await apiMethod(userId);
   if (res.resultCode === 0) {
      dispatch(actionCreator(userId));
   }
   dispatch(toggleFollowingProgress(false, userId));
};

// thunk creators
// type GetStateType = () => RootState;
type DispatchType = Dispatch<ActionType>;
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>;

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
   return async (dispatch) => {
      dispatch(toggleIsFetching(true));
      dispatch(setCurrentPage(currentPage));
      const res = await userAPI.getUsers(currentPage, pageSize);
      dispatch(setUsers(res.items));
      dispatch(toggleIsFetching(false));
      dispatch(setTotalCount(res.totalCount));
   };
};

export const followThunkCreator = (userId: number): ThunkType => {
   return async (dispatch) => {
      _followUnfollowFlow(dispatch, userId, userAPI.followUsers, follow);
   };
};

export const unFollowThunkCreator = (userId: number): ThunkType => {
   return async (dispatch) => {
      _followUnfollowFlow(dispatch, userId, userAPI.unFollowUsers, unFollow);
   };
};

export default usersReducer;

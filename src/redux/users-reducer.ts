import { Dispatch } from "redux";
import { Item } from "../types/types";
import { updateObjectInArray } from "../utils/object-helper";
import { InferActionType, RootState } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { userAPI } from "../api/userAPI";

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
      case "usersReducer/FOLLOW": {
         return {
            ...state,
            users: updateObjectInArray(state.users, action.payload, "id", {
               followed: true,
            }),
         };
      }
      case "usersReducer/UNFOLLOW": {
         return {
            ...state,
            users: updateObjectInArray(state.users, action.payload, "id", {
               followed: false,
            }),
         };
      }
      case "usersReducer/SET-USERS": {
         return {
            ...state,
            users: [...action.payload],
         };
      }
      case "usersReducer/SET-CURRENT-PAGE": {
         return {
            ...state,
            currentPage: action.payload,
         };
      }
      case "usersReducer/SET-TOTAL-COUNT": {
         return {
            ...state,
            totalCount: action.payload,
         };
      }
      case "usersReducer/TOGGLE-IS-FETCHING": {
         return {
            ...state,
            isFetching: action.payload,
         };
      }
      case "usersReducer/TOGGLE-FOLLOWING-PROGRESS": {
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
type ActionType = InferActionType<typeof actions>;

export const actions = {
   follow: (userId: number) =>
      ({
         type: "usersReducer/FOLLOW",
         payload: userId,
      } as const),
   unFollow: (userId: number) =>
      ({
         type: "usersReducer/UNFOLLOW",
         payload: userId,
      } as const),
   setUsers: (users: Item[]) =>
      ({
         type: "usersReducer/SET-USERS",
         payload: users,
      } as const),
   setCurrentPage: (currentPage: number) =>
      ({
         type: "usersReducer/SET-CURRENT-PAGE",
         payload: currentPage,
      } as const),
   setTotalCount: (totalCount: number) =>
      ({
         type: "usersReducer/SET-TOTAL-COUNT",
         payload: totalCount,
      } as const),
   toggleIsFetching: (isFetching: boolean) =>
      ({
         type: "usersReducer/TOGGLE-IS-FETCHING",
         payload: isFetching,
      } as const),

   toggleFollowingProgress: (isFetching: boolean, userId: number) =>
      ({
         type: "usersReducer/TOGGLE-FOLLOWING-PROGRESS",
         payload: { isFetching, userId },
      } as const),
};

// helpers
type HelperType = ActionType;

const _followUnfollowFlow = async (
   dispatch: DispatchType,
   userId: number,
   apiMethod: any,
   actionCreator: (userId: number) => HelperType
) => {
   dispatch(actions.toggleFollowingProgress(true, userId));
   const res = await apiMethod(userId);
   if (res.resultCode === 0) {
      dispatch(actionCreator(userId));
   }
   dispatch(actions.toggleFollowingProgress(false, userId));
};

// thunk creators
type DispatchType = Dispatch<ActionType>;
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>;

export const getUsersThunkCreator = (
   currentPage: number,
   pageSize: number
): ThunkType => {
   return async (dispatch) => {
      dispatch(actions.toggleIsFetching(true));
      dispatch(actions.setCurrentPage(currentPage));
      const res = await userAPI.getUsers(currentPage, pageSize);
      dispatch(actions.setUsers(res.items));
      dispatch(actions.toggleIsFetching(false));
      dispatch(actions.setTotalCount(res.totalCount));
   };
};

export const followThunkCreator = (userId: number): ThunkType => {
   return async (dispatch) => {
      _followUnfollowFlow(
         dispatch,
         userId,
         userAPI.followUsers,
         actions.follow
      );
   };
};

export const unFollowThunkCreator = (userId: number): ThunkType => {
   return async (dispatch) => {
      _followUnfollowFlow(
         dispatch,
         userId,
         userAPI.unFollowUsers,
         actions.unFollow
      );
   };
};

export default usersReducer;

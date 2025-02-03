import { authAPI } from "../api/api";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./redux-store";
import { ResultCode } from "../api/api.types";

const SET_USER_DATA = "authReducer/SET-USER-DATA";

const initialState = {
   id: null as number | null,
   email: null as string | null,
   login: null as string | null,
   isAuth: false as boolean,
};
export type initialStateType = typeof initialState;
const authReducer = (
   state: initialStateType = initialState,
   action: ActionType
): initialStateType => {
   switch (action.type) {
      case SET_USER_DATA: {
         return {
            ...state,
            ...action.payload,
         };
      }
      default:
         return state;
   }
};

type ActionType = SetUserDataReturnType;

//action creators
type SetUserDataReturnType = {
   type: typeof SET_USER_DATA;
   payload: {
      id: number | null;
      email: string | null;
      login: string | null;
      isAuth: boolean;
   };
};
export const setUserData = (
   id: number | null,
   email: string | null,
   login: string | null,
   isAuth: boolean
): SetUserDataReturnType => ({
   type: SET_USER_DATA,
   payload: { id, email, login, isAuth },
});

//thunk creators
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>;

export const authMeThunkCreator = (): ThunkType => {
   return async (dispatch) => {
      const res = await authAPI.getAuthMe();
      if (res.resultCode === ResultCode.Success) {
         const { id, email, login } = res.data;
         dispatch(setUserData(id, email, login, true));
      }
   };
};

export const loginThunkCreator = (
   email: string,
   password: string,
   rememberMe: boolean
): ThunkType => {
   return async (dispatch) => {
      const res = await authAPI.login(email, password, rememberMe);
      if (res.resultCode === ResultCode.Success) {
         dispatch(authMeThunkCreator());
      }
   };
};

export const logoutThunkCreator = (): ThunkType => {
   return async (dispatch) => {
      const res = await authAPI.logout();
      if (res.resultCode === ResultCode.Success) {
         dispatch(setUserData(null, null, null, false));
      }
   };
};

export default authReducer;

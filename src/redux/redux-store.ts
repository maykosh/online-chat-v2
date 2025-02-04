import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { thunk as thunkMiddleware } from "redux-thunk";
import paginatorReducer from "./paginator-reducer";

const rootReducer = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   usersPage: usersReducer,
   auth: authReducer,
   paginator: paginatorReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunkMiddleware))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : any 
export type InferActionType<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertiesType<T>>
export default store;
